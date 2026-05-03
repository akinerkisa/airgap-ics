import { useCallback, useEffect, useMemo, useState } from "react";
import { ActionPanel } from "./components/ActionPanel";
import { Dashboard } from "./components/Dashboard";
import { DecisionModal } from "./components/DecisionModal";
import { ReportPanel } from "./components/ReportPanel";
import {
  defaultHmiStatus,
  defaultSensorStatus,
  educationalMessages,
  initialEventLogs,
  initialFacilityStatus,
  interventionDecision,
  isolationChecklist,
  reportItems,
} from "./data/scenario";
import type { EventLog, ProcessStatus, RiskLevel, SensorStatus } from "./types";

type Stage =
  | "baslangic"
  | "bakim"
  | "usb"
  | "muhendislik"
  | "izleme"
  | "sensor-kontrol"
  | "mudahale"
  | "izolasyon"
  | "rapor";

const stageOrder: Stage[] = [
  "baslangic",
  "bakim",
  "usb",
  "muhendislik",
  "izleme",
  "sensor-kontrol",
  "mudahale",
  "izolasyon",
  "rapor",
];

const stageLabels: Record<Stage, string> = {
  baslangic: "Başlangıç",
  bakim: "Bakım",
  usb: "USB/HID",
  muhendislik: "Mühendislik",
  izleme: "İzleme",
  "sensor-kontrol": "Sensör Kontrol",
  mudahale: "Müdahale",
  izolasyon: "İzolasyon",
  rapor: "Rapor",
};

function nowTime() {
  return new Date().toLocaleTimeString("tr-TR", { hour12: false });
}

