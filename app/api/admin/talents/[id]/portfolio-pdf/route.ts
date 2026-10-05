import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/lib/auth/requireAdmin';
import { getTalentPortfolioById } from '@/app/lib/talents/getTalentPortfolioById';
import { slugify } from '@/app/lib/utils';
import { renderToBuffer } from '@react-pdf/renderer';
import TalentPortfolioPDF from '@/app/admin/(dashboard)/collections/talents/_components/TalentPortfolioPDF';
import React from 'react';
import sharp from 'sharp';

// Helper: fetch a remote image and return a JPEG base64 data URI.
// @react-pdf/renderer only supports JPEG and PNG — not WebP.
// Sharp converts any format (WebP, PNG, etc.) → JPEG.
async function toDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const jpeg = await sharp(buffer)
      .flatten({ background: '#E9B8FF' }) // fill WebP transparency with the PDF photo background color
      .resize(600, 600, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 85 })
      .toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
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

    // 3. Convert profile image to base64 data URI so the PDF renderer can embed it.
    // @react-pdf/renderer cannot resolve external HTTPS URLs inside Vercel serverless
    // functions without converting them first. No sharp needed — just fetch + Buffer.
    let processedImageUrl: string | null = talent.profile_image_url || null;
    if (talent.profile_image_url) {
      const dataUri = await toDataUri(talent.profile_image_url);
      if (dataUri) processedImageUrl = dataUri;
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

    // 4. Return PDF Response
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
