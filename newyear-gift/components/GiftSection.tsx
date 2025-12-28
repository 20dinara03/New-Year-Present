"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isGiftUnlocked } from "@/lib/time-client";
import GiftBox from "./GiftBox";
import CountdownTimer from "./CountdownTimer";

export default function GiftSection() {
    const [unlocked, setUnlocked] = useState(false);
    const [opened, setOpened] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        setUnlocked(isGiftUnlocked());
    }, []);

    const handleClick = () => {
        if (!unlocked) {
            setShake(true);
            setTimeout(() => setShake(false), 600);
            return;
        }

        setOpened(true);
    };

    return (
        <div className="mt-12 space-y-4 text-center">
            {/* 🎁 Подарок всегда виден */}
            <GiftBox
                locked={!unlocked}
                shake={shake}
                onClick={handleClick}
            />

            {/* ⏳ Таймер только если закрыт */}
            {!unlocked && (
                <>
                    <CountdownTimer />
                    <p className="text-sm text-gray-500">
                        Немного терпения… 🎄
                    </p>
                </>
            )}

            {/* 🎉 Открытие подарка */}
            <AnimatePresence>
                {opened && unlocked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4 mt-6"
                    >
                        <h2 className="text-2xl font-semibold">
                            🎉 Сюрприз!
                        </h2>

                        <motion.video
                            src="/videos/main-gift.mp4"
                            autoPlay
                            controls
                            className="rounded-xl mx-auto shadow-xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}