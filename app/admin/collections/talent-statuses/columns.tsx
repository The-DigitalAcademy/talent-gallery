"use client"
import { TalentStatus } from "@/app/lib/definitions";
import CollectionItemActions from "@/components/admin/collection-item-actions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<TalentStatus>[] = [
    { accessorKey: "name", header: "name" },
    { accessorKey: "description", header: "description" },
    {
        accessorKey: "created_at",
        header: "created",
        cell: ({ row }) => moment(row.getValue("created_at")).fromNow()
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => <CollectionItemActions id={row.getValue("id")} collectionSlug="cohorts" itemName={row.getValue("name")} />
    }
]