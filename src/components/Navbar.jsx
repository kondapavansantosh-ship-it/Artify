import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, User, Menu, X, Palette } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/CartContext'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth(); const { cartCount, wishlist } = useStore(); const nav = useNavigate()
  const close = () => setOpen(false)
  return (
    <header className="nav"><div className="container nav-in">
      <Link to="/" className="logo" onClick={close}><Palette size={22} /> ARTIFY</Link>
      <nav className={'links' + (open ? ' open' : '')}>
        <NavLink to="/gallery" onClick={close}>Explore</NavLink>
        {user?.role === 'artist' && <NavLink to="/dashboard" onClick={close}>Dashboard</NavLink>}
        <NavLink to="/wishlist" onClick={close}><Heart size={16} /> Wishlist{wishlist.length > 0 && <b className="badge">{wishlist.length}</b>}</NavLink>
        <NavLink to="/cart" onClick={close}><ShoppingBag size={16} /> Cart{cartCount > 0 && <b className="badge">{cartCount}</b>}</NavLink>
        {user ? (<>
          <NavLink to="/profile" onClick={close}><User size={16} /> {user.name.split(' ')[0]}</NavLink>
          <button className="btn ghost sm" onClick={() => { logout(); close(); nav('/') }}>Log out</button>
        </>) : (<>
          <NavLink to="/login" onClick={close}>Log in</NavLink>
          <Link to="/signup" className="btn sm" onClick={close}>Sign up</Link>
        </>)}
      </nav>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div></header>)
}
