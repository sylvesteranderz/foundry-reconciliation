import React, { useState, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
} from "@nextui-org/react";
import { capitalize } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import CustomContainerComponent from "@/components/custom.container.component";
import CustomTableComponent from "@/components/table.component";
import { Key } from "react";

// Types for the enhanced table
export interface TableColumn {
  key: string;
  label: string;
}

export interface TableAction {
  key: string;
  label: string;
  icon?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  disabled?: boolean;
  startContent?: React.ReactNode;
}

export interface FilterOption {
  name: string;
  uid: string;
}

export interface TopContentAction {
  title: string;
  icon: string;
  loading?: boolean;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  onPress: () => void;
}

export interface EnhancedTableProps {
  // Table core props
  columns: TableColumn[];
  rows: Array<any>;
  isLoading?: boolean;
  isFetching?: boolean;

  // Pagination props
  isPaginated?: boolean;
  params?: {
    limit: number;
    count: number;
    page: number;
  };
  setParams?: (params: any) => void;

  // Expandable row props
  enableRowExpansion?: boolean;
  renderDetailView?: (selectedRow: any) => React.ReactNode;
  columnsToHideOnExpansion?: number; // Number of columns to hide from the end (e.g., 2 = last 2 columns)

  // Table styling
  classNames?: Partial<{
    base: string;
    table: string;
    thead: string;
    tbody: string;
    tr: string;
    th: string;
    td: string;
    tfoot: string;
    sortIcon: string;
    emptyWrapper: string;
  }>;

  // Mobile support
  mobileFriendly?: boolean;
  mobileHeaders?: Array<{ key: string; label: any } | string>;
  mobileHeadersClassname?: string;
  bottomContentOnMobile?: (props: any) => React.ReactNode;

  // Click handlers
  onclick?: (key: Key) => void;
  onRowActionClick?: (actionKey: string, rowData: any) => void;

  // Top content props - making it fully customizable
  showTopContent?: boolean;
  title?: string;

  // Search functionality
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchIcon?: string;

  // Filter functionality
  showFilter?: boolean;
  filterLabel?: string;
  filterOptions?: FilterOption[];
  filterValue?: Selection;
  onFilterChange?: (selection: Selection) => void;

  // Additional filters for multiple filter support
  additionalFilters?: Array<{
    label: string;
    options: FilterOption[];
    value: Selection;
    onChange: (selection: Selection) => void;
  }>;

  // Action buttons in top content
  topActions?: TopContentAction[];

  // Add button
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonIcon?: string;
  onAddButtonClick?: () => void;

  // Row actions dropdown
  rowActions?: TableAction[];
  rowActionsDisabledKeys?: string[];

  // Container styles
  containerStyles?: string;
  containerMinHeight?: string;

  // Additional modals or components
  additionalModals?: React.ReactNode;

  // Selection props
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: Selection | "all";
  onSelectionChange?: (keys: Selection | "all") => void;
}

