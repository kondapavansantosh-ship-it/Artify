import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/CartContext'
import { Img } from '../components/ArtworkCard'
export default function Wishlist() {
  const { artworks, wishlist, toggleWish, addToCart } = useStore()
  const items = artworks.filter(a => wishlist.includes(a.id))
  if (!items.length) return <div className="container empty"><Heart size={44} /><h2>No saved artwork yet</h2><p>Tap the heart on any piece to keep it here.</p><Link to="/gallery" className="btn">Explore artwork</Link></div>
  return (<div className="container sec"><h1>Your wishlist</h1><div className="grid">{items.map(a => (
    <article className="art" key={a.id}><Link to={`/artwork/${a.id}`} className="art-img"><Img src={a.image} alt={a.title} /></Link>
      <div className="art-body"><h3>{a.title}</h3><p className="muted">{a.artist}</p><div className="row"><strong>${a.price.toLocaleString()}</strong>
        <span className="row gap"><button className="btn sm" onClick={() => addToCart(a.id)}><ShoppingBag size={14} /> Add to cart</button><button className="btn ghost sm" onClick={() => toggleWish(a.id)}>Remove</button></span></div></div></article>))}</div></div>)
}
