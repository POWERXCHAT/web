"use client";

import { useState } from "react";

interface ChangePasswordModalProps {
  userEmail: string;
  dict: Record<string, string>;
  onConfirm: (password: string) => Promise<void>;
  onClose: () => void;
}

export function ChangePasswordModal({ userEmail, dict, onConfirm, onClose }: ChangePasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (password.length < 6) {
      setError(dict.passwordMinLength);
      return;
    }
    setError("");
    await onConfirm(password);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content change-password-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="verify-modal-title">{dict.changePassword}</h3>

        <p className="change-password-email">{userEmail}</p>

        <input
          type="password"
          placeholder={dict.newPassword}
          className="change-password-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          autoFocus
        />
        {error && <p className="change-password-error">{error}</p>}

        <div className="verify-actions">
          <button className="modal-confirm-btn" onClick={handleConfirm}>
            {dict.save}
          </button>
          <button className="modal-cancel-btn" onClick={onClose}>{dict.cancel}</button>
        </div>
      </div>
    </div>
  );
}