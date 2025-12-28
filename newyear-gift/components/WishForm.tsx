"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type WishFormProps = {
    fromName: string;
};

export default function WishForm({ fromName }: WishFormProps) {
    const [message, setMessage] = useState("");
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
                from_name: fromName,
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
            className="w-full space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center">
                Напиши мне что-нибудь анонимно 💌
            </h2>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Тёплое пожелание, мысль или просто пару слов…"
                className="
                    w-full
                    min-h-[140px]
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

            <p className="text-center text-sm text-gray-400">
                Сообщение будет отправлено анонимно
            </p>
        </motion.div>
    );
}