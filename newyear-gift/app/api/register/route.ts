import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
    try {
        const { name, slug, telegram, pageUrl } = await req.json();

        if (!telegram || !telegram.startsWith("@")) {
            return NextResponse.json(
                { error: "Invalid telegram" },
                { status: 400 }
            );
        }

        // 1️⃣ сохраняем пользователя
        const { error } = await supabase.from("users").insert([
            {
                name,
                slug,        
                telegram,
                locale: "ru",
            },
        ]);


        if (error) throw error;

        // 2️⃣ уведомление тебе
        await sendTelegramMessage(
            `🎁 Новый контакт\n\n` +
            `Имя: ${name}\n` +
            `Telegram: ${telegram}\n\n` +
            `🔗 Страница:\n${pageUrl || "—"}`
        );

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}