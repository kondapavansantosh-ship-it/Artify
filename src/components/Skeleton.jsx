export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading artwork">
      {Array.from({ length: count }).map((_, i) => (
        <div className="art skeleton-card" key={i}>
          <div className="skeleton skeleton-img" />
          <div className="art-body">
            <div className="skeleton skeleton-line w80" />
            <div className="skeleton skeleton-line w50" />
            <div className="skeleton skeleton-line w40" />
          </div>
        </div>
      ))}
    </div>
  )
}
