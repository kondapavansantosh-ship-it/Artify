import { createContext, useContext, useState } from 'react'
import { KEYS, loadArray, save } from '../utils/storage'
import { seedArtworks } from '../utils/sampleData'
const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)
export function StoreProvider({ children }) {
  const [artworks, setArtworks] = useState(() => (localStorage.getItem(KEYS.artworks) ? loadArray(KEYS.artworks, seedArtworks) : seedArtworks))
  const [cart, setCart] = useState(() => loadArray(KEYS.cart))
  const [wishlist, setWishlist] = useState(() => loadArray(KEYS.wishlist))
  const [orders, setOrders] = useState(() => loadArray(KEYS.orders))
  const commit = (key, setter, next) => { if (!save(key, next)) return false; setter(next); return true }

  const addToCart = (id) => commit(KEYS.cart, setCart, cart.some(c => c.id === id) ? cart.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c) : [...cart, { id, qty: 1 }])
  const setQty = (id, qty) => commit(KEYS.cart, setCart, qty < 1 ? cart.filter(c => c.id !== id) : cart.map(c => c.id === id ? { ...c, qty } : c))
  const removeFromCart = (id) => commit(KEYS.cart, setCart, cart.filter(c => c.id !== id))
  const toggleWish = (id) => commit(KEYS.wishlist, setWishlist, wishlist.includes(id) ? wishlist.filter(w => w !== id) : [...wishlist, id])

  const addArtwork = (a) => commit(KEYS.artworks, setArtworks, [{ ...a, id: 'a' + Date.now(), createdAt: Date.now() }, ...artworks])
  const updateArtwork = (id, patch) => commit(KEYS.artworks, setArtworks, artworks.map(a => a.id === id ? { ...a, ...patch } : a))
  const deleteArtwork = (id) => {
    commit(KEYS.cart, setCart, cart.filter(c => c.id !== id)); commit(KEYS.wishlist, setWishlist, wishlist.filter(w => w !== id))
    return commit(KEYS.artworks, setArtworks, artworks.filter(a => a.id !== id))
  }
  const cartItems = cart.map(c => ({ ...c, art: artworks.find(a => a.id === c.id) })).filter(c => c.art)
  const cartTotal = cartItems.reduce((s, c) => s + c.art.price * c.qty, 0)
  const cartCount = cartItems.reduce((s, c) => s + c.qty, 0)

  const placeOrder = (info, user) => {
    const order = { id: 'ART-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase(),
      userId: user?.id, email: info.email, info, date: new Date().toISOString(), total: cartTotal,
      items: cartItems.map(c => ({ id: c.id, title: c.art.title, price: c.art.price, qty: c.qty, ownerId: c.art.ownerId })) }
    if (!commit(KEYS.orders, setOrders, [order, ...orders])) return null
    commit(KEYS.cart, setCart, []); return order
  }
  return <Ctx.Provider value={{ artworks, cart, cartItems, cartTotal, cartCount, wishlist, orders, addToCart, setQty, removeFromCart, toggleWish, addArtwork, updateArtwork, deleteArtwork, placeOrder }}>{children}</Ctx.Provider>
}
