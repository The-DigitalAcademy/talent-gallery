import { NextRequest } from 'next/server';
import { requireAdmin } from '@/app/lib/auth/requireAdmin';
import { getTalentPortfolioById } from '@/app/lib/talents/getTalentPortfolioById';
import { slugify } from '@/app/lib/utils';
import { renderToBuffer } from '@react-pdf/renderer';
import TalentPortfolioPDF from '@/app/admin/(dashboard)/collections/talents/_components/TalentPortfolioPDF';
import React from 'react';


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

    // 3. Pass original image URL directly (PDF renderer handles cropping via objectFit)
    let processedImageUrl = talent.profile_image_url;

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
