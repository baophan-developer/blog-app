export function setDataLocalStore(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function getDataLocalStore<T = any>(key: string): T | null {
    const result = localStorage.getItem(key);
    if (!result) return null;
    return JSON.parse(result);
}
