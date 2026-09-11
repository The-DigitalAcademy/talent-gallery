import { put } from '@vercel/blob';

export async function POST(request: Request) {
    try {
        const form = await request.formData();
        const file = form.get('file') as File;

        // 1. Validation check
        if (!file) {
            return Response.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file size (<= 1MB)
        if (file.size > 1 * 1024 * 1024) {
            return Response.json({ error: 'File size exceeds 1MB limit' }, { status: 413 });
        }

        const blob = await put(`profile-images/${file.name}`, file, { access: 'public', addRandomSuffix: true });
        return Response.json({ url: blob.url });
    } catch (error) {
        console.error(error)
        return Response.json({ error: 'Upload failed' }, { status: 500 });
    }

}