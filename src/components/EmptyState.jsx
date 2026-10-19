export default function EmptyState({ title, text, children }) {
  return (
    <div className="card mx-auto max-w-lg p-8 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
      {children && <div className="mt-5 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}
