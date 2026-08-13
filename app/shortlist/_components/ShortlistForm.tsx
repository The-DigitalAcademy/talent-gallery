"use client";

import Link from "next/link";
import { EnquiryFormState } from "../actions";

interface ShortlistFormProps {
  form: {
    email: string;
    companyName: string;
    contactName: string;
    message: string;
  };
  formState: EnquiryFormState | null;
  isPending: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ShortlistForm({
  form,
  formState,
  isPending,
  onChange,
  onSubmit,
}: ShortlistFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* General error */}
      {formState?.errors?.general && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {formState.errors.general}
        </p>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2"
        >
          Your Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="name@company.com"
          value={form.email}
          onChange={onChange}
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
        <label
          htmlFor="companyName"
          className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2"
        >
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          placeholder="Your organisation or company name"
          value={form.companyName}
          onChange={onChange}
          className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
            formState?.errors?.companyName
              ? "border-red-400"
              : "border-gray-200"
          }`}
        />
        {formState?.errors?.companyName && (
          <p className="text-xs text-red-500 mt-1">
            {formState.errors.companyName}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div>
        <label
          htmlFor="contactName"
          className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2"
        >
          Contact Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contactName"
          name="contactName"
          type="text"
          placeholder="Your full name"
          value={form.contactName}
          onChange={onChange}
          className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
            formState?.errors?.contactName
              ? "border-red-400"
              : "border-gray-200"
          }`}
        />
        {formState?.errors?.contactName && (
          <p className="text-xs text-red-500 mt-1">
            {formState.errors.contactName}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-[11px] font-bold uppercase tracking-widest text-gray-700 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about the opportunity, role requirements, preferred skills, or any additional information that may help us support your request."
          value={form.message}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-3">
        <Link
          href="/talent"
          className="flex-1 text-center bg-[#E5E5E5] hover:bg-gray-300 text-black font-bold text-sm py-3.5 px-4 rounded-md transition-colors whitespace-nowrap"
        >
          Continue Browsing
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-[#FF0000] hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 px-4 rounded-md transition-colors whitespace-nowrap"
        >
          {isPending ? "Submitting…" : "Submit Interest"}
        </button>
      </div>
    </form>
  );
}
