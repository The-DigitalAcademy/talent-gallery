"use client"
import { FormState } from "@/app/lib/definitions";
import { Button, Field, Form } from "@base-ui/react";
import clsx from "clsx";
import { useActionState, useState } from "react";
import { upsertUrls } from "../_actions/urls-action";
import LinkPreviewCard from "@/components/admin/link-preview-card";
import { CheckIcon, XIcon } from "lucide-react";

const initialState: FormState = {
    success: false,
    message: '',
};

type Props = {
    values: {
        id: string
        youtube?: string
        portfolio?: string,
        linkedin?: string,
        github?: string,
    }
}

export default function URLsForm({ values }: Props) {
    const createEnrolmentInfo = upsertUrls.bind(null, values.id)
    const [state, formAction, isPending] = useActionState(createEnrolmentInfo, initialState);
    // url links
    const [portfolioLink, setPortfolioLink] = useState<string | undefined>(values?.portfolio || state?.fields?.portfolio)
    const [youtubeLink, setYoutubeLink] = useState<string | undefined>(values?.youtube || state?.fields?.youtube)
    const [linkedinLink, setLinkedinLink] = useState<string | undefined>(values?.linkedin || state?.fields?.linkedin)
    const [githubLink, setGithubLink] = useState<string | undefined>(values?.github || state?.fields?.github)

    return (
        <div>
            <h2 className="mb-2 font-semibold">Profile Links</h2>
            <Form
                className="w-full border border-gray-200 p-6 bg-white rounded-lg"
                action={formAction}
                errors={state.errors}
            >
                <div className="grid grid-cols-2 gap-7 mb-5">
                    <Field.Root name="youtube" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Youtube URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            onValueChange={(val) => setYoutubeLink(val)}
                            defaultValue={values?.youtube}
                            placeholder="http://youtube.com"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={youtubeLink} />
                    </Field.Root>
                    <Field.Root name="portfolio" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            Portfolio URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            onValueChange={(val) => setPortfolioLink(val)}
                            defaultValue={values.portfolio}
                            placeholder="http://myportfolio.com"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={portfolioLink} />
                    </Field.Root>
                    <Field.Root name="linkedin" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            LinkedIn URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            onValueChange={(val) => setLinkedinLink(val)}
                            defaultValue={values.linkedin}
                            placeholder="https://www.linkedin.com/in/john-doe"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={linkedinLink} />
                    </Field.Root>
                    <Field.Root name="github" className="flex flex-col items-start gap-2 w-full">
                        <Field.Label className="text-xs text-gray-700">
                            GitHub URL
                        </Field.Label>
                        <Field.Control
                            type="url"
                            onValueChange={(val) => setGithubLink(val)}
                            defaultValue={values.github}
                            placeholder="https://www.github.com/in/john-doe"
                            className="border text-sm w-full rounded-lg h-8 outline-0 focus:border-gray-600 active:border-gray-600 border-gray-300 px-2 text-sm placeholder:text-sm font-normal"
                        />
                        <Field.Error className="text-xs text-red-700" />
                        <LinkPreviewCard targetUrl={githubLink} />
                    </Field.Root>
                </div>
                <div className="flex justify-end items-center gap-4">
                    {(!isPending && state.success) &&
                        <div className="text-green-700/75 text-xs flex items-center gap-1">
                            <CheckIcon className="w-4" />Saved
                        </div>
                    }
                    {(!isPending && !state.success && state.message) && (
                        <div className="text-red-700/75 text-xs flex items-center gap-1">
                            <XIcon className="w-4" />{state.message}
                        </div>
                    )}
                    <Button
                        disabled={isPending}
                        focusableWhenDisabled
                        type="submit"
                        className="rounded-xl justify-center border border-gray-300 text-sm px-3 h-8 flex gap-1 hover:bg-gray-100 shadow-sm cursor-pointer transition items-center data-disabled:animate-pulse data-disabled:cursor-default"
                    >
                        {isPending ?
                            <span className="w-4 h-4 border-3 border-gray-600 rounded-full inline-block animate-spin border-b-gray-100" ></span>
                            :
                            "Save Changes"
                        }

                    </Button>
                </div>
            </Form>
        </div>
    )
}