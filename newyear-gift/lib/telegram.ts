export async function sendTelegramMessage(
    text: string,
    chatId?: string
) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (!token) {
        console.warn("Telegram token missing");
        return;
    }

    const targetChatId = chatId ?? adminChatId;

    if (!targetChatId) {
        console.warn("Telegram chatId missing");
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: targetChatId,
            text,
            parse_mode: "HTML",
        }),
    });
}