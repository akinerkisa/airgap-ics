interface ReportPanelProps {
  visible: boolean;
  items: string[];
}

export function ReportPanel({ visible, items }: ReportPanelProps) {
  if (!visible) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-800">Rapor</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
