const modalToneClasses = {
  warning: {
    iconWrap: "bg-[rgba(243,131,6,0.12)] text-[var(--color-orange)]",
    confirmButton:
      "bg-[var(--color-orange)] hover:bg-[#dd7606] focus-visible:ring-[rgba(243,131,6,0.22)]",
  },
  danger: {
    iconWrap: "bg-[rgba(229,83,83,0.12)] text-[#e55353]",
    confirmButton:
      "bg-[#e55353] hover:bg-[#d94747] focus-visible:ring-[rgba(229,83,83,0.22)]",
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

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,28,58,0.42)] px-4 py-6 backdrop-blur-[4px]">
      <div className="animate-modal-pop w-full max-w-md rounded-[30px] border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] p-6 shadow-[0_28px_80px_rgba(31,40,88,0.18)] sm:p-7">
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${toneClasses.iconWrap}`}
        >
          !
        </div>

        <h3 className="text-xl font-extrabold text-[var(--color-text-primary)] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
          {message}
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-12 items-center justify-center rounded-[20px] border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-5 text-sm font-semibold text-[var(--color-text-secondary)] transition duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(93,142,246,0.16)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex h-12 items-center justify-center rounded-[20px] px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 ${toneClasses.confirmButton}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
