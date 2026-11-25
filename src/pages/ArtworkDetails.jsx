import { Link, useParams } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '../context/CartContext'
import ArtworkCard, { Img } from '../components/ArtworkCard'
import { ARTISTS } from '../utils/sampleData'
export default function ArtworkDetails() {
  const { id } = useParams(); const { artworks, wishlist, toggleWish, addToCart } = useStore()
  const art = artworks.find(a => a.id === id)
  if (!art) return <div className="container empty"><h2>This artwork is no longer available</h2><Link className="btn" to="/gallery">Browse artwork</Link></div>
  const related = artworks.filter(a => a.id !== id && (a.category === art.category || a.artist === art.artist)).slice(0, 4)
  const liked = wishlist.includes(id)
  return (<div className="container sec">
    <div className="detail">
      <div className="detail-img"><Img src={art.image} alt={art.title} /></div>
      <div>
        <p className="muted">{art.category}</p><h1>{art.title}</h1>
        <div className="by"><Img src={ARTISTS[art.artist]} alt={art.artist} /><Link to={`/gallery?artist=${encodeURIComponent(art.artist)}`}>{art.artist}</Link></div>
        <p className="price">${art.price.toLocaleString()}</p>
        <p>{art.desc}</p>
        <dl><dt>Dimensions</dt><dd>{art.dims}</dd><dt>Category</dt><dd>{art.category}</dd></dl>
        <div className="row gap">
          <button className="btn lg" onClick={() => addToCart(id)}><ShoppingBag size={18} /> Add to cart</button>
          <button className="btn ghost lg" onClick={() => toggleWish(id)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Saved' : 'Add to wishlist'}</button>
        </div>
      </div>
    </div>
    {related.length > 0 && <><h2 style={{ marginTop: 64 }}>Related artworks</h2><div className="grid">{related.map(a => <ArtworkCard key={a.id} art={a} />)}</div></>}
  </div>)
}
