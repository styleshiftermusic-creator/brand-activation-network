import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.email || !body.name) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const { error } = await supabase.from('webinar_registrations').insert([
            {
                full_name: body.name,
                email: body.email,
                event_name: 'AI Workshop Engine Challenge'
            }
        ]);

        if (error) {
            console.error("Supabase Insertion Error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        console.log("LIVE BACKEND: Successfully registered new lead into Supabase:", body.email);

        return NextResponse.json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
    }
}
