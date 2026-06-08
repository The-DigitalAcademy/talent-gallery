"use client"
import { Cohort } from "@/app/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DeleteFormDialog, UpdateFormDialog } from "./forms";

export const columns: ColumnDef<Cohort>[] = [
    { accessorKey: "name", header: "name" },
    {
        accessorKey: "created_at",
        header: "created",
        cell: ({ row }) => moment(row.getValue("created_at")).fromNow()
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const item: { id: string, name: string } = { id: row.getValue("id"), name: row.getValue("name") }
            return (<div key={item.id} className='flex gap-4 justify-end'>
                <UpdateFormDialog item={item} />
                <DeleteFormDialog item={item} />
            </div>)
        }
    }
]