"use client"
import { Talent } from "@/app/lib/definitions";
import TalentAvatar from "@/components/admin/talent-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePenIcon, Trash2Icon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import PublishSwitch from "./_forms/published-status-form";

type TalentColDef = {
    id: string,
    fullname: string,
    profile_image_url: string,
    programs: { name: string, id: string }[],
    cohorts: { name: string, id: string }[],
    talent_statuses: { name: string, id: string }[],
    is_published: boolean,
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
            return c?.name
        }
    },
    {
        accessorKey: "cohorts",
        header: "cohort",
        cell: ({ row }) => {
            const c: { name: string } = row.getValue("cohorts")
            return c?.name
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
        accessorKey: "is_published",
        header: "published",
        cell: ({ row }) => {
            const c: boolean = row.getValue("is_published");
            const id: string = row.getValue("id")
            return <PublishSwitch defaultChecked={c} talentId={id} />
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
        cell: ({ row }) => (<div className="flex gap-3">
            <Link href={`/admin/collections/talents/${row.getValue("id")}`}><SquarePenIcon className='size-4 hover:text-blue-500' /></Link>
            <Trash2Icon className='size-4 hover:text-red-500' />
        </div>)
    }
]