"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NameForm() {
    const [name, setName] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md text-center space-y-6"
        >
            <h1 className="text-3xl font-semibold">
                Привет ✨
            </h1>

            <p className="text-gray-400">
                Как тебя зовут?
            </p>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введи имя"
                className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-white transition"
            />

            <button
                disabled={!name.trim()}
                className="w-full rounded-lg bg-white text-black py-3 font-medium disabled:opacity-40 transition"
            >
                Продолжить
            </button>
        </motion.div>
    );
}