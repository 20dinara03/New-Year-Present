export const GIFT_UNLOCK_DATE = new Date("2026-01-01T00:00:00");

export function isGiftUnlocked() {
    return new Date() >= GIFT_UNLOCK_DATE;
}