import type { EventLog } from "../types";

interface EventTimelineProps {
  events: EventLog[];
}

const severityStyle = {
  info: "border-sky-200 bg-sky-50 text-sky-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  critical: "border-rose-200 bg-rose-50 text-rose-800",
};

export function EventTimeline({ events }: EventTimelineProps) {
  return (
    <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Olay Zaman Çizelgesi</h2>
      <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
        {events.map((event) => (
          <article key={event.id} className={`rounded border p-3 text-xs ${severityStyle[event.severity]}`}>
            <div className="mb-1 flex items-center justify-between gap-3">
              <span className="font-semibold">{event.source}</span>
              <span>{event.time}</span>
            </div>
            <p>{event.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
