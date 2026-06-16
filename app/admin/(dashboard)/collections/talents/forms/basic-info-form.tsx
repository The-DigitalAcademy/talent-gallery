"use client"
import { Button, Field, Form } from "@base-ui/react";
import { UploadCloudIcon } from "lucide-react";
import { ChangeEvent, useActionState, useState } from "react";
import { upsertBasicInfo } from "../actions/basic-info-action";
import clsx from "clsx";
import { FormState } from "@/app/lib/definitions";

const initialState: FormState = {
    success: false,
    message: '',
};

export default function BasicInfoForm({ values }: { values?: { id: string, fullname?: string, bio?: string, profile_image_url?: string } }) {
    const createBasicInfo = upsertBasicInfo.bind(null, values?.id || null) //bind id for update, or null for insert
    const [state, formAction, isPending] = useActionState(createBasicInfo, initialState);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null | undefined>(values?.profile_image_url)

    function handleImagePreview(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;

        // Generate a temporary local URL for preview
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImagePreviewUrl(objectUrl);
        }
    }
    return (
        <div>
            <h2 className="mb-2 font-semibold">Basic Profile</h2>
            <Form
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
                action={formAction}
                errors={state.errors}
            >
                {state.message && (
                    <div className={clsx({ "text-red-700": !state.success, "text-green-700": state.success }, "text-sm")}>
                        {state.message}
                    </div>
                )}
                <div className="grid grid-cols-2 gap-7 mb-5">
                    <div className="flex flex-col gap-7">
                        <Field.Root name="fullname" className="flex flex-col items-start gap-2 w-full">
                            <Field.Label className="text-xs text-gray-700">
                                Full Name
                            </Field.Label>
                            <Field.Control
                                type="text"
                                disabled={isPending}
                                required
                                defaultValue={values?.fullname}
                                placeholder="Jacob Mabena"
                                className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>
                        <Field.Root name="bio" className="flex flex-col items-start gap-2 w-full">
                            <Field.Label className="text-xs text-gray-700">
                                Bio
                            </Field.Label>
                            <textarea
                                name="bio"
                                rows={4}
                                disabled={isPending}
                                required
                                defaultValue={values?.bio}
                                placeholder="A little something about the talent"
                                className="border p-2 h-full text-sm w-full rounded-lg outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                            />
                            <Field.Error className="text-xs text-red-700" />
                        </Field.Root>

                    </div>
                    <Field.Root name="image" className="flex flex-col items-start gap-2 mx-auto">
                        <Field.Label className="text-xs text-gray-700 cursor-pointer">
                            <div className="mb-2">Profile Image</div>
                            <div className="">
                                {imagePreviewUrl ?
                                    <div className="relative size-45 overflow-hidden border rounded-lg border-dashed border-gray-300">
                                        <img className="object-cover object-center h-full w-full" src={imagePreviewUrl} />
                                        <div className="absolute bg-white/10 hover:bg-white/50 hover:text-gray-600 text-transparent inset-0 flex flex size-45  flex-col items-center justify-center">
                                            <UploadCloudIcon />
                                            <div>Click to upload</div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex size-45 flex-col overflow-hidden border rounded-lg border-dashed border-gray-300 items-center gap-1 justify-center bg-gray-50 hover:bg-gray-100">
                                        <UploadCloudIcon />
                                        <div>Click to upload</div>
                                    </div>}
                            </div>
                        </Field.Label>
                        <Field.Control
                            type="file"
                            hidden
                            onChange={(event) => handleImagePreview(event)}
                            disabled={isPending}
                            className="border active:border-gray-600 focus:border-gray-600 border-gray-300 rounded-lg w-full text-sm text-slate-500 h-8 file:h-full file:px-4 file:mr-2 file:text-sm file:border-r file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
                        />
                        <Field.Error className="text-xs text-red-700" />
                    </Field.Root>
                </div >
                <Button
                    disabled={isPending}
                    focusableWhenDisabled
                    type="submit"
                    className="rounded-xl justify-center border ml-auto border-gray-300 text-sm px-3 h-8 flex gap-1 hover:bg-gray-200 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-progress"
                >
                    Save Changes
                </Button>
            </Form>
        </div>)
}