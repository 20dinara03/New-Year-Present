export const GIFT_UNLOCK_DATE = new Date("2025-12-28T17:35:00");

export function isGiftUnlocked() {
    return new Date() >= GIFT_UNLOCK_DATE;
}

export function getTimeLeft() {
    const now = new Date().getTime();
    const diff = GIFT_UNLOCK_DATE.getTime() - now;

    if (diff <= 0) {
        return null;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
}
