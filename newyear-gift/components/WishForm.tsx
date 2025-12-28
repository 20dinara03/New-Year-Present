"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WishForm() {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) return;

        setLoading(true);

        await fetch("/api/wish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                fromName: name || "Аноним",
            }),
        });

        setLoading(false);
        setSent(true);
    };

    if (sent) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-lg text-gray-200"
            >
                💌 Твоё сообщение доставлено  
                <br />
                Спасибо за тепло
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center">
                Напиши мне что-нибудь 💌
            </h2>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Тёплое пожелание, мысль или просто пару слов…"
                className="
                    w-full
                    min-h-[120px]
                    rounded-xl
                    bg-zinc-900
                    border
                    border-zinc-700
                    p-4
                    text-white
                    outline-none
                    focus:border-white
                    resize-none
                "
            />

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Твоё имя (необязательно)"
                className="
                    w-full
                    rounded-lg
                    bg-zinc-900
                    border
                    border-zinc-700
                    px-4
                    py-2
                    text-white
                    outline-none
                    focus:border-white
                "
            />

            <button
                onClick={handleSubmit}
                disabled={loading || !message.trim()}
                className="
                    w-full
                    rounded-lg
                    bg-white
                    text-black
                    py-3
                    font-medium
                    disabled:opacity-40
                    transition
                "
            >
                {loading ? "Отправляю…" : "Отправить 💌"}
            </button>
        </motion.div>
    );
}