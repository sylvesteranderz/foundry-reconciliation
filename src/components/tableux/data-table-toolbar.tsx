/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cross2Icon } from '@radix-ui/react-icons';
import { ColumnDef, Table } from '@tanstack/react-table';
// import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { client } from '@/main';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DataTableToolbarProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearch?: boolean;
  queryKey?: string;
  otherButton?: React.ReactNode;
  searchCols?: string[];
  hideRefresh?: boolean;
}

export function DataTableToolbar<TData, TValue>({
  table,
  showSearch,
  queryKey,
  otherButton,
  searchCols,
  hideRefresh,
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleExport = () => {
    const rows = table.getRowModel().rows.map((row) => row.original);
    const columnDefinitions = table.getAllColumns().map((col) => {
      return {
        key: col.id,
        label: col.id,
      };
    });

    // exportToExcel(rows, columnDefinitions);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    // searchCols.forEach((column) => {
    //   console.log()
    table.getColumn(searchCols?.[0])?.setFilterValue(searchTerm);
    // });
    // table.getAllColumns()?.map((e) => {
    //   e.setFilterValue(searchTerm);
    // });
  };

  return (
    <div
      className={`flex items-center ${
        !showSearch ? 'justify-end' : 'justify-between'
      }`}>
      {showSearch && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search..."
            // value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={handleSearch}
            className=" h-9 lg:w-[340px] border-[black]/40 bg-transparent"
          />

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-9 px-2 lg:px-3">
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}

          <Button
            variant="customInput"
            onClick={handleExport}
            className="h-9 px-2 lg:px-3">
            Export
          </Button>
        </div>
      )}

      <div className={`hidden lg:flex gap-3 `}>
        {otherButton}
        {!hideRefresh && (
          <Button
            onClick={() => {
              // console.log('Clicked');
              return client?.invalidateQueries({ queryKey: [queryKey] });
            }}
            className="flex items-center gap-1 bg-transparent text-current border-current font-medium"
            variant={'noBackgroundVariant'}>
            <Icon
              className="shrink-0"
              fontSize={20}
              icon={
                client?.isFetching({ queryKey: queryKey })
                  ? 'eos-icons:loading'
                  : 'solar:refresh-bold-duotone'
              }
            />{' '}
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
