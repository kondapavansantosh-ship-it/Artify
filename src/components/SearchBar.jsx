import { Search } from 'lucide-react'
export default function SearchBar({ value, onChange }) {
  return <label className="search"><Search size={18} /><input value={value} onChange={e => onChange(e.target.value)} placeholder="Search artwork by title" aria-label="Search artwork by title" /></label>
}
