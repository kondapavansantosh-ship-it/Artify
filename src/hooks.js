import { useEffect, useState } from 'react'
// Briefly shows skeletons on first render so the loading state is visible.
export function useInitialLoad(ms = 450) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), ms); return () => clearTimeout(t) }, [ms])
  return loading
}
