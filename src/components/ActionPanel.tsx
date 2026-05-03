interface ActionPanelProps {
  actions: { label: string; onClick: () => void; disabled?: boolean }[];
}

export function ActionPanel({ actions }: ActionPanelProps) {
  return (
    <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-800">Müdahale Kararları</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled={action.disabled}
            onClick={action.onClick}
            className="rounded border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
