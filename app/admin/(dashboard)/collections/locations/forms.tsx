'use client';
import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Form } from '@base-ui/react/form';
import { Button } from '@base-ui/react/button';
import clsx from 'clsx';
import { Dialog } from '@base-ui/react';
import { PlusIcon, SquarePenIcon, Trash2Icon, XIcon } from 'lucide-react';
import { createLocation, deleteLocation, FormState, updateLocation } from './actions';

const initialState: FormState = {
    success: false,
    message: '',
};

export function CreateFormDialog() {
    const [state, formAction, isPending] = React.useActionState(createLocation, initialState);

    return (
        <Dialog.Root>
            <Dialog.Trigger className="text-black px-3 text-sm font-medium flex items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-200 shadow h-8 border border-gray-300">
                <PlusIcon className='w-4' /> <span>Add Item</span>
            </Dialog.Trigger>
            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px] " />
                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
                        <div className='flex justify-between items-center'>
                            <Dialog.Title className="font-semibold">Create a new Location</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        <Form
                            action={formAction}
                            className="flex w-full flex-col gap-4"
                            errors={state.errors}
                        >
                            {state.message && (
                                <div className={clsx({ "text-red-700": !state.success, "text-green-700": state.success }, "text-sm")}>
                                    {state.message}
                                </div>
                            )}
                            <Field.Root name="city" className="flex flex-col items-start gap-2">
                                <Field.Label className="text-xs text-gray-700">
                                    City
                                </Field.Label>
                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue=""
                                    placeholder="Name of city"
                                    className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                                />
                                <Field.Error className="text-xs text-red-700" />
                            </Field.Root>
                            <Field.Root name="country" className="flex flex-col items-start gap-2">
                                <Field.Label className="text-xs text-gray-700">
                                    Country
                                </Field.Label>
                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue=""
                                    placeholder="Name of country"
                                    className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                                />
                                <Field.Error className="text-xs text-red-700" />
                            </Field.Root>
                            <Button
                                disabled={isPending}
                                focusableWhenDisabled
                                type="submit"
                                className="rounded-xl border ml-auto border-gray-300 text-sm px-3 h-8 flex gap-1 hover:bg-gray-200 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-progress"
                            >
                                {isPending ? "Creating..." : "Create Location"}
                            </Button>
                        </Form>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export function UpdateFormDialog({ item }: { item: { id: string, city: string, country: string } }) {
    const updateLocationWithId = updateLocation.bind(null, item.id)
    const [state, formAction, isPending] = React.useActionState(updateLocationWithId, initialState);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <SquarePenIcon className='size-4 hover:text-blue-500' />
            </Dialog.Trigger>
            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px] " />
                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
                        <div className='flex justify-between items-center'>
                            <Dialog.Title className="font-semibold">Edit {item.city}</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        <Form
                            action={formAction}
                            className="flex w-full flex-col gap-4"
                            errors={state.errors}
                        >
                            {state.message && (
                                <div className={clsx({ "text-red-700": !state.success, "text-green-700": state.success }, "text-sm")}>
                                    {state.message}
                                </div>
                            )}
                            <Field.Root name="city" className="flex flex-col items-start gap-2">
                                <Field.Label className="text-xs text-gray-700">
                                    City
                                </Field.Label>
                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue={item.city}
                                    placeholder="eg. UI/UX"
                                    className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                                />
                                <Field.Error className="text-xs text-red-700" />
                            </Field.Root>
                            <Field.Root name="country" className="flex flex-col items-start gap-2">
                                <Field.Label className="text-xs text-gray-700">
                                    Country
                                </Field.Label>
                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue={item.country}
                                    placeholder="eg. UI/UX"
                                    className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                                />
                                <Field.Error className="text-xs text-red-700" />
                            </Field.Root>
                            <Button
                                disabled={isPending}
                                focusableWhenDisabled
                                type="submit"
                                className="rounded-xl border ml-auto border-gray-300 text-sm px-3 h-8 flex gap-1 hover:bg-gray-200 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-progress"
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

export function DeleteFormDialog({ item }: { item: { id: string, city: string, country: string } }) {
    const deleteLocationWithId = deleteLocation.bind(null, item.id)
    const [state, formAction, isPending] = React.useActionState(deleteLocationWithId, initialState);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Trash2Icon className='size-4 hover:text-red-500' />
            </Dialog.Trigger>
            <Dialog.Portal className="text-black">
                <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px] " />
                <Dialog.Viewport>
                    <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex flex-col gap-4 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 shadow bg-white border border-gray-300 p-4 rounded-xl transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
                        <div className='flex justify-between items-center'>
                            <Dialog.Title className="font-semibold">{isPending ? "Deleting" : "Delete"} {item.city}{isPending ? "..." : ""}</Dialog.Title>
                            <Dialog.Close className="text-black" ><XIcon /></Dialog.Close>
                        </div>
                        {(!isPending && !state.success) && <Dialog.Description className="text-sm text-gray-500">This action cannot be undone</Dialog.Description>}
                        <Form
                            action={formAction}
                            className="flex w-full flex-col gap-4"
                        >
                            {state.message && (
                                <div className={clsx({ "text-red-700": !state.success, "text-green-700": state.success }, "text-sm")}>
                                    {state.message}
                                </div>
                            )}
                            {!state.success && <Button
                                disabled={isPending}
                                focusableWhenDisabled
                                type="submit"
                                className="rounded-xl border ml-auto border-red-300 text-red-400 text-sm px-3 h-8 flex gap-1 hover:bg-red-200/50 shadow-sm cursor-pointer transition items-center data-disabled:text-gray-300 data-disabled:cursor-progress"
                            >
                                Delete
                            </Button>}
                        </Form>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}