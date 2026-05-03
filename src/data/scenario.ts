import type { Decision, EventLog, FacilityStatusItem, ProcessStatus, SensorStatus } from "../types";

export const educationalMessages: string[] = [
  "Air-gap, fiziksel medya riskini ortadan kaldırmaz.",
  "USB/HID cihazlar sadece dosya taşımaz; cihaz sınıfı da önemlidir.",
  "HMI ekranı normal görünse bile fiziksel süreç bağımsız olarak doğrulanmalıdır.",
  "OT olaylarında IT, OT, fiziksel güvenlik ve bakım süreçleri birlikte değerlendirilmelidir.",
  "Amaç saldırıyı göstermek değil, savunma kontrollerini anlamaktır.",
];

export const defaultHmiStatus: ProcessStatus = {
  motorHizi: "Normal",
  basinc: "Normal",
  titresim: "Normal",
  alarm: "Yok",
};

export const defaultSensorStatus: SensorStatus = {
  motorHizi: "Normal",
  basinc: "Normal",
  titresim: "Normal",
};

export const initialFacilityStatus = (riskLevel: string): FacilityStatusItem[] => [
  { label: "Ağ Durumu", value: "Air-gap / İnternet bağlantısı yok" },
  { label: "Üretim Durumu", value: "Normal" },
  { label: "Mühendislik İstasyonu", value: "Temiz" },
  { label: "Risk Seviyesi", value: riskLevel },
];

export const initialEventLogs: EventLog[] = [
  {
    id: "boot-1",
    time: "00:00:00",
    source: "OT Müdahale",
    message: "Simülasyon başlatıldı. Tüm sistemler normal görünüyor.",
    severity: "info",
  },
];

export const interventionDecision: Decision = {
  id: "ot-intervention",
  question: "OT olayına ilk yaklaşım nasıl olmalı?",
  options: [
    "Sadece IT ekibine bildir",
    "Sadece üretim ekibine bildir",
    "IT, OT, fiziksel güvenlik ve bakım kayıtlarını birlikte değerlendir",
    "Sistem normal göründüğü için işlem yapma",
  ],
  correctOptionIndex: 2,
  explanation: "Doğru yaklaşım, birden fazla ekip ve kaynağı birlikte değerlendirerek bağlamlı olay analizi yapmaktır.",
};

export const isolationChecklist: string[] = [
  "Mühendislik istasyonunu izole et",
  "USB kullanımını durdur",
  "Bakım medyasını karantinaya al",
  "Bağımsız sensör verilerini izlemeye al",
  "HMI ve sensör verilerini karşılaştır",
  "Değişiklik yönetimi kayıtlarını kontrol et",
];

export const reportItems: string[] = [
  "Muhtemel giriş noktası: Fiziksel bakım süreci / USB-HID cihaz",
  "Kritik bulgu: Air-gap tek başına yeterli değil",
  "Kritik bulgu: HMI ve bağımsız sensör değerleri tutarsız",
  "Eksik kontrol: USB allowlist",
  "Eksik kontrol: Bakım medyası doğrulama süreci",
  "Eksik kontrol: Fiziksel erişim log korelasyonu",
  "Öneri: OT değişiklik yönetimi",
  "Öneri: Mühendislik istasyonu izleme",
  "Öneri: HMI/sensör tutarlılık kontrolü",
];
