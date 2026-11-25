import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/CartContext'
export default function Checkout() {
  const { user } = useAuth(); const { cartItems, cartTotal, placeOrder } = useStore()
  const [f, setF] = useState({ name: user.name, email: user.email, phone: '', address: '', payment: 'Card (demo)' })
  const [err, setErr] = useState(''); const [order, setOrder] = useState(null)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  if (order) return (<div className="container empty"><CheckCircle2 size={52} color="#B76E4B" /><h2>Order placed</h2>
    <p>Your order ID is <strong>{order.id}</strong>. It was saved to your order history.</p>
    <div className="row gap"><Link className="btn" to="/profile">View orders</Link><Link className="btn ghost" to="/gallery">Keep exploring</Link></div></div>)
  if (!cartItems.length) return <div className="container empty"><h2>Nothing to check out</h2><Link className="btn" to="/gallery">Explore artwork</Link></div>
  const submit = e => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address.')
    if (f.phone.replace(/\D/g, '').length < 7) return setErr('Enter a valid phone number.')
    if (f.address.trim().length < 8) return setErr('Enter your full delivery address.')
    const o = placeOrder(f, user); if (!o) return setErr('Could not save the order. Browser storage may be full.'); setOrder(o)
  }
  return (<div className="container sec"><h1>Checkout</h1>
    <p className="notice">Demo only. No real payment is taken and no card details are collected.</p>
    <div className="two">
      <form className="form" onSubmit={submit}>
        <label>Full name<input required value={f.name} onChange={set('name')} /></label>
        <label>Email<input type="email" required value={f.email} onChange={set('email')} /></label>
        <label>Phone<input required value={f.phone} onChange={set('phone')} /></label>
        <label>Delivery address<textarea required rows="3" value={f.address} onChange={set('address')} /></label>
        <label>Payment method (demo)<select value={f.payment} onChange={set('payment')}><option>Card (demo)</option><option>UPI (demo)</option><option>Cash on delivery (demo)</option></select></label>
        {err && <p className="err">{err}</p>}
        <button className="btn lg">Place order</button>
      </form>
      <aside className="summary"><h3>Order summary</h3>
        {cartItems.map(({ art, qty }) => <div className="row" key={art.id}><span>{art.title} × {qty}</span><span>${(art.price * qty).toLocaleString()}</span></div>)}
        <hr /><div className="row"><strong>Total</strong><strong>${cartTotal.toLocaleString()}</strong></div></aside>
    </div></div>)
}
