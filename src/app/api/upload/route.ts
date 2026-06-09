import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSession } from '@/lib/auth';

// Detect the real image type from magic bytes, ignoring the client-supplied
// MIME/extension. SVG is intentionally unsupported (it can carry <script>).
function detectImageExt(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf.length >= 4 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'gif';
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Read bytes and verify the actual content is a supported raster image.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = detectImageExt(buffer);
    if (!ext) {
      return NextResponse.json(
        { error: 'Invalid file. Only JPEG, PNG, WebP, and GIF images are allowed.' },
        { status: 400 }
      );
    }

    // Generate unique filename — extension comes from detected content, not the
    // client filename, so the original name cannot inject an extension.
    const timestamp = Date.now();
    const safeName = path
      .basename(file.name)
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .substring(0, 50) || 'image';
    const filename = `${safeName}-${timestamp}.${ext}`;

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Write file
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
