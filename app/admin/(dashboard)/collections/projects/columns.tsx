"use client"
import { Project } from "@/app/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DeleteFormDialog, UpdateFormDialog } from "./forms";

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: "name",
        cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("name")}</div>
    },
    {
        accessorKey: "description",
        header: "description",
        cell: ({ row }) => <div className="whitespace-nowrap truncate max-w-80 cursor-default" title={row.getValue("description")}>{row.getValue("description")}</div>
    },
    {
        accessorKey: "created_at",
        header: "created",
        cell: ({ row }) => moment(row.getValue("created_at")).fromNow()
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const item: { id: string, name: string, description: string } = { id: row.getValue("id"), name: row.getValue("name"), description: row.getValue("description") }
            return (<div key={item.id} className='flex gap-4 justify-end'>
                <UpdateFormDialog item={item} />
                <DeleteFormDialog item={item} />
            </div>)
        }
    }
]