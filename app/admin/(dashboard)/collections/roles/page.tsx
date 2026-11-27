import { createClient } from "@/app/lib/supabase/server";
import CollectionHeader from "@/components/admin/collection-header";
import CollectionSearch from "@/components/admin/collection-search";
import { CreateFormDialog } from "./forms";
import { deleteRole } from "./actions";

type PageProps = {
    searchParams?: Promise<{
        name?: string;
    }>;
};

export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("roles")
        .select("id, name, created_at")
        .ilike("name", `%${searchParams?.name || ""}%`)
        .order("name", { ascending: true });

    return (
        <>
            <div className="flex justify-between items-start">
                <CollectionHeader
                    title="Roles"
                    totalEntries={data?.length || 0}
                />
            </div>

            <div className="flex mb-5">
                <CollectionSearch title="Roles" keyName="name" />
            </div>

            <div className="flex gap-x-4 gap-y-3 flex-wrap mb-5">
                <CreateFormDialog />

                {data?.map((role) => (
                    <div
                        key={role.id}
                        className="text-xs border flex items-center gap-1 transition bg-gray-200 font-medium text-gray-700 border-gray-300 rounded-full px-3 py-1"
                    >
                        <span>{role.name}</span>

                        <form
                            action={async () => {
                                "use server";
                                await deleteRole(role.id);
                            }}
                        >
                            <button
                                type="submit"
                                className="cursor-pointer"
                                aria-label={`Delete ${role.name}`}
                            >
                                <span className="text-gray-500 rounded-full size-5 p-[2px] pr-0 hover:text-red-500 flex items-center justify-center">
                                    ×
                                </span>
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </>
    );
}