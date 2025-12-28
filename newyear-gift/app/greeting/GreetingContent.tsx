"use client";

import { useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { greetings } from "@/data/greetings";
import GiftSection from "@/components/GiftSection";
import TelegramForm from "@/components/TelegramForm";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const item: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export default function GreetingContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const allVariants = Object.values(greetings).flat();
    const greeting =
        allVariants.find((v) => v.id === id) ??
        greetings.default[0];

    const { title, text, media } = greeting.config;

    return (
        <main className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-hidden">
            {/* ✨ Фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 opacity-80" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="
                    relative
                    max-w-xl
                    text-center
                    space-y-8
                    p-8
                    rounded-3xl
                    bg-white/5
                    backdrop-blur-xl
                    shadow-2xl
                "
            >
                {/* ✨ Заголовок */}
                <motion.h1
                    variants={item}
                    className="text-4xl md:text-5xl font-semibold tracking-tight"
                >
                    {title}
                </motion.h1>

                {/* 🎬 Медиа */}
                <motion.div variants={item}>
                    {media.type === "image" && (
                        <img
                            src={media.src}
                            alt=""
                            className="mx-auto rounded-2xl max-h-72 object-cover shadow-xl"
                        />
                    )}

                    {media.type === "gif" && (
                        <motion.img
                            src={media.src}
                            alt=""
                            className="mx-auto rounded-2xl max-h-72 shadow-xl"
                        />
                    )}

                    {media.type === "video" && (
                        <motion.video
                            src={media.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="mx-auto rounded-2xl max-h-72 shadow-xl"
                        />
                    )}
                </motion.div>

                {/* 💬 Текст — появление по словам */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-lg text-gray-200 leading-relaxed"
                >
                    {text.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: i * 0.015,
                                duration: 0.25,
                            }}
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                </motion.p>
                <GiftSection />
                <TelegramForm name={title.replace(/ ✨| 🤍| 🎄/, "")} />
            </motion.div>
        </main>
    );
}