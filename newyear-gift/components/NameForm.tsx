"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { greetings } from "@/data/greetings";
import { normalizeName } from "@/lib/normalizeName";

export default function NameForm() {
    const [value, setValue] = useState("");
    const router = useRouter();

    const normalized = normalizeName(value);
    const allVariants = Object.values(greetings).flat();

    const suggestions =
        value.length > 0
            ? allVariants.filter((v) =>
                  normalizeName(v.label).startsWith(normalized)
              )
            : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
                relative
                w-full
                max-w-md
                text-center
                space-y-8
                p-8
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                shadow-2xl
            "
        >
            <h1 className="text-3xl font-semibold tracking-tight">
                Привет ✨
            </h1>

            <p className="text-gray-400">
                Как тебя зовут?
            </p>

            <div className="relative">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Начни вводить имя"
                    className="
                        w-full
                        rounded-xl
                        bg-zinc-900/80
                        border
                        border-zinc-700
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-white
                        focus:ring-2
                        focus:ring-white/20
                        transition
                    "
                />

                <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="
                                absolute
                                z-10
                                w-full
                                bg-zinc-900
                                border
                                border-zinc-700
                                rounded-xl
                                mt-2
                                overflow-hidden
                                shadow-xl
                            "
                        >
                            {suggestions.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() =>
                                        router.push(`/greeting?id=${item.id}`)
                                    }
                                    className="
                                        px-4
                                        py-3
                                        cursor-pointer
                                        hover:bg-white/10
                                        transition
                                    "
                                >
                                    {item.label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={() => router.push("/greeting")}
                className="
                    w-full
                    rounded-xl
                    bg-white
                    text-black
                    py-3
                    font-medium
                    hover:scale-[1.02]
                    transition
                "
            >
                Продолжить
            </button>
        </motion.div>
    );
}