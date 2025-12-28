"use client";

import { useEffect, useState } from "react";
import { isGiftUnlocked } from "@/lib/time";
import CountdownTimer from "./CountdownTimer";
import GiftBox from "./GiftBox";
import { motion } from "framer-motion";

export default function GiftSection() {
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        setUnlocked(isGiftUnlocked());
    }, []);

    return (
        <div className="mt-12 space-y-4 text-center">
            {!unlocked && (
                <>
                    <GiftBox locked />
                    <CountdownTimer />
                    <p className="text-sm text-gray-500">
                        Немного терпения… 🎄
                    </p>
                </>
            )}

            {unlocked && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl font-semibold">
                        🎉 Сюрприз!
                    </h2>

                    <video
                        src="/videos/main-gift.mp4"
                        autoPlay
                        controls
                        className="rounded-xl mx-auto shadow-xl"
                    />
                </motion.div>
            )}
        </div>
    );
}