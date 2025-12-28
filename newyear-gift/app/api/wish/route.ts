import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
    const { message, fromName } = await req.json();

    if (!message) {
        return NextResponse.json({ error: "No message" }, { status: 400 });
    }

    // 1️⃣ сохраняем в Supabase
    await supabase.from("wishes").insert({
        message,
        from_name: fromName,
    });

    // 2️⃣ отправляем тебе в Telegram
    await sendTelegramMessage(
        `💌 <b>Новое анонимное пожелание</b>\n\n<b>От:</b> ${fromName}\n\n<b>Сообщение:</b>\n${message}`
    );

    return NextResponse.json({ ok: true });
}