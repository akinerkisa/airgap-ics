import type { ProcessStatus } from "../types";

interface HmiPanelProps {
  status: ProcessStatus;
}

export function HmiPanel({ status }: HmiPanelProps) {
  return (
    <section className="rounded-xl border border-slate-300 bg-slate-900 p-4 text-slate-100 shadow">
      <h2 className="mb-4 text-lg font-semibold">HMI Ekrani</h2>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded bg-slate-800 p-3">Motor Hızı: {status.motorHizi}</div>
        <div className="rounded bg-slate-800 p-3">Basınç: {status.basinc}</div>
        <div className="rounded bg-slate-800 p-3">Titreşim: {status.titresim}</div>
        <div className="rounded bg-slate-800 p-3">Alarm: {status.alarm}</div>
      </div>
      <p className="mt-4 rounded border border-slate-700 bg-slate-800/70 p-3 text-xs text-slate-300">
        Not: Bu panelde değerler normal görünse bile bağımsız sensör doğrulaması gereklidir.
      </p>
    </section>
  );
}
