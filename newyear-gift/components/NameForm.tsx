"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { greetings } from "@/data/greetings";
import { normalizeName } from "@/lib/normalizeName";

export default function NameForm() {
    const [value, setValue] = useState("");
    const router = useRouter();

    const normalized = normalizeName(value);

    // 1️⃣ собираем ВСЕ варианты
    const allVariants = Object.values(greetings).flat();

    // 2️⃣ фильтруем по label
    const suggestions =
        value.length > 0
            ? allVariants.filter((v) =>
                normalizeName(v.label).startsWith(normalized)
            )
            : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md text-center space-y-6"
        >
            <h1 className="text-3xl font-semibold">Привет ✨</h1>
            <p className="text-gray-400">Как тебя зовут?</p>

            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Введи имя"
                    className="
                        w-full
                        rounded-lg
                        bg-zinc-900
                        border
                        border-zinc-700
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-white
                        transition
                    "
                />

                {suggestions.length > 0 && (
                    <ul className="
                        absolute
                        z-10
                        w-full
                        bg-zinc-800
                        border
                        border-zinc-700
                        rounded-lg
                        mt-1
                        text-left
                        overflow-hidden
                    ">
                        {suggestions.map((item) => (
                            <li
                                key={item.id}
                                onClick={() =>
                                    router.push(`/greeting?id=${item.id}`)
                                }
                                className="
                                    px-4
                                    py-2
                                    cursor-pointer
                                    hover:bg-zinc-700
                                    transition
                                "
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* fallback, если не выбрали из списка */}
            <button
                onClick={() => router.push("/greeting")}
                className="
                    w-full
                    rounded-lg
                    bg-white
                    text-black
                    py-3
                    font-medium
                    transition
                "
            >
                Продолжить
            </button>
        </motion.div>
    );
}