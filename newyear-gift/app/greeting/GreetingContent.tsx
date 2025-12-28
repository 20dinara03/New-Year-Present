"use client";

import { useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { greetings } from "@/data/greetings";
import GiftSection from "@/components/GiftSection";
import TelegramForm from "@/components/TelegramForm";
import WishForm from "@/components/WishForm";
import { isGiftUnlocked } from "@/lib/time-client";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export default function GreetingContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const allVariants = Object.values(greetings).flat();
    const greeting =
        allVariants.find((v) => v.id === id) ?? greetings.default[0];

    const { title, text, media } = greeting.config;

    // ✅ имя отправителя для анонимного пожелания
    const senderName = title.replace(/ ✨| 🤍| 🎄/, "");

    return (
        <main className="relative min-h-screen bg-black text-white px-4 overflow-hidden">
            {/* 🌌 Фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 opacity-80" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-6xl
                    w-full
                    grid
                    grid-cols-1
                    lg:grid-cols-[1.2fr_0.8fr]
                    gap-8
                    py-16
                "
            >
                {/* 🎄 ЛЕВАЯ КОЛОНКА */}
                <motion.div
                    variants={item}
                    className="
                        space-y-8
                        p-8
                        rounded-3xl
                        bg-white/5
                        backdrop-blur-xl
                        shadow-2xl
                        text-center
                    "
                >
                    <motion.h1
                        variants={item}
                        className="text-4xl md:text-5xl font-semibold tracking-tight"
                    >
                        {title}
                    </motion.h1>

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

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-lg text-gray-200 leading-relaxed"
                    >
                        {text}
                    </motion.p>

                    <GiftSection />
                    {!isGiftUnlocked() && (
                        <TelegramForm
                            name={senderName}
                            slug={id ?? "default"}
                        />
                    )}

                </motion.div>

                {/* 💌 ПРАВАЯ КОЛОНКА — ПРИЖАТА К ВЕРХУ */}
                <motion.div
                    variants={item}
                    className="
                        self-start
                        p-8
                        rounded-3xl
                        bg-white/5
                        backdrop-blur-xl
                        shadow-2xl
                    "
                >
                    <WishForm fromName={senderName} />
                </motion.div>
            </motion.div>
        </main>
    );
}