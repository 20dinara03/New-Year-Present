import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendTelegramMessage } from "@/lib/telegram";
import { GIFT_UNLOCK_DATE } from "@/lib/time-server";

export async function GET(req: Request) {
    try {
        // 1️⃣ защита — чтобы нельзя было дергать кому угодно
        const userAgent = req.headers.get("user-agent");

        if (!userAgent?.includes("vercel-cron")) {
            return NextResponse.json(
                { error: "Not a cron request" },
                { status: 401 }
            );
        }

        // 2️⃣ проверяем дату
        const now = new Date();
        if (now < GIFT_UNLOCK_DATE) {
            return NextResponse.json({
                status: "too_early",
                now,
            });
        }

        // 3️⃣ берём всех, кому ещё не отправляли
        const { data: users, error } = await supabase
            .from("users")
            .select("id, name, telegram_chat_id")
            .eq("notified", false)
            .not("telegram_chat_id", "is", null);

        if (error) throw error;

        // 4️⃣ отправляем каждому сообщение
        for (const user of users ?? []) {
            const message = `
🎁 С Новым годом, ${user.name}!

Подарок для тебя уже доступен ✨  
Я специально ждала этого момента.

Открывай здесь 👇
https://new-year-present.vercel.app/greeting?id=${encodeURIComponent(
                user.name
            )}
            `.trim();

            await sendTelegramMessage(message, user.telegram_chat_id.toString());

            // 5️⃣ помечаем, что уведомление отправлено
            await supabase
                .from("users")
                .update({ notified: true })
                .eq("id", user.id);
        }

        return NextResponse.json({
            success: true,
            sent: users?.length ?? 0,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}