// app/api/preview/route.js
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
        return NextResponse.json({ error: 'URL query parameter is required' }, { status: 400 });
    }

    try {
        // Fetch the target website's HTML with a user-agent header
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            next: { revalidate: 3600 } // Cache results for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the target website');
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Helper function to extract tags cleanly
        function getMetaTag(propertyOrName: string) {
            return (
                $(`meta[property="${propertyOrName}"]`).attr('content') ||
                $(`meta[name="${propertyOrName}"]`).attr('content') ||
                ''
            );
        };

        // Extract Open Graph and standard metadata
        const previewData = {
            title: getMetaTag('og:title') || $('title').text() || 'No title found',
            description: getMetaTag('og:description') || getMetaTag('description') || '',
            image: getMetaTag('og:image') || '',
            siteName: getMetaTag('og:site_name') || '',
            url: targetUrl,
        };

        return NextResponse.json(previewData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to extract metadata' }, { status: 500 });
    }
}
