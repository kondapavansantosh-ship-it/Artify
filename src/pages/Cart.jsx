import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, Minus, Plus } from 'lucide-react'
import { useStore } from '../context/CartContext'
import { Img } from '../components/ArtworkCard'
export default function Cart() {
  const { cartItems, cartTotal, setQty, removeFromCart } = useStore(); const nav = useNavigate()
  if (!cartItems.length) return <div className="container empty"><ShoppingBag size={44} /><h2>Your cart is empty</h2><p>Find a piece you love and it will wait for you here.</p><Link to="/gallery" className="btn">Explore artwork</Link></div>
  return (<div className="container sec"><h1>Your cart</h1>
    <div className="two">
      <div>{cartItems.map(({ art, qty }) => (
        <div className="line" key={art.id}>
          <Img src={art.image} alt={art.title} />
          <div className="grow"><Link to={`/artwork/${art.id}`}><h3>{art.title}</h3></Link><p className="muted">{art.artist}</p>
            <div className="qty"><button aria-label="Decrease" onClick={() => setQty(art.id, qty - 1)}><Minus size={14} /></button><span>{qty}</span><button aria-label="Increase" onClick={() => setQty(art.id, qty + 1)}><Plus size={14} /></button></div></div>
          <div className="right"><strong>${(art.price * qty).toLocaleString()}</strong><button className="icon" aria-label="Remove" onClick={() => removeFromCart(art.id)}><Trash2 size={18} /></button></div>
        </div>))}</div>
      <aside className="summary"><h3>Order total</h3><div className="row"><span>Subtotal</span><strong>${cartTotal.toLocaleString()}</strong></div><p className="muted">Shipping is free in this demo.</p>
        <button className="btn lg block" onClick={() => nav('/checkout')}>Checkout</button></aside>
    </div></div>)
}
