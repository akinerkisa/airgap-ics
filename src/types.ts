export type RiskLevel = "Normal" | "Dikkat" | "Şüpheli" | "Kritik";

export type Severity = "info" | "warning" | "critical";

export type EventSource = "Fiziksel Güvenlik" | "Endpoint" | "HMI" | "Sensör" | "OT Müdahale";

export interface ProcessStatus {
  motorHizi: "Normal" | "Dalgalı";
  basinc: "Normal" | "Yüksek";
  titresim: "Normal" | "Artmış";
  alarm: "Yok" | "Var";
}

export interface SensorStatus {
  motorHizi: "Normal" | "Dalgalı";
  basinc: "Normal" | "Yüksek";
  titresim: "Normal" | "Artmış";
}

export interface EventLog {
  id: string;
  time: string;
  source: EventSource;
  message: string;
  severity: Severity;
}

export interface Decision {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface FacilityStatusItem {
  label: string;
  value: string;
}
