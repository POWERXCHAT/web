"use client";

interface DeleteConfirmModalProps {
  userName: string;
  dict: Record<string, string>;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export function DeleteConfirmModal({ userName, dict, onConfirm, onClose }: DeleteConfirmModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="delete-modal-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h3 className="delete-modal-title">{dict.confirmDelete}</h3>
        <p className="delete-modal-name">{userName}</p>

        <div className="verify-actions">
          <button className="delete-confirm-btn" onClick={handleConfirm}>
            {dict.delete}
          </button>
          <button className="modal-cancel-btn" onClick={onClose}>{dict.cancel}</button>
        </div>
      </div>
    </div>
  );
}