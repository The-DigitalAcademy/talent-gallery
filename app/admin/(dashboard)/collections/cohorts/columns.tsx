"use client";

import { Cohort } from "@/app/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DeleteFormDialog, UpdateFormDialog } from "./forms";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

function CohortPublicLink({ slug }: { slug: string }) {
  const displayUrl = siteUrl ? `${siteUrl}/${slug}` : `/${slug}`;

  return (
    <Link
      target="_blank"
      className="text-blue-500 flex items-center gap-1 hover:underline"
      href={`/${slug}`}
    >
      <span>{displayUrl}</span>
      <ExternalLinkIcon className="size-3 shrink-0" />
    </Link>
  );
}

export const columns: ColumnDef<Cohort>[] = [
  { accessorKey: "name", header: "name" },
  {
    accessorKey: "created_at",
    header: "created",
    cell: ({ row }) => moment(row.getValue("created_at")).fromNow(),
  },
  {
    accessorKey: "slug",
    header: "public page",
    cell: ({ row }) => <CohortPublicLink slug={row.getValue("slug")} />,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const item: { id: string; name: string } = {
        id: row.getValue("id"),
        name: row.getValue("name"),
      };
      return (
        <div key={item.id} className="flex gap-4 justify-end">
          <UpdateFormDialog item={item} />
          <DeleteFormDialog item={item} />
        </div>
      );
    },
  },
];