import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Trash2, Eye, ImagePlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/CartContext'
import { Img } from '../components/ArtworkCard'
import { CATEGORIES } from '../utils/sampleData'
const MAX_KB = 700
const blank = (name) => ({ title: '', artist: name, desc: '', price: '', category: CATEGORIES[0], dims: '', image: '' })
export default function ArtistDashboard() {
  const { user } = useAuth(); const { artworks, orders, addArtwork, updateArtwork, deleteArtwork } = useStore()
  const [form, setForm] = useState(blank(user.name)); const [editId, setEditId] = useState(null); const [err, setErr] = useState('')
  const mine = artworks.filter(a => a.ownerId === user.id)
  const sold = orders.flatMap(o => o.items).filter(i => i.ownerId === user.id)
  const sales = sold.reduce((s, i) => s + i.qty, 0), earnings = sold.reduce((s, i) => s + i.qty * i.price, 0)
  const set = k => e => setForm({ ...form, [k]: e.target.value })
  const pick = e => {
    const file = e.target.files[0]; if (!file) return
    if (!file.type.startsWith('image/')) return setErr('Choose an image file (JPG, PNG or WebP).')
    if (file.size > MAX_KB * 1024) return setErr(`This image is ${Math.round(file.size / 1024)} KB. Browser storage is limited, so choose one under ${MAX_KB} KB.`)
    const r = new FileReader(); r.onload = () => { setErr(''); setForm(f => ({ ...f, image: r.result })) }; r.readAsDataURL(file)
  }
  const reset = () => { setForm(blank(user.name)); setEditId(null); setErr('') }
  const submit = e => {
    e.preventDefault()
    if (!form.image) return setErr('Upload an image of the artwork.')
    if (!(+form.price > 0)) return setErr('Enter a price greater than 0.')
    const data = { ...form, price: +form.price }
    const ok = editId ? updateArtwork(editId, data) : addArtwork({ ...data, ownerId: user.id })
    if (!ok) return setErr('Storage is full. Use a smaller image or delete older uploads.')
    reset()
  }
  const edit = a => { setEditId(a.id); setForm({ title: a.title, artist: a.artist, desc: a.desc, price: a.price, category: a.category, dims: a.dims, image: a.image }); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return (<div className="container sec"><h1>Artist dashboard</h1>
    <div className="stats">{[['Total artworks', mine.length], ['Total sales', sales], ['Total earnings', '$' + earnings.toLocaleString()]].map(([l, v]) => <div className="card-box stat" key={l}><p className="muted">{l}</p><strong>{v}</strong></div>)}</div>
    <div className="two">
      <form className="form card-box" onSubmit={submit}>
        <h3>{editId ? 'Edit artwork' : 'Upload new artwork'}</h3>
        <label>Title<input required value={form.title} onChange={set('title')} /></label>
        <label>Artist name<input required value={form.artist} onChange={set('artist')} /></label>
        <label>Description<textarea required rows="3" value={form.desc} onChange={set('desc')} /></label>
        <div className="split"><label>Price (USD)<input type="number" min="1" required value={form.price} onChange={set('price')} /></label>
          <label>Category<select value={form.category} onChange={set('category')}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label></div>
        <label>Dimensions<input required placeholder="e.g. 60 × 80 cm" value={form.dims} onChange={set('dims')} /></label>
        <label className="drop"><ImagePlus size={20} /> {form.image ? 'Replace image' : 'Choose artwork image'}<input type="file" accept="image/*" hidden onChange={pick} /></label>
        {form.image && <div className="preview"><Img src={form.image} alt="Preview" /></div>}
        {err && <p className="err">{err}</p>}
        <div className="row gap"><button className="btn">{editId ? 'Save changes' : 'Upload artwork'}</button>{editId && <button type="button" className="btn ghost" onClick={reset}>Cancel</button>}</div>
      </form>
      <div><h3>Your artworks</h3>
        {mine.length === 0 ? <div className="empty small"><p>No uploads yet. Your first artwork will appear here.</p></div> :
          mine.map(a => (<div className="line" key={a.id}><Img src={a.image} alt={a.title} />
            <div className="grow"><h3>{a.title}</h3><p className="muted">${a.price.toLocaleString()} · {a.category}</p></div>
            <div className="row gap"><Link className="icon" aria-label="View" to={`/artwork/${a.id}`}><Eye size={18} /></Link><button className="icon" aria-label="Edit" onClick={() => edit(a)}><Pencil size={18} /></button>
              <button className="icon" aria-label="Delete" onClick={() => { if (window.confirm(`Delete "${a.title}"?`)) { deleteArtwork(a.id); if (editId === a.id) reset() } }}><Trash2 size={18} /></button></div></div>))}
      </div></div></div>)
}
