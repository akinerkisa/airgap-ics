import type { SensorStatus } from "../types";

interface SensorPanelProps {
  status: SensorStatus;
  showWarning: boolean;
}

const abnormal = new Set(["Dalgalı", "Yüksek", "Artmış"]);

export function SensorPanel({ status, showWarning }: SensorPanelProps) {
  const sensorRows = [
    { label: "Motor Hızı", value: status.motorHizi },
    { label: "Basınç", value: status.basinc },
    { label: "Titreşim", value: status.titresim },
  ];

  return (
    <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Bağımsız Sensör Verileri</h2>
      <div className="space-y-2 text-sm">
        {sensorRows.map((row) => (
          <div
            key={row.label}
            className={`rounded border p-3 ${abnormal.has(row.value) ? "border-rose-300 bg-rose-50 text-rose-700" : "border-slate-200 bg-slate-50 text-slate-700"}`}
          >
            {row.label}: {row.value}
          </div>
        ))}
      </div>
      {showWarning ? (
        <p className="mt-4 rounded border border-amber-300 bg-amber-50 p-3 text-xs font-medium text-amber-700">
          HMI ekranı tek başına güvenilir doğruluk kaynağı değildir.
        </p>
      ) : null}
    </section>
  );
}
