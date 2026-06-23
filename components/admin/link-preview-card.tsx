'use client';

import { useState, useEffect } from 'react';

export default function URLPreview({ targetUrl }: { targetUrl: string | null | undefined }) {
  const [data, setData] = useState<{ title: string, description: string, image: string, siteName: string, url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!targetUrl) return;

    setLoading(true);
    setError(false);

    fetch(`/api/link-preview?url=${encodeURIComponent(targetUrl)}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [targetUrl]);

  // Loading skeleton
  if (!targetUrl) return <></>
  if (loading) {
    return (
      <div className="flex w-full h-28 border border-gray-200 rounded-lg overflow-hidden animate-pulse bg-gray-50">
        <div className="w-32 bg-gray-200 h-full" />
        <div className="flex-1 p-3 space-y-2 flex flex-col justify-center">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-2 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    );
  }

  // Fallback if the link data cannot be parsed
  if (error || !data) {
    return (
      <a href={targetUrl || ''} target="_blank" rel="noopener noreferrer" className="border border-gray-200 rounded-lg text-sm px-3 py-2 w-full text-gray-500 hover:text-blue-500">
        No Preview | {targetUrl}
      </a>
    );
  }

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex border h-28 w-full border-gray-200 rounded-lg overflow-hidden bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 group text-left"
    >
      {/* Thumbnail Image */}
      {data.image && (
        <div className="relative w-32 sm:w-40 flex-shrink-0 border-r border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Text Content */}
      <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-500 transition-colors">
          {data.title}
        </h4>
        {data.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {data.description}
          </p>
        )}
        <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-2 font-medium">
          {data.siteName || new URL(targetUrl).hostname}
        </span>
      </div>
    </a>
  );
}
