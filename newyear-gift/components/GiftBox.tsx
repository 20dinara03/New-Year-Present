"use client";

import { motion } from "framer-motion";

export default function GiftBox({
    locked,
    shake,
    onClick,
}: {
    locked: boolean;
    shake?: boolean;
    onClick?: () => void;
}) {
    return (
        <motion.div
            onClick={onClick}
            animate={
                shake
                    ? { x: [-6, 6, -6, 6, 0] }
                    : {}
            }
            whileHover={!locked ? { scale: 1.05 } : {}}
            transition={{ duration: 0.5 }}
            className="
                w-40 h-40 mx-auto
                rounded-3xl
                bg-gradient-to-br from-red-500 to-pink-600
                flex items-center justify-center
                shadow-2xl
                cursor-pointer
                select-none
            "
        >
            <span className="text-5xl">🎁</span>
        </motion.div>
    );
}