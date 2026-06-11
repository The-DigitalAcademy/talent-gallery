'use client';
import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Form } from '@base-ui/react/form';
import { Button } from '@base-ui/react/button';
import { FormState, deleteCohort, upsert } from './actions';
import clsx from 'clsx';
import { Dialog } from '@base-ui/react';
import { PlusIcon, SquarePenIcon, Trash2Icon, XIcon } from 'lucide-react';

const initialState: FormState = {
    success: false,
    message: '',
};

export function CreateFormDialog() {
    const createCohort = upsert.bind(null, null) //bind null for id param to perform insert
    const [state, formAction, isPending] = React.useActionState(createCohort, initialState);

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
                            <Dialog.Title className="font-semibold">Create a new Cohort</Dialog.Title>
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
                            <Field.Root name="name" className="flex flex-col items-start gap-2">
                                <Field.Label className="text-xs text-gray-700">
                                    Name
                                </Field.Label>
                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue=""
                                    placeholder="Cohort name"
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
                                {isPending ? "Creating..." : "Create Cohort"}
                            </Button>
                        </Form>
                    </Dialog.Popup>
                </Dialog.Viewport>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export function UpdateFormDialog({ item }: { item: { id: string, name: string } }) {
    const updateCohortWithId = upsert.bind(null, item.id)
    const [state, formAction, isPending] = React.useActionState(updateCohortWithId, initialState);

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
                            <Dialog.Title className="font-semibold">Edit {item.name}</Dialog.Title>
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
                            <Field.Root name="name" className="flex flex-col items-start gap-2">
                                <Field.Label className="text-xs text-gray-700">
                                    Name
                                </Field.Label>
                                <Field.Control
                                    type="text"
                                    disabled={isPending}
                                    required
                                    defaultValue={item.name}
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

export function DeleteFormDialog({ item }: { item: { id: string, name: string } }) {
    const deleteCohortWithId = deleteCohort.bind(null, item.id)
    const [state, formAction, isPending] = React.useActionState(deleteCohortWithId, initialState);

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
                            <Dialog.Title className="font-semibold">{isPending ? "Deleting" : "Delete"} {item.name}{isPending ? "..." : ""}</Dialog.Title>
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