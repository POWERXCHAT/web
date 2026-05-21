"use client";

import { useState } from "react";

interface VerifyModalProps {
  dict: Record<string, string>;
  isVerified: boolean;
  onConfirm: (duration: string | null) => void;
  onClose: () => void;
}

export function VerifyModal({ dict, isVerified, onConfirm, onClose }: VerifyModalProps) {
  const [duration, setDuration] = useState("week");
  const [customDays, setCustomDays] = useState("");

  const getDuration = (): string | null => {
    if (duration === "forever") return null;
    if (duration === "custom") {
      const days = parseInt(customDays);
      if (!days || days < 1) return null;
      return new Date(Date.now() + days * 86400000).toISOString();
    }
    const multipliers: Record<string, number> = {
      week: 7,
      month: 30,
      year: 365,
    };
    return new Date(Date.now() + (multipliers[duration] || 7) * 86400000).toISOString();
  };

  const handleConfirm = () => {
    if (isVerified) {
      onConfirm(null);
    } else {
      const d = getDuration();
      if (duration === "custom" && !d) return;
      onConfirm(d);
    }
    onClose();
  };

  return (
    <div className="modal-content verify-modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h3 className="verify-modal-title">{isVerified ? dict.unverifyConfirm : dict.verifyUser}</h3>

      {!isVerified && (
        <div className="verify-options">
          {["week", "month", "year", "forever", "custom"].map((opt) => (
            <label key={opt} className="verify-option">
              <input
                type="radio"
                name="duration"
                value={opt}
                checked={duration === opt}
                onChange={() => setDuration(opt)}
              />
              <span>{dict[`duration_${opt}`]}</span>
            </label>
          ))}
          {duration === "custom" && (
            <input
              type="number"
              min="1"
              placeholder={dict.daysCount}
              className="verify-custom-input"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
            />
          )}
        </div>
      )}

      <div className="verify-actions">
        <button className="modal-confirm-btn" onClick={handleConfirm}>
          {isVerified ? dict.yes : dict.confirm}
        </button>
        <button className="modal-cancel-btn" onClick={onClose}>{dict.cancel}</button>
      </div>
    </div>
  );
}