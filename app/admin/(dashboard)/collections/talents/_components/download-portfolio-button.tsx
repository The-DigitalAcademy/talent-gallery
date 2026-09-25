"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/app/lib/utils";

interface DownloadPortfolioButtonProps {
  talentId: string;
  talentName: string;
}

export default function DownloadPortfolioButton({
  talentId,
  talentName,
}: DownloadPortfolioButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    const toastId = toast.loading("Generating portfolio PDF...");

    try {
      const response = await fetch(
        `/api/admin/talents/${talentId}/portfolio-pdf`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate PDF");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${slugify(talentName || "talent")}-portfolio.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Portfolio PDF downloaded successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      console.error("PDF download error:", error);
      toast.error(error?.message || "Failed to download portfolio PDF", {
        id: toastId,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className="inline-flex items-center gap-1.5 h-8 px-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-black transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      title="Download Portfolio as PDF"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
      ) : (
        <FileDown className="w-4 h-4 text-purple-600" />
      )}
      <span>{isGenerating ? "Generating..." : "Download Portfolio"}</span>
    </button>
  );
}
