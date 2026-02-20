import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Simulate database processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real environment, you would use Prisma or Supabase client here:
        // await supabase.from('webinar_registrations').insert([body])

        console.log("MOCK BACKEND: Successfully registered new lead:", body.email);

        return NextResponse.json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to parse request" }, { status: 400 });
    }
}
