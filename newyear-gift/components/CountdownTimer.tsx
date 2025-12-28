"use client";

import { useEffect, useState } from "react";
import { GIFT_UNLOCK_DATE } from "@/lib/time";

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(
        GIFT_UNLOCK_DATE.getTime() - Date.now()
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(GIFT_UNLOCK_DATE.getTime() - Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (timeLeft <= 0) return null;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);

    return (
        <p className="text-sm text-gray-400">
            Подарок откроется через {days}д {hours}ч {minutes}м 🎄
        </p>
    );
}