const EnhancedTableComponent: React.FC<EnhancedTableProps> = ({
  // Core table props
  columns,
  rows,
  isLoading = false,
  isFetching = false,

  // Pagination
  isPaginated = false,
  params,
  setParams,

  // Expandable row props
  enableRowExpansion = false,
  renderDetailView,
  columnsToHideOnExpansion = 0,

  // Styling
  classNames = { th: "bg-transparent border-b", tbody: "divide-y" },

  // Mobile
  mobileFriendly = false,
  mobileHeaders = [],
  mobileHeadersClassname = "grid grid-cols-[1fr,auto] items-center",
  bottomContentOnMobile,

  // Click handlers
  onclick,
  onRowActionClick,

  // Top content
  showTopContent = true,
  title = "",

  // Search
  showSearch = true,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  searchIcon = "si:search-line",

  // Filter
  showFilter = true,
  filterLabel = "Status",
  filterOptions = [],
  filterValue = new Set(["all"]),
  onFilterChange,

  // Additional filters
  additionalFilters = [],

  // Actions
  topActions = [],

  // Add button
  showAddButton = true,
  addButtonText = "Add New",
  addButtonIcon = "fluent:add-24-filled",
  onAddButtonClick,

  // Row actions
  rowActions = [],
  rowActionsDisabledKeys = [],

  // Container
  containerStyles = "min-h-[890px]",

  // Additional
  additionalModals,

  // Selection
  selectionMode,
  selectedKeys,
  onSelectionChange,
}) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const [localFilterValue, setLocalFilterValue] =
    useState<Selection>(filterValue);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  // Handle search change
  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearchValue(value);
      if (onSearchChange) {
        onSearchChange(value);
      }
    },
    [onSearchChange]
  );

  // Handle filter change
  const handleFilterChange = useCallback(
    (selection: Selection) => {
      setLocalFilterValue(selection);
      if (onFilterChange) {
        onFilterChange(selection);
      }
    },
    [onFilterChange]
  );

  // Handle row click for expansion
  const handleRowClick = useCallback(
    (rowKey: Key, rowData: any, event: React.MouseEvent) => {
      // Prevent expansion if clicked on interactive elements
      const target = event.target as HTMLElement;
      const isInteractiveElement =
        target.closest("button") ||
        target.closest('[role="checkbox"]') ||
        target.closest(".dropdown") ||
        target.closest('[data-slot="trigger"]');

      if (isInteractiveElement || !enableRowExpansion) {
        // Call the original onclick if it exists
        if (onclick) {
          onclick(rowKey);
        }
        return;
      }

      // Get consistent row identifier - prioritize the same ID that table rows use
      const currentRowId = rowData.id || rowKey;
      const selectedRowId = selectedRow?.id;

      // Toggle selection: if same row is clicked, deselect it
      if (selectedRow && selectedRowId === currentRowId) {
        setSelectedRow(null);
      } else {
        setSelectedRow(rowData);
      }
    },
    [selectedRow, enableRowExpansion, onclick]
  );

  // Process rows to add actions dropdown if rowActions are provided
  const processedRows = useMemo(() => {
    if (rowActions.length === 0) return rows;

    return rows.map((row) => ({
      ...row,
      actions: (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <Icon icon="ant-design:more-outlined" className="text-[19px]" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={rowActionsDisabledKeys}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const [actionKey] = Array.from(keys);
                if (onRowActionClick && actionKey) {
                  onRowActionClick(String(actionKey), row);
                }
              }}
            >
              {rowActions.map((action) => (
                <DropdownItem
                  key={action.key}
                  className={action.className}
                  startContent={
                    action.icon ? (
                      <Icon icon={action.icon} className="text-lg" />
                    ) : (
                      action.startContent || null
                    )
                  }
                >
                  {action.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      ),
    }));
  }, [rows, rowActions, rowActionsDisabledKeys, onRowActionClick]);

  // Enhanced columns to include actions and handle column hiding
  const enhancedColumns = useMemo(() => {
    let baseColumns = columns;

    // Add actions column if rowActions are provided
    if (rowActions.length > 0) {
      const hasActionsColumn = columns.some((col) => col.key === "actions");
      if (!hasActionsColumn) {
        baseColumns = [...columns, { key: "actions", label: "" }];
      }
    }

    // Hide the last N columns if detail view is open and we have columns to hide
    if (enableRowExpansion && selectedRow && columnsToHideOnExpansion > 0) {
      baseColumns = baseColumns.slice(0, -columnsToHideOnExpansion);
    }

    return baseColumns;
  }, [
    columns,
    rowActions,
    enableRowExpansion,
    selectedRow,
    columnsToHideOnExpansion,
  ]);

  // Top content section
  const topContent = useMemo(() => {
    if (!showTopContent) return null;

    return (
      <div className="flex flex-col gap-3">
        {title && (
          <h4 className="capitalize text-gray-600 font-semibold">{title}</h4>
        )}

        <div className="flex justify-between gap-3 lg:items-end flex-col lg:flex-row items-center mb-4">
          <div className="flex lg:flex-row lg:items-center flex-col items-center gap-2 w-full">
            {/* Search Input */}
            {showSearch && (
              <Input
                isClearable
                classNames={{
                  base: "w-full lg:w-[20rem] h-[2.5rem] text-xs placeholder-xs",
                  inputWrapper: "border-1 h-full bg-white",
                }}
                placeholder={searchPlaceholder}
                size="sm"
                startContent={
                  <Icon
                    icon={searchIcon}
                    className="text-[19px] text-gray-400"
                  />
                }
                value={localSearchValue}
                variant="bordered"
                onClear={() => handleSearchChange("")}
                onValueChange={handleSearchChange}
              />
            )}

            {/* Filter Dropdown */}
            {showFilter && filterOptions.length > 0 && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={
                      <Icon icon="stash:chevron-down" className="text-[19px]" />
                    }
                    size="sm"
                    variant="flat"
                  >
                    {filterLabel}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Filter Options"
                  closeOnSelect={false}
                  selectedKeys={localFilterValue}
                  selectionMode="single"
                  onSelectionChange={handleFilterChange}
                >
                  {filterOptions.map((option) => (
                    <DropdownItem key={option.uid} className="capitalize">
                      {capitalize(option.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}

            {/* Additional Filters */}
            {additionalFilters.map((filter, index) => (
              <Dropdown key={index}>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={
                      <Icon icon="stash:chevron-down" className="text-[19px]" />
                    }
                    size="sm"
                    variant="flat"
                  >
                    {filter.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label={`${filter.label} Filter Options`}
                  closeOnSelect={false}
                  selectedKeys={filter.value}
                  selectionMode="single"
                  onSelectionChange={filter.onChange}
                >
                  {filter.options.map((option) => (
                    <DropdownItem key={option.uid} className="capitalize">
                      {capitalize(option.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ))}

            {/* Top Actions */}
            {topActions.map((action, index) => (
              <Button
                key={index}
                isLoading={action.loading}
                variant={action.variant || "light"}
                radius="none"
                color={action.color}
                className={action.className || "text-primary-cct"}
                startContent={
                  <Icon icon={action.icon} className="text-[19px]" />
                }
                onPress={action.onPress}
              >
                {action.title}
              </Button>
            ))}
          </div>

          {/* Add Button */}
          {showAddButton && (
            <div className="flex gap-3 ">
              <Button
                variant="light"
                radius="none"
                className="text-primary-cct"
                startContent={
                  <Icon icon={addButtonIcon} className="text-[19px]" />
                }
                onPress={onAddButtonClick}
                size="md"
              >
                {addButtonText}
              </Button>
            </div>
          )}
        </div>

        {/* Additional Modals */}
        {additionalModals}
      </div>
    );
  }, [
    showTopContent,
    title,
    showSearch,
    searchPlaceholder,
    searchIcon,
    localSearchValue,
    showFilter,
    filterLabel,
    filterOptions,
    localFilterValue,
    additionalFilters,
    topActions,
    showAddButton,
    addButtonText,
    addButtonIcon,
    onAddButtonClick,
    additionalModals,
    handleSearchChange,
    handleFilterChange,
  ]);

  return (
    <CustomContainerComponent styles={containerStyles}>
      {topContent}

      {/* Main Layout Container - Relative positioning for proper layout */}
      <div className="relative min-h-[600px]">
        {/* Table Container - Slides left when detail view opens */}
        <motion.div
          className="w-full"
          // layout
          animate={{
            width: enableRowExpansion && selectedRow ? "60%" : "100%",
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <CustomTableComponent
            columns={enhancedColumns}
            rows={processedRows}
            isLoading={isLoading}
            classNames={classNames}
            isFetching={isFetching}
            isPaginated={isPaginated}
            params={params}
            setParams={setParams}
            onclick={
              enableRowExpansion
                ? (key) => {
                    const rowData = processedRows.find(
                      (row) => (row.id || row.key) === key
                    );
                    if (rowData) {
                      handleRowClick(key, rowData, {
                        target: document.body,
                      } as any);
                    }
                  }
                : onclick
            }
            mobileHeaders={mobileHeaders}
            mobileFriendly={mobileFriendly}
            mobileHeadersClassname={mobileHeadersClassname}
            bottomContentOnMoblile={bottomContentOnMobile}
            selectionMode={selectionMode as any}
            selected={selectedKeys}
            onSelectionChange={onSelectionChange}
            selectedRowId={selectedRow ? selectedRow.id : undefined}
          />
        </motion.div>

        {/* Detail View Panel - Slides in from right */}
        <AnimatePresence>
          {enableRowExpansion && selectedRow && renderDetailView && (
            <motion.div
              initial={{ x: "-60%" }}
              animate={{ x: 0 }}
              exit={{ x: "0%" }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute top-0 right-0 w-[39%] h-full bg-white  rounded-xl  overflow-hidden flex-shrink-0 z-10 shadow-md"
            >
              {/* Close Button */}
              <Button
                isIconOnly
                variant="light"
                className="absolute top-4 right-2 z-20 hover:bg-gray-100 transition-colors duration-200 rounded-full"
                onPress={() => setSelectedRow(null)}
                size="sm"
              >
                <Icon icon="mdi:close" className="text-lg text-gray-500" />
              </Button>

              {/* Detail Content */}
              <div className="p-6 pr-8 h-full overflow-y-auto scrollbar-hide">
                {/* Prefer the original/raw record when available on the row object */}
                {renderDetailView(selectedRow.__record || selectedRow)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CustomContainerComponent>
  );
};

export default EnhancedTableComponent;