function App() {
  const [currentStage, setCurrentStage] = useState<Stage>("baslangic");
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("Normal");
  const [hmiStatus, setHmiStatus] = useState<ProcessStatus>(defaultHmiStatus);
  const [sensorStatus, setSensorStatus] = useState<SensorStatus>(defaultSensorStatus);
  const [eventLogs, setEventLogs] = useState<EventLog[]>(initialEventLogs);
  const [decisions, setDecisions] = useState<number[]>([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const addLog = useCallback((source: EventLog["source"], message: string, severity: EventLog["severity"]) => {
    setEventLogs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        time: nowTime(),
        source,
        message,
        severity,
      },
    ]);
  }, []);

  const resetSimulation = useCallback(() => {
    setCurrentStage("baslangic");
    setRiskLevel("Normal");
    setHmiStatus(defaultHmiStatus);
    setSensorStatus(defaultSensorStatus);
    setEventLogs(initialEventLogs);
    setDecisions([]);
    setReportGenerated(false);
    setDecisionModalOpen(false);
    setAutoPlay(false);
  }, []);

  const handleMaintenanceEntry = useCallback(() => {
    setCurrentStage("bakim");
    setRiskLevel("Dikkat");
    addLog("Fiziksel Güvenlik", "Bakım personeli girişi kaydedildi.", "info");
    addLog("OT Müdahale", "Risk seviyesi düşükten orta seviyeye çıkarıldı.", "warning");
  }, [addLog]);

  const handleUsbConnected = useCallback(() => {
    setCurrentStage("usb");
    setRiskLevel("Şüpheli");
    addLog("Endpoint", "Yeni USB/HID cihaz algılandı.", "warning");
    addLog("Endpoint", "Cihaz sınıfı: Keyboard/HID", "warning");
    addLog("Endpoint", "Harici medya politikası kontrol edilmedi.", "critical");
  }, [addLog]);

  const handleEngineeringSoftware = useCallback(() => {
    setCurrentStage("muhendislik");
    setRiskLevel("Şüpheli");
    addLog("Endpoint", "Mühendislik yazılımı beklenmeyen proje değişikliği algıladı.", "critical");
    addLog("Endpoint", "Son değişiklik kaynağı doğrulanamadı.", "critical");
  }, [addLog]);

  const handleProcessMonitoring = useCallback(() => {
    setCurrentStage("izleme");
    setHmiStatus(defaultHmiStatus);
    addLog("HMI", "Üretim süreci izleme: HMI değerleri normal görünüyor.", "info");
  }, [addLog]);

  const handleIndependentSensorCheck = useCallback(() => {
    setCurrentStage("sensor-kontrol");
    setRiskLevel("Kritik");
    setSensorStatus({ motorHizi: "Dalgalı", basinc: "Yüksek", titresim: "Artmış" });
    addLog("Sensör", "Bağımsız sensörlerde anormallik tespit edildi.", "critical");
    addLog("Sensör", "HMI normal görünse de fiziksel süreç sapması oluşabilir.", "critical");
  }, [addLog]);

  const handleStartIncidentResponse = useCallback(() => {
    setCurrentStage("mudahale");
    setDecisionModalOpen(true);
    addLog("OT Müdahale", "OT olay müdahalesi başlatıldı.", "warning");
  }, [addLog]);

  const handleSelectDecision = useCallback(
    (index: number) => {
      setDecisions((prev) => [...prev, index]);
      if (index === interventionDecision.correctOptionIndex) {
        addLog("OT Müdahale", "Doğru karar seçildi: Çoklu ekip değerlendirmesi.", "info");
      } else {
        addLog("OT Müdahale", "Eksik karar seçildi: Olay bağlamı dar kaldı.", "warning");
      }
    },
    [addLog],
  );

  const handleIsolation = useCallback(() => {
    setCurrentStage("izolasyon");
    setRiskLevel("Kritik");
    isolationChecklist.forEach((item) => {
      addLog("OT Müdahale", `İzolasyon adımı: ${item}`, "warning");
    });
  }, [addLog]);

  const handleReport = useCallback(() => {
    setCurrentStage("rapor");
    setReportGenerated(true);
    addLog("OT Müdahale", "Kısa olay raporu oluşturuldu.", "info");
  }, [addLog]);

  const handleNextDemoStep = useCallback(() => {
    if (currentStage === "baslangic") return handleMaintenanceEntry();
    if (currentStage === "bakim") return handleUsbConnected();
    if (currentStage === "usb") return handleEngineeringSoftware();
    if (currentStage === "muhendislik") return handleProcessMonitoring();
    if (currentStage === "izleme") return handleIndependentSensorCheck();
    if (currentStage === "sensor-kontrol") return handleStartIncidentResponse();
    if (currentStage === "mudahale") {
      if (decisionModalOpen) {
        handleSelectDecision(interventionDecision.correctOptionIndex);
        setDecisionModalOpen(false);
        addLog("OT Müdahale", "Demo modu: karar seçimi otomatik tamamlandı.", "info");
        return;
      }
      return handleIsolation();
    }
    if (currentStage === "izolasyon") return handleReport();
    setAutoPlay(false);
    addLog("OT Müdahale", "Demo modu son aşamaya ulaştı. Yeniden başlatmak için reset kullanın.", "info");
  }, [
    addLog,
    currentStage,
    decisionModalOpen,
    handleEngineeringSoftware,
    handleIndependentSensorCheck,
    handleIsolation,
    handleMaintenanceEntry,
    handleProcessMonitoring,
    handleReport,
    handleSelectDecision,
    handleStartIncidentResponse,
    handleUsbConnected,
  ]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => handleNextDemoStep(), 1700);
    return () => clearInterval(timer);
  }, [autoPlay, handleNextDemoStep]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F8") {
        event.preventDefault();
        resetSimulation();
        handleMaintenanceEntry();
        addLog("OT Müdahale", "Demo modu klavye kısayoluyla başlatıldı.", "info");
      } else if (event.key === "F9") {
        event.preventDefault();
        handleNextDemoStep();
      } else if (event.key === "F10") {
        event.preventDefault();
        resetSimulation();
        addLog("OT Müdahale", "Simülasyon klavye kısayoluyla sıfırlandı.", "info");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [addLog, handleMaintenanceEntry, handleNextDemoStep, resetSimulation]);

  const facilityStatus = useMemo(() => {
    const status = initialFacilityStatus(riskLevel);
    const station =
      currentStage === "baslangic"
        ? "Temiz"
        : currentStage === "usb" || currentStage === "muhendislik"
          ? "Şüpheli"
          : currentStage === "sensor-kontrol" || currentStage === "izolasyon"
            ? "İnceleme Altında"
            : "Değerlendiriliyor";

    return status.map((item) => {
      if (item.label === "Mühendislik İstasyonu") return { ...item, value: station };
      if (item.label === "Üretim Durumu") {
        return {
          ...item,
          value: currentStage === "sensor-kontrol" || currentStage === "izolasyon" ? "Sapma İncelemesi" : "Normal",
        };
      }
      return item;
    });
  }, [currentStage, riskLevel]);

  const stageIndex = stageOrder.indexOf(currentStage);
  const progress = Math.round((stageIndex / (stageOrder.length - 1)) * 100);
  const criticalCount = eventLogs.filter((log) => log.severity === "critical").length;
  const warningCount = eventLogs.filter((log) => log.severity === "warning").length;

  const actions = [
    { label: "Bakım Personeli Girişi", onClick: handleMaintenanceEntry },
    { label: "USB/HID Cihaz Bağlandı", onClick: handleUsbConnected, disabled: currentStage === "baslangic" },
    { label: "Mühendislik Yazılımı Açıldı", onClick: handleEngineeringSoftware, disabled: currentStage === "baslangic" },
    { label: "Üretim Sürecini İzle", onClick: handleProcessMonitoring },
    { label: "Bağımsız Sensörleri Kontrol Et", onClick: handleIndependentSensorCheck },
    { label: "OT Olay Müdahalesi Başlat", onClick: handleStartIncidentResponse },
    { label: "Sistemi İzole Et", onClick: handleIsolation },
    { label: "Rapor Oluştur", onClick: handleReport },
    { label: "Demo Sonraki Adım (F9)", onClick: handleNextDemoStep },
    { label: "Simülasyonu Sıfırla", onClick: resetSimulation },
  ];

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <header className="mx-auto mb-4 w-full max-w-[1400px] rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Air-Gap OT/ICS Güvenlik Simülasyonu</h1>
        <p className="mt-2 text-sm text-slate-700">
          Bu uygulama yalnızca eğitim amaçlıdır. Gerçek malware, exploit, USB erişimi veya PLC bağlantısı içermez.
        </p>
        <p className="mt-2 text-xs text-slate-600">Klavye kısayolları: F8 (demo başlat), F9 (sonraki adım), F10 (reset).</p>
        <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          <p className="font-semibold">payload-sim.txt simülasyonda ne yapar?</p>
          <p className="mt-1">
            Bu dosya, yerel demo adresini açıp (127.0.0.1:5173) F8 ve F9 tuşlarıyla senaryoyu otomatik ilerleten
            eğitim amaçlı örnek bir HID/klavye akışıdır. Gerçek sisteme etkide bulunmaz.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] space-y-4">
        <section className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800">
              Aktif Aşama: <span className="text-sky-700">{stageLabels[currentStage]}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  resetSimulation();
                  handleMaintenanceEntry();
                  addLog("OT Müdahale", "Kontrol panelinden demo başlatıldı.", "info");
                }}
                className="rounded border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100"
              >
                Demo Başlat
              </button>
              <button
                type="button"
                onClick={() => setAutoPlay((prev) => !prev)}
                className="rounded border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100"
              >
                {autoPlay ? "Otomatik Oynatma Durdur" : "Otomatik Oynatma Başlat"}
              </button>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-sky-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 grid gap-2 text-xs text-slate-700 sm:grid-cols-3">
            <p>İlerleme: %{progress}</p>
            <p>Uyarı Logları: {warningCount}</p>
            <p>Kritik Loglar: {criticalCount}</p>
          </div>
        </section>

        <Dashboard
          facilityStatus={facilityStatus}
          hmiStatus={hmiStatus}
          sensorStatus={sensorStatus}
          events={eventLogs}
          riskLevel={riskLevel}
          sensorWarning={currentStage === "sensor-kontrol" || currentStage === "izolasyon" || currentStage === "rapor"}
          educationalMessages={educationalMessages}
        />

        <ActionPanel actions={actions} />
        <ReportPanel visible={reportGenerated} items={reportItems} />
      </main>

      <DecisionModal
        visible={decisionModalOpen}
        decision={interventionDecision}
        selectedIndex={decisions.length ? decisions[decisions.length - 1] : null}
        onSelect={handleSelectDecision}
        onClose={() => setDecisionModalOpen(false)}
      />
    </div>
  );
}

export default App;






