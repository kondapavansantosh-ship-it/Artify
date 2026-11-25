export const KEYS = { users:'artify_users', current:'artify_current_user', artworks:'artify_artworks', cart:'artify_cart', wishlist:'artify_wishlist', orders:'artify_orders' }
export const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }
export const loadArray = (key, fallback = []) => { const v = load(key, fallback); return Array.isArray(v) ? v : fallback }
export const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { return false } }
export const remove = (key) => { try { localStorage.removeItem(key) } catch {} }
