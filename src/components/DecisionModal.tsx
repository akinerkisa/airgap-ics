import type { Decision } from "../types";

interface DecisionModalProps {
  visible: boolean;
  decision: Decision;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export function DecisionModal({
  visible,
  decision,
  selectedIndex,
  onSelect,
  onClose,
}: DecisionModalProps) {
  if (!visible) {
    return null;
  }

  const isCorrect = selectedIndex === decision.correctOptionIndex;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-slate-300 bg-white p-6 shadow-xl">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Müdahale Kararı</h2>
        <p className="mb-4 text-sm text-slate-700">{decision.question}</p>
        <div className="space-y-2">
          {decision.options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-full rounded border px-3 py-2 text-left text-sm ${
                selectedIndex === index
                  ? "border-sky-500 bg-sky-50 text-sky-800"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              {String.fromCharCode(65 + index)}) {option}
            </button>
          ))}
        </div>
        {selectedIndex !== null ? (
          <p
            className={`mt-4 rounded border p-3 text-sm ${
              isCorrect
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-amber-300 bg-amber-50 text-amber-700"
            }`}
          >
            {decision.explanation}
          </p>
        ) : null}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
