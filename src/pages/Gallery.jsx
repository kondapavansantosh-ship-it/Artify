import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { useStore } from '../context/CartContext'
import ArtworkCard from '../components/ArtworkCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import { SkeletonGrid } from '../components/Skeleton'
import { useInitialLoad } from '../hooks'

export default function Gallery() {
  const { artworks } = useStore()
  const [params] = useSearchParams()
  const loading = useInitialLoad()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState(params.get('cat') || 'All')
  const [artist, setArtist] = useState(params.get('artist') || 'All')
  const [priceCap, setPriceCap] = useState(null)
  const [sort, setSort] = useState('new')

  const max = Math.max(1500, ...artworks.map(a => a.price))
  const price = priceCap ?? max
  const artists = [...new Set(artworks.map(a => a.artist))]

  const list = useMemo(() => {
    const r = artworks.filter(a =>
      a.title.toLowerCase().includes(q.trim().toLowerCase()) &&
      (cat === 'All' || a.category === cat) &&
      (artist === 'All' || a.artist === artist) &&
      a.price <= price)
    return r.sort((a, b) =>
      sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : b.createdAt - a.createdAt)
  }, [artworks, q, cat, artist, price, sort])

  const reset = () => { setQ(''); setCat('All'); setArtist('All'); setPriceCap(null) }

  return (
    <div className="container sec">
      <h1>Explore artwork</h1>
      <SearchBar value={q} onChange={setQ} />
      <CategoryFilter value={cat} onChange={setCat} />
      <div className="filters">
        <label>Artist
          <select value={artist} onChange={e => setArtist(e.target.value)}>
            <option>All</option>{artists.map(a => <option key={a}>{a}</option>)}
          </select></label>
        <label>Up to ${price.toLocaleString()}
          <input type="range" min="50" max={max} step="50" value={price} onChange={e => setPriceCap(+e.target.value)} /></label>
        <label>Sort
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="new">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select></label>
      </div>

      {loading ? <SkeletonGrid /> : list.length ? (
        <div className="grid">{list.map(a => <ArtworkCard key={a.id} art={a} />)}</div>
      ) : (
        <div className="empty">
          <SearchX size={40} />
          <h2>No artwork matches</h2>
          <p>Try a different search or widen your filters.</p>
          <button className="btn" onClick={reset}>Clear filters</button>
        </div>
      )}
    </div>
  )
}
