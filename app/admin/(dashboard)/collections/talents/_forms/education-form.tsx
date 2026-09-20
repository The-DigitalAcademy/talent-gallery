"use client";

import { Button, Dialog, Field, Form } from "@base-ui/react";
import { XIcon } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";

import { cn, formatDuration, formatMonth, getCurrentMonth } from "@/app/lib/utils";
import {
  Education,
  FieldsOfStudy,
  Qualifications,
} from "@/app/lib/definitions";

import { FormCombobox } from "@/components/admin/form-combobox";

import {
  deleteEducation,
  insertEducation,
} from "../_actions/education-action";

type FormValues = {
  institution: string;
  qualification: string;
  fieldOfStudy: string | null;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
};

type EducationFormProps = {
  education: Education[];
  talentId: string;
  qualifications: Qualifications[];
  fieldsOfStudy: FieldsOfStudy[];
};

export default function EducationForm({
  education,
  talentId,
  qualifications,
  fieldsOfStudy,
}: EducationFormProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
    formState: {
      errors,
      dirtyFields,
      isSubmitting,
      isValid,
    },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      institution: "",
      qualification: "",
      fieldOfStudy: null,
      isCurrent: false,
    },
  });

  const [focusedField, setFocusedField] =
    useState<keyof FormValues | null>(null);

  // Bumped after a successful submit to remount the comboboxes,
  // which clears any leftover text the user typed without selecting.
  const [resetKey, setResetKey] = useState(0);

  const selectedQualification = useWatch({
    control,
    name: "qualification",
  });

  const isCurrent = useWatch({
    control,
    name: "isCurrent",
  });

  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const focusField = async (
    field: keyof FormValues,
  ) => {
    setFocusedField(field);
    await trigger(field);
  };

  const selectedQualificationRecord = useMemo(
    () =>
      qualifications.find(
        (qualification) =>
          qualification.name === selectedQualification,
      ) ?? null,
    [qualifications, selectedQualification],
  );

  const qualificationOptions = useMemo(
    () =>
      qualifications.map((qualification) => ({
        label: qualification.name,
        value: qualification.name,
      })),
    [qualifications],
  );

  const fieldOfStudyOptions = useMemo(
    () =>
      selectedQualificationRecord
        ? fieldsOfStudy
            .filter(
              (field) =>
                field.qualification_id ===
                selectedQualificationRecord.id,
            )
            .map((field) => ({
              label: field.name,
              value: field.name,
            }))
        : [],
    [fieldsOfStudy, selectedQualificationRecord],
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const {
      institution,
      qualification,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
    } = data;

    const finalEndDate = isCurrent ? new Date() : endDate;

    const totalMonths = moment
      .utc(finalEndDate)
      .diff(moment.utc(startDate), "months");

    const totalDurationText = formatDuration(totalMonths);

    const duration = `${moment
      .utc(startDate)
      .format("MMM YYYY")} - ${moment
      .utc(finalEndDate)
      .format("MMM YYYY")} (${totalDurationText})`;

    const result = await insertEducation(talentId, {
      institution,
      duration,
      qualification,
      fieldOfStudy,
    });

    if (!result.success) {
      setError("root", {
        message: result.message,
      });

      if (result.errors) {
        Object.entries(result.errors).forEach(
          ([key, message]) => {
            setError(key as keyof FormValues, {
              message: String(message),
            });
          },
        );
      }

      return;
    }

    toast.success("Education added");

    setFocusedField(null);

    // Called with no arguments so react-hook-form also resets the
    // native month inputs in the DOM. reset({...}) with explicit values
    // skips that step, and startDate/endDate have no default to restore.
    reset();

    setResetKey((key) => key + 1);
  };

  return (
    <div>
      <h2 className="mb-2 font-semibold">
        Education
      </h2>

      <div className="w-full rounded-lg border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-3 gap-7">
          {/* FORM */}
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-3"
          >
            {/* Institution */}
            <Field.Root
              name="institution"
              onFocus={() => focusField("institution")}
              className="flex w-full flex-col items-start gap-2"
            >
              <Field.Label className="text-xs text-gray-700">
                Institution
              </Field.Label>

              <Field.Control
                {...register("institution", {
                  required: "Institution is required",
                  minLength: {
                    value: 2,
                    message:
                      "Institution must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "Institution cannot exceed 50 characters",
                  },
                })}
                placeholder="Institution"
                className="h-8 w-full rounded-lg border border-gray-300 px-2 text-sm font-normal outline-0 placeholder:text-sm focus:border-gray-600"
              />

              {focusedField === "institution" &&
                errors.institution?.message && (
                  <div className="text-xs text-red-700">
                    {errors.institution.message}
                  </div>
                )}
            </Field.Root>

            {/* Qualification */}
            <Controller
              control={control}
              name="qualification"
              rules={{
                required: "Qualification is required",
              }}
              render={({ field, fieldState }) => (
                <Field.Root
                  name={field.name}
                  invalid={fieldState.invalid}
                  onFocus={() =>
                    focusField("qualification")
                  }
                  className={cn(
                    "flex w-full flex-col items-start gap-2",
                    {
                      "[&>button]:bg-yellow-50":
                        dirtyFields.qualification,
                    },
                  )}
                >
                  <Field.Label className="text-xs text-gray-700">
                    Qualification
                  </Field.Label>

                  <FormCombobox
                    key={`qualification-${resetKey}`}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value ?? "");

                      setValue("fieldOfStudy", null, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    placeholder="Select qualification"
                    options={qualificationOptions}
                  />

                  {focusedField === "qualification" &&
                    fieldState.error?.message && (
                      <div className="text-xs text-red-700">
                        {fieldState.error.message}
                      </div>
                    )}
                </Field.Root>
              )}
            />

            {/* Field of Study */}
            <Controller
              control={control}
              name="fieldOfStudy"
              render={({ field, fieldState }) => (
                <Field.Root
                  name={field.name}
                  invalid={fieldState.invalid}
                  onFocus={() =>
                    focusField("fieldOfStudy")
                  }
                  className={cn(
                    "flex w-full flex-col items-start gap-2",
                    {
                      "[&>button]:bg-yellow-50":
                        dirtyFields.fieldOfStudy,
                    },
                  )}
                >
                  <Field.Label className="text-xs text-gray-700">
                    Field of Study
                  </Field.Label>

                  <FormCombobox
                    key={`fieldOfStudy-${resetKey}`}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedQualification}
                    placeholder={
                      selectedQualification
                        ? "Select field of study"
                        : "Select qualification first"
                    }
                    options={fieldOfStudyOptions}
                  />

                  {focusedField === "fieldOfStudy" &&
                    fieldState.error?.message && (
                      <div className="text-xs text-red-700">
                        {fieldState.error.message}
                      </div>
                    )}
                </Field.Root>
              )}
            />

            {/* Dates */}
            <Field.Root
              name="duration"
              className="flex w-full flex-col items-start gap-2"
            >
              <div className="w-full space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Start date */}
                  <Field.Root
                    name="startDate"
                    onFocus={() =>
                      focusField("startDate")
                    }
                    className="flex flex-col gap-1"
                  >
                    <Field.Label className="text-sm font-normal text-gray-700">
                      Start date
                    </Field.Label>

                    <input
                      type="month"
                      {...register("startDate", {
                        required:
                          "Start date is required",
                        valueAsDate: true,
                      })}
                      max={getCurrentMonth()}
                      className="h-8 w-full rounded-lg border border-gray-300 px-2 text-sm font-normal outline-0 focus:border-gray-600"
                    />

                    {focusedField === "startDate" &&
                      errors.startDate?.message && (
                        <div className="text-xs text-red-700">
                          {errors.startDate.message}
                        </div>
                      )}
                  </Field.Root>

                  {/* End date */}
                  <Field.Root
                    name="endDate"
                    onFocus={() =>
                      focusField("endDate")
                    }
                    className="flex flex-col gap-1"
                  >
                    <Field.Label className="text-sm font-normal text-gray-700">
                      End date
                    </Field.Label>

                    <input
                      type="month"
                      {...register("endDate", {
                        required: !isCurrent
                          ? "End date is required"
                          : false,
                        valueAsDate: true,
                        validate: (value) => {
                          if (!value || !startDate) {
                            return true;
                          }

                          if (value < startDate) {
                            return "End date must be after start date";
                          }

                          return true;
                        },
                      })}
                      disabled={isCurrent}
                      min={
                        startDate
                          ? formatMonth(startDate)
                          : undefined
                      }
                      max={getCurrentMonth()}
                      className="h-8 w-full rounded-lg border border-gray-300 px-2 text-sm font-normal outline-0 disabled:bg-gray-100 disabled:text-gray-400 focus:border-gray-600"
                    />

                    {focusedField === "endDate" &&
                      errors.endDate?.message && (
                        <div className="text-xs text-red-700">
                          {errors.endDate.message}
                        </div>
                      )}
                  </Field.Root>
                </div>

                {/* Current */}
                <Field.Root>
                  <Field.Label className="mt-1 flex cursor-pointer items-center gap-2 text-xs font-normal text-gray-600">
                    <input
                      type="checkbox"
                      {...register("isCurrent")}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span>
                      I am currently studying here
                    </span>
                  </Field.Label>
                </Field.Root>
              </div>
            </Field.Root>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4">
              <div className="text-xs text-red-700/75">
                {errors.root?.message}
              </div>

              <Button
                disabled={!isValid || isSubmitting}
                focusableWhenDisabled
                type="submit"
                className={cn(
                  "flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg bg-green-600 px-3 text-sm text-white transition",
                  "hover:bg-green-700",
                  "data-disabled:cursor-default data-disabled:bg-green-600/50",
                )}
              >
                {isSubmitting && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-3 border-white/75 border-b-white/25" />
                )}

                <span>Add</span>
              </Button>
            </div>
          </Form>

          {/* Education list */}
          <div className="col-span-2 flex flex-col gap-3 overflow-y-scroll pr-5 max-h-94">
            {!education.length && (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                No Education
              </div>
            )}

            {education.toReversed().map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg border border-gray-200 p-3"
              >
                <div className="absolute right-2 top-1">
                  <DeleteFormDialog
                    item={{
                      id: item.id,
                      name: item.institution,
                      talentId: item.talent_id,
                    }}
                  />
                </div>

                <div className="break-words text-sm text-gray-700">
                  {item.institution}
                </div>

                <div className="break-words text-xs text-gray-700">
                  {item.qualification}
                  {item.field_of_study
                    ? ` • ${item.field_of_study}`
                    : ""}
                </div>

                <div className="break-words text-xs text-gray-500">
                  {item.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteFormDialog({
  item,
}: {
  item: {
    id: string;
    name: string;
    talentId: string;
  };
}) {
  const [isPending, setIsPending] =
    useState(false);

  const onDelete = async () => {
    setIsPending(true);

    try {
      const result = await deleteEducation(
        item.id,
        item.talentId,
      );

      if (result.success) {
        toast.success("Education deleted");
      } else {
        toast.error(
          result.message ||
            "Failed to delete education",
        );
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <XIcon className="size-4 hover:text-red-500" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 min-h-dvh backdrop-blur-[2px]" />

        <Dialog.Viewport>
          <Dialog.Popup className="fixed left-1/2 top-1/2 flex w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.9] data-starting-style:opacity-0">
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-semibold">
                Delete {item.name}
              </Dialog.Title>

              <Dialog.Close className="text-black">
                <XIcon />
              </Dialog.Close>
            </div>

            <Dialog.Description className="text-sm text-gray-500">
              This action cannot be undone.
            </Dialog.Description>

            <div className="flex w-full justify-end">
              <Button
                onClick={onDelete}
                disabled={isPending}
                focusableWhenDisabled
                type="button"
                className={cn(
                  "flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg bg-red-500 px-3 text-sm text-white transition",
                  "hover:bg-red-600",
                  "data-disabled:cursor-default data-disabled:bg-red-500/50",
                )}
              >
                {isPending && (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-3 border-white/75 border-b-white/25" />
                )}

                <span>Delete</span>
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}