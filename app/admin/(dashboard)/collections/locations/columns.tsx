"use client"
import { Location } from "@/app/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DeleteFormDialog, UpdateFormDialog } from "./forms";

export const columns: ColumnDef<Location>[] = [
    { accessorKey: "city", header: "city" },
    { accessorKey: "country", header: "country" },
    {
        accessorKey: "created_at",
        header: "created",
        cell: ({ row }) => moment(row.getValue("created_at")).fromNow()
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => {
            const item: { id: string, city: string, country: string } = { id: row.getValue("id"), city: row.getValue("city"), country: row.getValue("country") }
            return (<div key={item.id} className='flex gap-4 justify-end'>
                <UpdateFormDialog item={item} />
                <DeleteFormDialog item={item} />
            </div>)
        }
    }
]