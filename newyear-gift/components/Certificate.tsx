"use client";

import { motion } from "framer-motion";

export default function Certificate({ name }: { name: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="
                relative
                max-w-xl
                mx-auto
                p-10
                rounded-3xl
                bg-gradient-to-br
                from-amber-50
                via-white
                to-amber-100
                text-zinc-900
                shadow-2xl
                border
                border-amber-200
            "
        >
            {/* ✨ Заголовок */}
            <h2 className="text-3xl font-serif font-semibold text-center mb-6">
                Сертификат доверия и тепла
            </h2>

            {/* 💛 Текст */}
            <p className="text-lg leading-relaxed text-center">
                Настоящим подтверждается, что
                <br />
                <span className="font-semibold">{name}</span>
                <br />
                получает сертификат на <b>365 дней</b> моей безвозмездной,
                искренней и бесконечной поддержки.
            </p>

            <p className="mt-6 text-center leading-relaxed">
                В этот сертификат входят:
                <br />
                — помощь в любой беде  
                <br />
                — радость за твои успехи  
                <br />
                — сочувствие в неудачах  
                <br />
                — безудержное веселье  
                <br />
                — честность, тепло и присутствие
            </p>

            <p className="mt-6 text-center italic">
                Спасибо, что ты был(а) в моей жизни в этом году 🤍
            </p>

            {/* ✍️ Подпись */}
            <div className="mt-10 text-right text-sm">
                С любовью,
                <br />
                Динара ✨
            </div>
        </motion.div>
    );
}