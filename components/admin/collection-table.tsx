"use client"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'

export default function CollectionTable<T>({ data, columns }: { data: T[], columns: ColumnDef<T>[] }) {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <>
            <table className='w-full text-left border border-slate-300'>
                <thead className='border-b border-slate-300'>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                                <th key={header.id} className='px-4 py-3 font-medium capitalize'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className='odd:bg-slate-50 text-sm border-b border-slate-300 last:border-b-0 hover:bg-slate-100'>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className='px-4 py-1.5'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}