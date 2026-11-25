import { Link, useNavigate } from 'react-router-dom'
import { Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/CartContext'
export default function Profile() {
  const { user, logout } = useAuth(); const { orders } = useStore(); const nav = useNavigate()
  const mine = orders.filter(o => o.userId === user.id)
  return (<div className="container sec"><h1>Your profile</h1>
    <div className="card-box prof"><div><p className="muted">Name</p><strong>{user.name}</strong></div><div><p className="muted">Email</p><strong>{user.email}</strong></div><div><p className="muted">Account type</p><strong style={{ textTransform: 'capitalize' }}>{user.role}</strong></div>
      <button className="btn ghost" onClick={() => { logout(); nav('/') }}>Log out</button></div>
    <h2 style={{ marginTop: 48 }}>Order history</h2>
    {mine.length === 0 ? <div className="empty"><Package size={40} /><p>You haven't placed any orders yet.</p><Link to="/gallery" className="btn">Explore artwork</Link></div> :
      mine.map(o => (<div className="card-box order" key={o.id}><div className="row"><strong>{o.id}</strong><span className="muted">{new Date(o.date).toLocaleDateString()}</span></div>
        {o.items.map(i => <div className="row" key={i.id}><span>{i.title} × {i.qty}</span><span>${(i.price * i.qty).toLocaleString()}</span></div>)}
        <hr /><div className="row"><strong>Total</strong><strong>${o.total.toLocaleString()}</strong></div></div>))}
  </div>)
}
