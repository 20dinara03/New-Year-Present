export const GIFT_UNLOCK_DATE = new Date("2025-12-28T16:27:00");

export function isGiftUnlocked() {
    return new Date() >= GIFT_UNLOCK_DATE;
}