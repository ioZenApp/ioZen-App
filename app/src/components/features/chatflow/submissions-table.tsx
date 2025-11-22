'use client'

import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
} from '@tanstack/react-table'

import { DataTableToolbar, DataTablePagination } from '@/components/data-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/data-display'
import { useTableUrlState } from '@/hooks/use-table-url-state'
import type { ChatflowSubmission } from '@/types'
import { submissionsColumns } from './submissions-columns'

export function SubmissionsTable({
  data,
  workspaceSlug: _workspaceSlug,
  chatflowId: _chatflowId,
}: {
  data: ChatflowSubmission[]
  workspaceSlug: string
  chatflowId: string
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const { columnFilters, onColumnFiltersChange, pagination, onPaginationChange, globalFilter, onGlobalFilterChange } =
    useTableUrlState({
      pagination: { defaultPage: 1, defaultPageSize: 10 },
      globalFilter: { enabled: true },
      columnFilters: [
        { columnId: 'status', searchKey: 'status', type: 'array' },
      ],
    })

  const table = useReactTable({
    data,
    columns: submissionsColumns,
    state: { sorting, pagination, rowSelection, columnFilters, columnVisibility, globalFilter },
    enableRowSelection: true,
    onPaginationChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="flex flex-1 flex-col gap-4">
      <DataTableToolbar
        table={table}
        searchPlaceholder="Filter submissions..."
        filters={[
          {
            columnId: 'status',
            title: 'Status',
            options: [
              { label: 'Completed', value: 'completed' },
              { label: 'In Progress', value: 'in_progress' },
              { label: 'Abandoned', value: 'abandoned' },
            ],
          },
        ]}
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={submissionsColumns.length}
                  className="h-24 text-center"
                >
                  No submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

