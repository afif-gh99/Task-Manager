import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import { createPortal } from "react-dom";

const modalToneClasses = {
  warning: {
    label: "Warning",
    icon: FiAlertTriangle,
    accent: "var(--brand-accent-amber-500)",
    pillText: "var(--brand-accent-amber-500)",
    confirmButton:
      "border border-[rgba(243,131,6,0.18)] bg-[linear-gradient(180deg,rgba(247,165,63,0.98),rgba(231,138,24,0.96))] shadow-[var(--shadow-glow-amber)] hover:shadow-[0_22px_38px_rgba(243,131,6,0.22)] focus-visible:ring-[rgba(243,131,6,0.18)]",
  },
  danger: {
    label: "Destructive",
    icon: FiTrash2,
    accent: "#e55353",
    pillText: "#f08f8f",
    confirmButton:
      "border border-[rgba(229,83,83,0.18)] bg-[linear-gradient(180deg,rgba(233,101,101,0.98),rgba(221,77,77,0.96))] shadow-[0_18px_34px_rgba(229,83,83,0.18)] hover:shadow-[0_22px_38px_rgba(229,83,83,0.22)] focus-visible:ring-[rgba(229,83,83,0.18)]",
  },
};

const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  type = "warning",
  onConfirm,
  onCancel,
}) => {
  const toneClasses = modalToneClasses[type] ?? modalToneClasses.warning;
  const ToneIcon = toneClasses.icon;
  const iconWrapStyle = {
    borderColor: `color-mix(in srgb, ${toneClasses.accent} 18%, var(--border-strong))`,
    background: `linear-gradient(180deg, color-mix(in srgb, var(--surface-1) 92%, rgba(255, 255, 255, 0.06)) 0%, color-mix(in srgb, var(--surface-3) 76%, ${toneClasses.accent} 24%) 100%)`,
    color: toneClasses.accent,
    boxShadow: `0 18px 36px color-mix(in srgb, ${toneClasses.accent} 14%, transparent)`,
  };
  const pillStyle = {
    borderColor: `color-mix(in srgb, ${toneClasses.accent} 18%, var(--border-strong))`,
    background: `color-mix(in srgb, var(--surface-1) 84%, ${toneClasses.accent} 16%)`,
    color: toneClasses.pillText,
  };
  const modalContent = (
    <div className="modal-overlay animate-fade-in fixed inset-0 z-[90] grid place-items-center overflow-y-auto p-4 sm:p-6">
      <div className="modal-surface animate-modal-pop my-auto w-full max-w-[31rem] rounded-[32px] px-5 py-5 sm:px-6 sm:py-6">
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div
              className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] border"
              style={iconWrapStyle}
            >
              <span className="absolute inset-[1px] rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(255,255,255,0))]" />
              <ToneIcon className="relative text-[1.4rem]" />
            </div>

            <div className="min-w-0 flex-1">
              <div
                className="inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em]"
                style={pillStyle}
              >
                {toneClasses.label}
              </div>

              <h3 className="mt-3 text-[1.45rem] font-black tracking-[-0.04em] text-[var(--text-strong)] sm:text-[1.65rem]">
                {title}
              </h3>

              <div className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)] sm:text-[0.97rem]">
                {message}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="ui-btn-secondary min-h-11 w-full px-5 text-sm sm:w-auto"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`inline-flex min-h-11 w-full items-center justify-center rounded-[20px] px-5 text-sm font-semibold text-white transition-[transform,box-shadow,border-color,filter] duration-200 [transition-timing-function:var(--ease-standard)] hover:-translate-y-0.5 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 sm:w-auto ${toneClasses.confirmButton}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(modalContent, document.body);
};

export default ConfirmModal;
