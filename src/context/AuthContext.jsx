import { createContext, useContext, useState } from 'react'
import { KEYS, load, loadArray, save, remove } from '../utils/storage'
const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
// DEMO ONLY: passwords are stored in plain text in LocalStorage. Never do this in production.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load(KEYS.current, null))
  const start = (u) => { const { password, ...safe } = u; save(KEYS.current, safe); setUser(safe) }
  const signup = ({ name, email, password, role }) => {
    const users = loadArray(KEYS.users)
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) return 'An account with this email already exists.'
    const u = { id: 'u' + Date.now(), name, email, password, role }
    if (!save(KEYS.users, [...users, u])) return 'Storage is full. Clear some browser data and try again.'
    start(u); return null
  }
  const login = (email, password) => {
    const u = loadArray(KEYS.users).find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password)
    if (!u) return 'Email or password is incorrect.'
    start(u); return null
  }
  const logout = () => { remove(KEYS.current); setUser(null) }
  return <Ctx.Provider value={{ user, signup, login, logout }}>{children}</Ctx.Provider>
}
