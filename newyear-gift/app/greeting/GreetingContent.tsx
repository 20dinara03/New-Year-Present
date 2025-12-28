"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { greetings } from "@/data/greetings";

export default function GreetingContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const allVariants = Object.values(greetings).flat();

    const greeting =
        allVariants.find((v) => v.id === id) ??
        greetings.default[0];

    const { title, text, media } = greeting.config;

    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-xl text-center space-y-6"
            >
                <h1 className="text-4xl font-semibold">{title}</h1>

                {media.type === "image" && (
                    <img
                        src={media.src}
                        alt=""
                        className="mx-auto rounded-xl max-h-64 object-cover"
                    />
                )}

                {media.type === "gif" && (
                    <motion.img
                        src={media.src}
                        alt=""
                        className="mx-auto rounded-xl max-h-64"
                    />
                )}

                {media.type === "video" && (
                    <motion.video
                        src={media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="mx-auto rounded-xl max-h-64 shadow-xl"
                    />
                )}

                <p className="text-gray-300 text-lg">{text}</p>
            </motion.div>
        </main>
    );
}