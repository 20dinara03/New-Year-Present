"use client";

import { motion } from "framer-motion";

export default function GiftBox({ locked }: { locked: boolean }) {
    return (
        <motion.div
            whileHover={locked ? {} : { scale: 1.05 }}
            whileTap={
                locked
                    ? { x: [-6, 6, -6, 6, 0] }
                    : {}
            }
            className="
                w-40 h-40 mx-auto
                rounded-3xl
                bg-gradient-to-br from-red-500 to-pink-600
                flex items-center justify-center
                shadow-2xl
                cursor-pointer
            "
        >
            <span className="text-5xl">🎁</span>
        </motion.div>
    );
}