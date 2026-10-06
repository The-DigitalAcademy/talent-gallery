import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/lib/auth/requireAdmin';
import { getTalentPortfolioById } from '@/app/lib/talents/getTalentPortfolioById';
import { slugify } from '@/app/lib/utils';
import { renderToBuffer } from '@react-pdf/renderer';
import TalentPortfolioPDF from '@/app/admin/(dashboard)/collections/talents/_components/TalentPortfolioPDF';
import React from 'react';

// Helper: fetch a remote image and convert to PNG base64 data URI
// @react-pdf/renderer only supports JPEG and PNG — not WebP or SVG
// Use images.weserv.nl free service to convert WebP to PNG on the fly
async function toDataUri(url: string): Promise<string | null> {
  try {
    // Use images.weserv.nl free image processing service
    // Format: https://images.weserv.nl/?url={encoded_url}&output=png
    const encodedUrl = encodeURIComponent(url);
    const weservUrl = `https://images.weserv.nl/?url=${encodedUrl}&output=png`;

    const res = await fetch(weservUrl, { cache: 'no-store' });
    if (!res.ok) {
      console.warn('Failed to fetch converted image:', res.status, res.statusText);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.warn('toDataUri failed:', err);
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce Admin Authorization
    await requireAdmin();

    const { id } = await params;
    if (!id) {
      return new Response('Talent ID is required', { status: 400 });
    }

    // 2. Fetch full talent portfolio data
    const { data: talent, error } = await getTalentPortfolioById(id);

    if (error || !talent) {
      return new Response('Talent not found', { status: 404 });
    }

    // 3. Convert profile image to base64 data URI (WebP to PNG conversion)
    let processedImageUrl: string | null = talent.profile_image_url || null;
    if (talent.profile_image_url) {
      console.log('Original image URL:', talent.profile_image_url);
      const dataUri = await toDataUri(talent.profile_image_url);
      if (dataUri) processedImageUrl = dataUri;
      console.log('Final processed image URL:', processedImageUrl ? 'SET' : 'NULL');
    }

    const pdfData = {
      ...talent,
      profile_image_url: processedImageUrl,
    };

    // 4. Render PDF to Buffer
    const pdfBuffer = await renderToBuffer(
      React.createElement(TalentPortfolioPDF, { talent: pdfData }) as any
    );

    const safeFilename = `${slugify(talent.fullname || 'talent')}-portfolio.pdf`;

    // 5. Return PDF Response
    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error generating talent portfolio PDF:', error);
    if (error?.name === 'UnauthorizedError' || error?.message === 'Not authenticated' || error?.message === 'Not an authorized admin') {
      return new Response(error.message, { status: 401 });
    }
    return new Response(error?.message || 'Failed to generate portfolio PDF', {
      status: 500,
    });
  }
}
