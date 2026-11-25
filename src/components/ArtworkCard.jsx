import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../context/CartContext'
import { FALLBACK } from '../utils/sampleData'
export const Img = ({ src, alt, ...p }) => <img src={src || FALLBACK} alt={alt} loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK }} {...p} />
export default function ArtworkCard({ art }) {
  const { wishlist, toggleWish, addToCart } = useStore(); const [added, setAdded] = useState(false)
  const liked = wishlist.includes(art.id)
  return (<article className="art">
    <Link to={`/artwork/${art.id}`} className="art-img"><Img src={art.image} alt={art.title} /></Link>
    <button className={'heart' + (liked ? ' on' : '')} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWish(art.id)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button>
    <div className="art-body">
      <Link to={`/artwork/${art.id}`}><h3>{art.title}</h3></Link>
      <p className="muted">{art.artist} · {art.category}</p>
      <div className="row"><strong>${art.price.toLocaleString()}</strong>
        <button className="btn sm" onClick={() => { addToCart(art.id); setAdded(true); setTimeout(() => setAdded(false), 1200) }}>{added ? <><Check size={14} /> Added</> : <><ShoppingBag size={14} /> Add to cart</>}</button></div>
    </div></article>)
}
