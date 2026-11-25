import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/CartContext'
import ArtworkCard, { Img } from '../components/ArtworkCard'
import { CATEGORIES, ARTISTS } from '../utils/sampleData'
export default function Home() {
  const { artworks } = useStore(); const nav = useNavigate()
  const [email, setEmail] = useState(''); const [done, setDone] = useState(false)
  const recent = [...artworks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4)
  const hero = artworks[0]
  return (<>
    <section className="hero container">
      <div className="hero-text">
        <h1>Discover Art That Speaks to You</h1>
        <p>Original paintings, prints and sculpture from independent artists, shipped straight from the studio.</p>
        <Link to="/gallery" className="btn lg">Explore Artwork</Link>
      </div>
      <div className="hero-img"><Img src={hero?.image} alt={hero?.title || 'Featured artwork'} /></div>
    </section>
    <section className="container sec"><h2>Featured artworks</h2><div className="grid">{artworks.slice(0, 4).map(a => <ArtworkCard key={a.id} art={a} />)}</div></section>
    <section className="container sec"><h2>Popular categories</h2>
      <div className="cats">{CATEGORIES.map(c => { const a = artworks.find(x => x.category === c); return (
        <button key={c} className="cat" onClick={() => nav(`/gallery?cat=${c}`)}><Img src={a?.image} alt="" /><span>{c}</span></button>) })}</div></section>
    <section className="container sec"><h2>Trending artists</h2>
      <div className="artists">{Object.keys(ARTISTS).map(n => (
        <Link key={n} to={`/gallery?artist=${encodeURIComponent(n)}`} className="artist"><Img src={ARTISTS[n]} alt={n} /><div><h3>{n}</h3><p className="muted">{artworks.filter(a => a.artist === n).length} works</p></div></Link>))}</div></section>
    <section className="container sec"><h2>Recently added</h2>
      <div className="grid">{recent.map(a => <ArtworkCard key={a.id} art={a} />)}</div></section>
    <section className="container sec"><div className="news">
      <h2>New work, in your inbox</h2><p>One short email when new artists join. No spam.</p>
      {done ? <p className="ok">Thanks, you're on the list.</p> :
        <form onSubmit={e => { e.preventDefault(); setDone(true) }} className="news-form">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" />
          <button className="btn accent">Subscribe</button></form>}
    </div></section>
  </>)
}
