import type { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  value: string;
  tone?: "default" | "good" | "warn" | "critical";
  icon?: ReactNode;
}

const toneMap = {
  default: "border-slate-300 bg-white text-slate-700",
  good: "border-emerald-300 bg-emerald-50 text-emerald-700",
  warn: "border-amber-300 bg-amber-50 text-amber-700",
  critical: "border-rose-300 bg-rose-50 text-rose-700",
};

export function StatusCard({ title, value, tone = "default", icon }: StatusCardProps) {
  return (
    <article className={`rounded-lg border p-4 shadow-sm ${toneMap[tone]}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide">{title}</h3>
        {icon}
      </div>
      <p className="text-sm font-medium">{value}</p>
    </article>
  );
}
