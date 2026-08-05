"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { useShortlistStore } from "@/app/store/useShortlistStore";
import { useShortlistHydrated } from "@/app/store/useHasHydrated";
import { getTalentsByIds, submitEnquiryAction, EnquiryFormState } from "./actions";
import { Talent } from "@/app/interface-types/talent";
import { toast } from "sonner";

import ShortlistCard from "./_components/ShortlistCard";
import ShortlistForm from "./_components/ShortlistForm";
import EmptyState from "./_components/EmptyState";
import SuccessState from "./_components/SuccessState";
import ShortlistSkeleton from "./_components/ShortlistSkeleton";

export default function ShortlistPage() {
  const shortlisted = useShortlistStore((s) => s.shortlisted);
  const toggle = useShortlistStore((s) => s.toggle);
  const hasHydrated = useShortlistHydrated();

  const [talents, setTalents] = useState<Talent[]>([]);
  const [loadingTalents, setLoadingTalents] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    email: "",
    companyName: "",
    contactName: "",
    message: "",
  });
  const [formState, setFormState] = useState<EnquiryFormState | null>(null);

  const talentIds = hasHydrated ? Object.keys(shortlisted) : [];
  const count = talentIds.length;

  // Fetch talent details whenever the shortlist IDs change
  useEffect(() => {
    if (!hasHydrated) return;
    setLoadingTalents(true);
    getTalentsByIds(talentIds).then((data) => {
      setTalents(data);
      setLoadingTalents(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, JSON.stringify(talentIds)]);

  const handleRemove = (id: string) => {
    toggle(id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formState?.errors?.[e.target.name]) {
      setFormState((prev) =>
        prev
          ? {
              ...prev,
              errors: Object.fromEntries(
                Object.entries(prev.errors ?? {}).filter(
                  ([k]) => k !== e.target.name
                )
              ),
            }
          : null
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await submitEnquiryAction({
          ...form,
          talentIds,
        });
        setFormState(result);
        if (result.success) {
          setSubmitted(true);
          talentIds.forEach((id) => toggle(id));
        } else if (result.message) {
          toast.error(result.message);
        }
      } catch (err: unknown) {
        console.error("Form submit error:", err);
        toast.error("An unexpected error occurred. Please try again.");
        setFormState({
          success: false,
          message: "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  if (submitted) return <SuccessState />;

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-10 md:py-16 px-4 sm:px-6 md:px-8 flex justify-center">
      <div className="w-full md:w-3xl lg:w-[960px] xl:w-[1170px] mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-12 lg:p-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-gray-900">
            YOUR SHORTLIST
          </h1>
          <Link
            href="/talent"
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close shortlist"
          >
            <XIcon size={20} />
          </Link>
        </div>

        {/* Shortlist Counter Subtitle */}
        {count > 0 && (
          <p className="text-gray-700 text-sm md:text-base mb-6">
            You&apos;ve shortlisted <span className="font-bold">{count}</span> candidate
            {count !== 1 ? "s" : ""}.
          </p>
        )}

        {/* Content */}
        {!hasHydrated || loadingTalents ? (
          <ShortlistSkeleton />
        ) : count === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Shortlisted Candidate Cards */}
            <div className="flex flex-col gap-3 mb-8">
              {talents.map((talent) => (
                <ShortlistCard
                  key={talent.id}
                  talent={talent}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Form Intro */}
            <p className="text-[13px] text-gray-600 leading-relaxed mb-8">
              Complete the form below, and a member of the Shaper team will
              contact you to discuss candidate availability, facilitate
              introductions where appropriate, and support the next steps in the
              engagement process.
            </p>

            {/* Enquiry Form */}
            <ShortlistForm
              form={form}
              formState={formState}
              isPending={isPending}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}
