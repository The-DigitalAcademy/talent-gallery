"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, Trash2Icon, ClipboardListIcon, CheckCircleIcon, ArrowLeftIcon } from "lucide-react";
import { useShortlistStore } from "@/app/store/useShortlistStore";
import { useShortlistHydrated } from "@/app/store/useHasHydrated";
import { getTalentsByIds, submitEnquiryAction, EnquiryFormState } from "./actions";
import { Talent } from "@/app/interface-types/talent";
import { toast } from "sonner";

// ─── Status badge colour map (matches existing TalentCard) ──────────────────
const getStatusColour = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case "available for wpe": return "bg-orange-500";
    case "available for hire": return "bg-amber-400";
    case "in wpe": return "bg-purple-500";
    case "employed": return "bg-teal-400";
    default: return "bg-orange-400";
  }
};

// ─── Avatar fallback initials ────────────────────────────────────────────────
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
        <ClipboardListIcon size={32} className="text-red-400" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your shortlist is empty</h2>
        <p className="text-gray-500 text-sm max-w-xs">
          Browse our talent directory and shortlist candidates you&apos;d like to connect with.
        </p>
      </div>
      <Link
        href="/talent"
        className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition-colors text-sm"
      >
        Browse Talent
      </Link>
    </div>
  );
}

// ─── Success confirmation ─────────────────────────────────────────────────────
function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
        <CheckCircleIcon size={36} className="text-green-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Enquiry Submitted!</h2>
        <p className="text-gray-500 text-sm max-w-sm">
          A member of the Shaper team will be in touch shortly to discuss the next steps.
        </p>
      </div>
      <Link
        href="/talent"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
      >
        <ArrowLeftIcon size={15} />
        Continue Browsing
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
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
    // Clear field-level error on change
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
          // Clear the shortlist store after a successful submission
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
    <div className="min-h-screen bg-[#F5F5F5] py-10 md:py-16 px-4">
      <div className="max-w-[680px] mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-[22px] font-extrabold uppercase tracking-widest text-gray-900">
              Your Shortlist
            </h1>
            {hasHydrated && count > 0 && (
              <p className="text-[14px] text-gray-600 mt-1">
                You&apos;ve shortlisted{" "}
                <span className="font-bold text-gray-900">{count}</span>{" "}
                {count === 1 ? "candidate" : "candidates"}.
              </p>
            )}
          </div>
          <Link
            href="/talent"
            className="text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
            aria-label="Continue browsing"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>

        {/* ── Candidate list or empty ── */}
        {!hasHydrated || loadingTalents ? (
          // Skeleton
          <div className="flex flex-col gap-3 mb-8">
            {[1, 2].map((i) => (
              <div key={i} className="border border-gray-100 rounded-md p-4 animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : count === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* ── Shortlisted candidate cards ── */}
            <div className="flex flex-col gap-3 mb-8">
              {talents.map((talent) => {
                const statusColour = getStatusColour(talent.talent_status?.name);
                const nameParts = talent.fullname.split(" ");
                const firstName = nameParts[0];
                const lastInitial = nameParts.length > 1 ? `${nameParts[nameParts.length - 1][0]}.` : "";

                return (
                  <div
                    key={talent.id}
                    className="relative border border-orange-400 rounded-md overflow-hidden"
                  >
                    {/* top accent line */}
                    <div className={`h-1 w-full ${statusColour}`} />

                    {/* Status badge */}
                    <div className={`absolute top-0 right-12 ${statusColour} text-white text-[10px] font-bold px-3 py-1 rounded-b-md`}>
                      {talent.talent_status?.name ?? ""}
                    </div>

                    <div className="flex items-center gap-4 px-4 py-4 pr-12">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center text-sm font-bold text-gray-600">
                        {talent.profile_image_url ? (
                          <Image
                            src={talent.profile_image_url}
                            alt={talent.fullname}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          initials(talent.fullname)
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="text-[14px] uppercase tracking-wide leading-snug">
                          <span className="font-bold">{firstName}</span>
                          {lastInitial && (
                            <span className="font-light"> {lastInitial}</span>
                          )}
                        </h3>
                        <p className="text-[12px] text-gray-600">
                          {talent.role?.name}
                        </p>
                        {talent.location && (
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPinIcon size={10} />
                            {talent.location.city}, {talent.location.country}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(talent.id)}
                      className="absolute bottom-3 right-4 text-gray-300 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${talent.fullname} from shortlist`}
                    >
                      <Trash2Icon size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Form intro text ── */}
            <p className="text-[13px] text-gray-600 leading-relaxed mb-8">
              Complete the form below, and a member of the Shaper team will contact you to discuss
              candidate availability, facilitate introductions where appropriate, and support the
              next steps in the engagement process.
            </p>

            {/* ── Enquiry Form ── */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* General error */}
              {formState?.errors?.general && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                  {formState.errors.general}
                </p>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                    formState?.errors?.email ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {formState?.errors?.email && (
                  <p className="text-xs text-red-500 mt-1">{formState.errors.email}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Your organisation or company name"
                  value={form.companyName}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                    formState?.errors?.companyName ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {formState?.errors?.companyName && (
                  <p className="text-xs text-red-500 mt-1">{formState.errors.companyName}</p>
                )}
              </div>

              {/* Contact Name */}
              <div>
                <label htmlFor="contactName" className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  placeholder="Your full name"
                  value={form.contactName}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                    formState?.errors?.contactName ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {formState?.errors?.contactName && (
                  <p className="text-xs text-red-500 mt-1">{formState.errors.contactName}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about the opportunity, role requirements, preferred skills, or any additional information that may help us support your request."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-2">
                <Link
                  href="/talent"
                  className="flex-1 text-center border border-gray-300 text-gray-700 font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Continue Browsing
                </Link>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3.5 rounded-md transition-colors"
                >
                  {isPending ? "Submitting…" : "Submit Interest"}
                </button>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
}
