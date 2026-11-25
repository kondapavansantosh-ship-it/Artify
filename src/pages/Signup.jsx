import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Signup() {
  const { signup } = useAuth(); const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '', role: 'buyer' }); const [err, setErr] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    if (f.name.trim().length < 2) return setErr('Enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address.')
    if (f.password.length < 6) return setErr('Password needs at least 6 characters.')
    const r = signup({ ...f, name: f.name.trim(), email: f.email.trim() }); r ? setErr(r) : nav(f.role === 'artist' ? '/dashboard' : '/gallery')
  }
  return (<div className="container auth"><form className="form card-box" onSubmit={submit}>
    <h1>Create your account</h1>
    <p className="notice">Demo signup stored in your browser. Not secure production authentication.</p>
    <div className="roles">{[['buyer', 'Buyer', 'Collect and save artwork'], ['artist', 'Artist', 'Upload and sell your work']].map(([v, t, d]) => (
      <label key={v} className={'role' + (f.role === v ? ' on' : '')}><input type="radio" name="role" checked={f.role === v} onChange={() => setF({ ...f, role: v })} /><strong>{t}</strong><span>{d}</span></label>))}</div>
    <label>Full name<input required value={f.name} onChange={set('name')} /></label>
    <label>Email<input type="email" required value={f.email} onChange={set('email')} /></label>
    <label>Password<input type="password" required value={f.password} onChange={set('password')} /></label>
    {err && <p className="err">{err}</p>}
    <button className="btn lg block">Sign up</button>
    <p className="muted">Already registered? <Link to="/login">Log in</Link></p></form></div>)
}
