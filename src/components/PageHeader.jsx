export default function PageHeader({ title, subtitle }) {
  return (
    <div className="border-b border-ink/10 bg-white">
      <div className="container-page py-8 sm:py-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>}
      </div>
    </div>
  )
}
