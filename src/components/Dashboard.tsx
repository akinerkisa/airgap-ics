import type { FacilityStatusItem, RiskLevel } from "../types";
import { EventTimeline } from "./EventTimeline";
import { HmiPanel } from "./HmiPanel";
import { SensorPanel } from "./SensorPanel";
import { StatusCard } from "./StatusCard";
import type { EventLog, ProcessStatus, SensorStatus } from "../types";

interface DashboardProps {
  facilityStatus: FacilityStatusItem[];
  hmiStatus: ProcessStatus;
  sensorStatus: SensorStatus;
  events: EventLog[];
  riskLevel: RiskLevel;
  sensorWarning: boolean;
  educationalMessages: string[];
}

const riskToneMap: Record<RiskLevel, "good" | "warn" | "critical" | "default"> = {
  Normal: "good",
  Dikkat: "warn",
  "Şüpheli": "warn",
  Kritik: "critical",
};

export function Dashboard({
  facilityStatus,
  hmiStatus,
  sensorStatus,
  events,
  riskLevel,
  sensorWarning,
  educationalMessages,
}: DashboardProps) {
  return (
    <section className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.4fr_1.1fr]">
        <aside className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Tesis Durumu</h2>
          {facilityStatus.map((item) => (
            <StatusCard
              key={item.label}
              title={item.label}
              value={item.value}
              tone={item.label === "Risk Seviyesi" ? riskToneMap[riskLevel] : "default"}
            />
          ))}
        </aside>

        <main className="space-y-4">
          <HmiPanel status={hmiStatus} />
          <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-800">Eğitim Mesajları</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
              {educationalMessages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </section>
        </main>

        <aside className="space-y-4">
          <SensorPanel status={sensorStatus} showWarning={sensorWarning} />
          <EventTimeline events={events} />
        </aside>
      </div>
    </section>
  );
}
