"use client";

import { useEffect, useState } from "react";
import { getTimeLeft } from "@/lib/time-client";
import { motion } from "framer-motion";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} | null;

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!timeLeft) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 text-center text-white"
        >
            <TimeBlock value={timeLeft.days} label="дн" />
            <TimeBlock value={timeLeft.hours} label="ч" />
            <TimeBlock value={timeLeft.minutes} label="м" />
            <TimeBlock value={timeLeft.seconds} label="с" />
        </motion.div>
    );
}

function TimeBlock({
    value,
    label,
}: {
    value: number;
    label: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white text-black rounded-xl px-4 py-2 text-2xl font-semibold min-w-[56px]">
                {String(value).padStart(2, "0")}
            </div>
            <span className="text-xs text-gray-400 mt-1">
                {label}
            </span>
        </div>
    );
}