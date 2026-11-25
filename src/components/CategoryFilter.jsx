import { CATEGORIES } from '../utils/sampleData'
export default function CategoryFilter({ value, onChange }) {
  return <div className="chips">{['All', ...CATEGORIES].map(c => <button key={c} className={'chip' + (value === c ? ' on' : '')} onClick={() => onChange(c)}>{c}</button>)}</div>
}
