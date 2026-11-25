import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ArtworkDetails from './pages/ArtworkDetails'
import ArtistDashboard from './pages/ArtistDashboard'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import { useAuth } from './context/AuthContext'
function Guard({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/profile" replace />
  return children
}
export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (<>
    <Navbar />
    <main key={pathname} className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/artwork/:id" element={<ArtworkDetails />} />
        <Route path="/dashboard" element={<Guard role="artist"><ArtistDashboard /></Guard>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Guard><Checkout /></Guard>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Guard><Profile /></Guard>} />
        <Route path="*" element={<div className="container empty"><h2>Page not found</h2><a className="btn" href="/">Back to home</a></div>} />
      </Routes>
    </main>
    <Footer />
  </>)
}
