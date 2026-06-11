import { createClient } from "@/app/lib/supabase/server";
import FormSelect from "@/components/admin/form-select";
import { Button, Checkbox, CheckboxGroup, Field, Fieldset, Form } from "@base-ui/react";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    const supabase = await createClient();
    const { data: locations, error: locationsError } = await supabase.from("locations").select("id, city, country, created_at").order('city', { ascending: true });
    const { data: programs, error: programsError } = await supabase.from("programs").select("id, name, created_at").order('name', { ascending: true });
    const { data: cohorts, error: cohortsError } = await supabase.from("cohorts").select("id, name, created_at").order('name', { ascending: true });
    const { data: statuses, error: statusesError } = await supabase.from("talent_statuses").select("id, name, created_at").order('name', { ascending: true });
    const { data: capabilities, error: capabilitiesError } = await supabase.from("capabilities").select("id, name, created_at").order('name', { ascending: true });
    const { data: projects, error: projectsError } = await supabase.from("projects").select("id, name, description, created_at").order('name', { ascending: true });
    return (
        <div>
            <div className="mb-5">
                <Link href="/admin/collections/talents" className="flex gap-2 text-gray-500 mb-3 hover:text-gray-800">
                    <ChevronLeftIcon className="w-4" /> <span className="text-base">Talents</span>
                </Link>
                <h1 className="text-2xl font-bold mb">Create a new Talent</h1>
            </div>

            <Form
                // action={formAction}
                className="flex w-full flex-col gap-5"
            // errors={state.errors}
            >
                {/* {state.message && (
                    <div className={clsx({ "text-red-700": !state.success, "text-green-700": state.success }, "text-sm")}>
                        {state.message}
                    </div>
                )} */}
                <div className="w-full border border-gray-200 p-6 grid grid-cols-2 gap-7 rounded-lg bg-white">
                    <div className="flex flex-col gap-7">
                        <Field.Root name="fullname" className="flex flex-col items-start gap-2 w-full">
                            <Field.Label className="text-xs text-gray-700">
                                Full Name
                            </Field.Label>
                            <Field.Control
                                type="text"
                                // disabled={isPending}
                                required
                                defaultValue=""
                                placeholder="Jacob Mabena"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
                        <Field.Root name="profile_image" className="flex flex-col items-start gap-2 w-full">
                            <Field.Label className="text-xs text-gray-700">
                                Profile Image
                            </Field.Label>
                            <Field.Control
                                type="file"
                                // disabled={isPending}
                                required
                                defaultValue=""
                                placeholder="Jacob Mabena"
                                className="border active:border-gray-600 focus:border-gray-600 border-gray-300 rounded-lg w-full text-sm text-slate-500 h-8 file:h-full file:px-4 file:mr-2 file:text-sm file:border-r file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
                    </div>

                    <Field.Root name="city" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Bio
                        </Field.Label>
                        <textarea
                            rows={3}
                            // disabled={isPending}
                            required
                            defaultValue=""
                            placeholder="A little something about the talent"
                            className="border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                </div>
                <div className="w-full border border-gray-200 p-6 grid grid-cols-2 gap-7 rounded-lg bg-white">
                    <Field.Root name="city" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Location
                        </Field.Label>
                        <FormSelect
                            placeholder="Select location"
                            options={locations?.map(i => ({ label: `${i.city}, ${i.country}`, value: i.id })) || []} />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    <Field.Root name="city" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Program
                        </Field.Label>
                        <FormSelect
                            placeholder="Select program"
                            options={programs?.map(i => ({ label: i.name, value: i.id })) || []} />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    <Field.Root name="city" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Cohort
                        </Field.Label>
                        <FormSelect
                            placeholder="Select cohort"
                            options={cohorts?.map(i => ({ label: i.name, value: i.id })) || []} />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    <Field.Root name="city" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Status
                        </Field.Label>
                        <FormSelect
                            placeholder="Select cohort"
                            options={statuses?.map(i => ({ label: i.name, value: i.id })) || []} />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                </div>
                <div className="w-full border border-gray-200 p-6 rounded-lg bg-white">
                    <Field.Root name="capabilities">
                        <Fieldset.Root render={<CheckboxGroup defaultValue={[]} />}>
                            <Fieldset.Legend className="mb-2 text-xs text-gray-700">Capabilities</Fieldset.Legend>
                            <div className="flex gap-x-4 gap-y-3 flex-wrap">
                                {capabilities && capabilities.map(({ id, name }) => {
                                    return (
                                        <Field.Item key={id} className="flex">
                                            <Field.Label className="text-xs border transition has-checked:bg-gray-200 has-checked:font-medium has-checked:text-gray-700 cursor-pointer border-gray-300 hover:shadow-lg text-gray-500 bg-white rounded-full px-2 py-1">
                                                <Checkbox.Root value={id}>
                                                </Checkbox.Root>
                                                {name}
                                            </Field.Label>
                                        </Field.Item>
                                    );
                                })}
                            </div>
                        </Fieldset.Root>
                    </Field.Root>
                </div>
                <div className="w-full border border-gray-200 p-6 grid grid-cols-2 gap-7 rounded-lg bg-white">
                    <Field.Root name="youtube_url" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Youtube URL
                        </Field.Label>
                        <Field.Control
                            type="text"
                            // disabled={isPending}
                            required
                            defaultValue=""
                            placeholder="http://youtube.com"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    <Field.Root name="portfolio_url" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Portfolio URL
                        </Field.Label>
                        <Field.Control
                            type="text"
                            // disabled={isPending}
                            required
                            defaultValue=""
                            placeholder="http://myportfolio.com"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    <Field.Root name="linkedin_url" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            LinkedIn URL
                        </Field.Label>
                        <Field.Control
                            type="text"
                            // disabled={isPending}
                            required
                            defaultValue=""
                            placeholder="https://www.linkedin.com/in/john-doe"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                    <Field.Root name="github_url" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            GitHub URL
                        </Field.Label>
                        <Field.Control
                            type="text"
                            // disabled={isPending}
                            required
                            defaultValue=""
                            placeholder="https://www.github.com/in/john-doe"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                </div>
                <Button
                    // disabled={isPending}
                    focusableWhenDisabled
                    type="submit"
                    className="rounded-xl border ml-auto border-gray-300 text-sm px-3 h-8 flex gap-1 hover:bg-gray-200 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-progress"
                >
                    Create Talent
                </Button>
            </Form >
        </div >
    )
}
