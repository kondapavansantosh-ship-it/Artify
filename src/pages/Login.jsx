import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Login() {
  const { login } = useAuth(); const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' }); const [err, setErr] = useState('')
  const submit = e => { e.preventDefault(); const r = login(f.email.trim(), f.password); r ? setErr(r) : nav('/profile') }
  return (<div className="container auth"><form className="form card-box" onSubmit={submit}>
    <h1>Welcome back</h1>
    <p className="notice">Demo login stored in your browser. Not secure production authentication.</p>
    <label>Email<input type="email" required value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></label>
    <label>Password<input type="password" required value={f.password} onChange={e => setF({ ...f, password: e.target.value })} /></label>
    {err && <p className="err">{err}</p>}
    <button className="btn lg block">Log in</button>
    <p className="muted">New here? <Link to="/signup">Create an account</Link></p></form></div>)
}
