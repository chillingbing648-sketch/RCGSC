export default function Lines({ as: Tag = 'h2', lines, className = '' }) {
  return (
    <Tag className={className} data-lines aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span className="line" key={i} aria-hidden="true"><span>{l}</span></span>
      ))}
    </Tag>
  )
}
