"use client"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'

export default function CollectionTable<T>({ data, columns }: { data: T[], columns: ColumnDef<T>[] }) {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <div className='border0 border-gray-300 rounded-lg overflow-hidden'>
            <table className='w-full text-left'>
                <thead className='border-b border-gray-300'>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id} className='h-12'>
                            {hg.headers.map((header) => (
                                <th key={header.id} className='px-4 text-sm text-gray-500 font-semibold capitalize'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className='h-12 text-sm border-b border-gray-300 last:border-b-0 transition hover:bg-gray-100'>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className='px-4'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}