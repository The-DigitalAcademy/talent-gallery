"use client"
import { Talent } from "@/app/lib/definitions";
import CollectionItemActions from "@/components/admin/collection-item-actions";
import TalentAvatar from "@/components/admin/talent-avatar";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

type TalentColDef = {
    id: string,
    fullname: string,
    profile_image_url: string,
    programs: { name: string }[],
    cohorts: { name: string }[],
    talent_statuses: { name: string }[],
    created_at: string
}
export const columns: ColumnDef<TalentColDef>[] = [
    {
        accessorKey: "profile_image_url",
        header: "",
        cell: ({ row }) => <TalentAvatar imageUrl={row.getValue("profile_image_url")} name={row.getValue("fullname")} />
    },
    { accessorKey: "fullname", header: "Full Name" },
    {
        accessorKey: "programs",
        header: "program",
        cell: ({ row }) => {
            const c: { name: string } = row.getValue("programs")
            return c.name
        }
    },
    {
        accessorKey: "cohorts",
        header: "cohort",
        cell: ({ row }) => {
            const c: { name: string } = row.getValue("cohorts")
            return c.name
        }
    },
    {
        accessorKey: "talent_statuses",
        header: "status",
        cell: ({ row }) => {
            const c: { name: string } = row.getValue("talent_statuses")
            return c?.name
        }
    },
    {
        accessorKey: "created_at",
        header: "created",
        cell: ({ row }) => moment(row.getValue("created_at")).fromNow()
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => <CollectionItemActions id={row.getValue("id")} collectionSlug="talents" itemName={row.getValue("fullname")} />
    }
]