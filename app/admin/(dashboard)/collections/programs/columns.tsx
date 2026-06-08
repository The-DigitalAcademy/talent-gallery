"use client"
import { Program } from "@/app/lib/definitions";
import CollectionItemActions from "@/components/admin/collection-item-actions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<Program>[] = [
    { accessorKey: "name", header: "name" },
    {
        accessorKey: "created_at",
        header: "created",
        cell: ({ row }) => moment(row.getValue("created_at")).fromNow()
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => <CollectionItemActions id={row.getValue("id")} collectionSlug="programs" itemName={row.getValue("name")} />
    }
]