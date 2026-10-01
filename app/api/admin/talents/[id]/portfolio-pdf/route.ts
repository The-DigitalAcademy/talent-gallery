import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/lib/auth/requireAdmin';
import { getTalentPortfolioById } from '@/app/lib/talents/getTalentPortfolioById';
import { slugify } from '@/app/lib/utils';
import { renderToBuffer } from '@react-pdf/renderer';
import TalentPortfolioPDF from '@/app/admin/(dashboard)/collections/talents/_components/TalentPortfolioPDF';
import React from 'react';

import sharp from 'sharp';

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

    // 3. Convert candidate profile image to PNG data URI (handles WebP/Vercel blob)
    let processedImageUrl = talent.profile_image_url;
    if (talent.profile_image_url) {
      try {
        const imageRes = await fetch(talent.profile_image_url);
        if (imageRes.ok) {
          const imageArrayBuffer = await imageRes.arrayBuffer();
          const pngBuffer = await sharp(Buffer.from(imageArrayBuffer))
            .resize(600, 600, { fit: 'cover', position: 'top' })
            .png()
            .toBuffer();
          processedImageUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;
        }
      } catch (imgErr) {
        console.warn('Could not convert candidate image to PNG for PDF:', imgErr);
      }
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
