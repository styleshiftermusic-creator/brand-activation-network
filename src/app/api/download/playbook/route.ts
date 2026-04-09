import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'blueprints', 'ban-credit-sweep.md');
        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Content-Disposition': 'attachment; filename="BAN-Credit-Sweep-Blueprint.md"',
                'Cache-Control': 'no-store',
            },
        });
    } catch (err) {
        console.error('Failed to serve OPA playbook:', err);
        return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }
}
