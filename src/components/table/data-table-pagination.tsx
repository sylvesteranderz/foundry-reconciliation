import { Icon } from '@iconify/react/dist/iconify.js';
import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= table.getPageCount()) {
      table.setPageIndex(page - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(
      table.getState().pagination.pageIndex + 1 - 1,
      1
    );

    const endPage = Math.min(
      table.getState().pagination.pageIndex + 1 + 1,
      table.getPageCount()
    );

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <span
          key={page}
          className={` ${
            page === table.getState().pagination.pageIndex + 1
              ? 'dark:text-[#619B7D] underline font-bold'
              : 'opacity-70 dark:opacity-100'
          } text-[15px]  cursor-pointer`}
          onClick={() => goToPage(page)}>
          {page}
        </span>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="flex items-center justify-between px-2 w-full">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="disabled:text-[#9CA3AF]"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <Icon
              icon={'fluent:arrow-next-12-filled'}
              fontSize={21}
              rotate={2}
            />
          </button>
          <button
            className="disabled:text-[#9CA3AF]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <Icon icon={'grommet-icons:next'} rotate={2} />
          </button>

          {renderPageNumbers()}

          <button
            className="disabled:text-[#9CA3AF]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <Icon icon={'grommet-icons:next'} />
          </button>
          <button
            className="disabled:text-[#9CA3AF]"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <Icon icon={'fluent:arrow-next-12-filled'} fontSize={21} />
          </button>
        </div>
      </div>
    </div>
  );
}
