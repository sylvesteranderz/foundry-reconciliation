/* eslint-disable no-mixed-spaces-and-tabs */

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import Pagination from '@/components/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
//   import { updateInventoryFields } from "@/pages/business.analytics/_store/inventory.slice";
// import { onUpdatePersistSlice } from '@/store/features/persist.slice';
import { Spinner } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTableToolbar } from './data-table-toolbar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { cn } from '@/lib/utils';
//   import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  params: { page: number; limit: number; count: number; search: string };
  onPageChange: (page: number) => void;
  showFooter?: boolean;
  showToolbar?: boolean;
  showSearch?: boolean;
  queryKey: string;
  otherToolbarButtons?: React.ReactNode;
  searchCols?: string[];
  hideRefresh?: boolean;
  minHeight?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  params,
  onPageChange,
  showFooter,
  showToolbar,
  showSearch,
  otherToolbarButtons,
  queryKey,
  searchCols,
  hideRefresh = true,
  minHeight = 'min-h-[520px]',
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="">
      {showToolbar && (
        <DataTableToolbar
          table={table}
          columns={columns}
          data={data}
          showSearch={showSearch}
          queryKey={queryKey}
          otherButton={otherToolbarButtons}
          searchCols={searchCols}
          hideRefresh={hideRefresh}
        />
      )}
      <div className={cn(minHeight, 'flex flex-col')}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </tr>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-[12px] text-center"
                >
                  <Spinner size="md" color="current" />
                  <p>Please wait...</p>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <React.Fragment>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => {
                      // dispatch(updateInventoryFields({ data: row.original }));
                      // dispatch(
                      //   onUpdatePersistSlice({ targetItem: row.original })
                      // );
                      // navigate("../orders/details");
                    }}
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Icon
                    icon="solar:box-outline"
                    className="text-[2.2rem] dark:text-gray-400 inline-flex"
                  />
                  <p className="dark:text-gray-400">No Data found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {showFooter && (
          <div className="mt-auto pb-2 ml-auto relative">
            <Pagination
              currentPage={params.page}
              totalPages={Math.ceil(params.count / params.limit)}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
