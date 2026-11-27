"use client";

import * as React from "react";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import { Button } from "@base-ui/react/button";
import clsx from "clsx";
import { Dialog } from "@base-ui/react";
import { PlusIcon, SquarePenIcon, Trash2Icon, XIcon } from "lucide-react";
import { deleteRole, FormState, upsert } from "./actions";

const initialState: FormState = {
    success: false,
    message: "",
};

export function CreateFormDialog() {
    const createRole = upsert.bind(null, null);

    const [state, formAction, isPending] = React.useActionState(
        createRole,
        initialState
    );

    return (
        <Form
            action={formAction}
            className="flex"
            errors={state.errors}
        >
            <Field.Root name="name">
                <div className="flex items-center justify-between gap-2 rounded-full border border-gray-300 bg-white px-4 h-9 text-sm text-gray-500 hover:bg-gray-100 transition-colors min-w-[250px]">
                    <Field.Control
                        type="text"
                        placeholder="Add Role"
                        disabled={isPending}
                        required
                        className="bg-transparent outline-none w-full text-sm"
                    />

                    <button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer flex items-center"
                        aria-label="Add role"
                    >
                        <PlusIcon className="w-4" />
                    </button>
                </div>

                <Field.Error className="text-xs text-red-700" />
            </Field.Root>
        </Form>
    );
}

export function UpdateFormDialog({
    item,
}: {
    item: { id: string; name: string };
}) {
    const updateRoleWithId = upsert.bind(null, item.id);

    const [state, formAction, isPending] = React.useActionState(
        updateRoleWithId,
        initialState
    );

    return (
        <Dialog.Root>
            {/* Edit icon */}
            <Dialog.Trigger>
                <SquarePenIcon className="size-4 text-gray-500 hover:text-gray-800 transition-colors" />
            </Dialog.Trigger>

            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px]" />

                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">

                        <div className="flex justify-between items-center">
                            <Dialog.Title className="font-semibold">
                                Edit {item.name}
                            </Dialog.Title>

                            <Dialog.Close className="text-black">
                                <XIcon />
                            </Dialog.Close>
                        </div>

                        <Form
                            action={formAction}
                            className="flex w-full flex-col gap-4"
                            errors={state.errors}
                        >
                            {state.message && (
                                <div
                                    className={clsx(
                                        {
                                            "text-red-700": !state.success,
                                            "text-green-700": state.success,
                                        },
                                        "text-sm"
                                    )}
                                >
                                    {state.message}
                                </div>
                            )}

                            <Field.Root
                                name="name"
                                className="flex flex-col items-start gap-2"
                            >
                                <Field.Label className="text-xs text-gray-700">
                                    Name
                                </Field.Label>

                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue={item.name}
                                    placeholder="Role name"
                                    className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 placeholder:text-sm font-normal"
                                />

                                <Field.Error className="text-xs text-red-700" />
                            </Field.Root>

                            {/* Save Changes button */}
                            <Button
                                disabled={isPending}
                                focusableWhenDisabled
                                type="submit"
                                className="rounded-full border border-gray-300 text-gray-600 text-sm px-4 h-9 flex gap-1 hover:bg-gray-200 shadow-sm cursor-pointer transition items-center ml-auto data-disabled:text-gray-300 data-disabled:cursor-progress"
                            >
                                {isPending ? "Saving..." : "Save changes"}
                            </Button>
                        </Form>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export function DeleteFormDialog({
    item,
}: {
    item: { id: string; name: string };
}) {
    const deleteRoleWithId = deleteRole.bind(null, item.id);

    const [state, formAction, isPending] = React.useActionState(
        deleteRoleWithId,
        initialState
    );

    return (
        <Dialog.Root>
            {/* Delete icon */}
            <Dialog.Trigger>
                <Trash2Icon className="size-4 text-gray-500 hover:text-gray-800 transition-colors" />
            </Dialog.Trigger>

            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px]" />

                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">

                        <div className="flex justify-between items-center">
                            <Dialog.Title className="font-semibold">
                                {isPending
                                    ? `Deleting ${item.name}...`
                                    : `Delete ${item.name}`}
                            </Dialog.Title>

                            <Dialog.Close className="text-black">
                                <XIcon />
                            </Dialog.Close>
                        </div>

                        {!isPending && !state.success && (
                            <Dialog.Description className="text-sm text-gray-500">
                                This action cannot be undone
                            </Dialog.Description>
                        )}

                        <Form
                            action={formAction}
                            className="flex w-full flex-col gap-4"
                        >
                            {state.message && (
                                <div
                                    className={clsx(
                                        {
                                            "text-red-700": !state.success,
                                            "text-green-700": state.success,
                                        },
                                        "text-sm"
                                    )}
                                >
                                    {state.message}
                                </div>
                            )}

                            {!state.success && (
                                <Button
                                    disabled={isPending}
                                    focusableWhenDisabled
                                    type="submit"
                                    className="rounded-full border border-gray-300 text-gray-600 text-sm px-4 h-9 flex gap-1 hover:bg-gray-200 shadow-sm cursor-pointer transition items-center ml-auto data-disabled:text-gray-300 data-disabled:cursor-progress"
                                >
                                    Delete
                                </Button>
                            )}
                        </Form>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}