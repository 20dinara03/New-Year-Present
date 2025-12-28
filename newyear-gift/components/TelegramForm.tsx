"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TelegramForm({ name }: { name: string }) {
    const [telegram, setTelegram] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!telegram.startsWith("@")) return;

        setLoading(true);

        const pageUrl =
            typeof window !== "undefined" ? window.location.href : "";

        await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                telegram,
                pageUrl, // ✅ добавили
            }),
        });

        setSent(true);
        setLoading(false);
    };

    if (sent) {
        return (
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 mt-6"
            >
                Я напишу тебе 🎁
            </motion.p>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-4"
        >
            <p className="text-sm text-gray-400">
                Оставь Telegram, я пришлю напоминание, когда придет время открывать подарок ✨
            </p>

            <input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="@username"
                className="
                    w-full
                    rounded-lg
                    bg-zinc-900
                    border border-zinc-700
                    px-4 py-3
                    text-white
                    outline-none
                "
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                    w-full
                    rounded-lg
                    bg-white
                    text-black
                    py-3
                    font-medium
                    hover:bg-gray-200
                    transition
                "
            >
                {loading ? "Отправка..." : "Отправить"}
            </button>
        </motion.div>
    );
}