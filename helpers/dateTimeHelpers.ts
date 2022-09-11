export const getExpirationTime = (currentTime: Date, lifetime: number): number => {
    const time = currentTime || new Date();
    return time.getTime() + lifetime;
}

export const isExpired = (currentTime: Date, expirationTime: number): boolean => {
    const time = currentTime || new Date();
    return currentTime.getTime() >= expirationTime;
}