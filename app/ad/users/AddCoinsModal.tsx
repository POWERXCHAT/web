"use client";

import { useState } from "react";

interface AddCoinsModalProps {
  dict: Record<string, string>;
  onConfirm: (amount: number) => void;
  onClose: () => void;
}

export function AddCoinsModal({ dict, onConfirm, onClose }: AddCoinsModalProps) {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    const num = parseInt(amount);
    if (!num || num < 1) return;
    onConfirm(num);
    onClose();
  };

  return (
    <div className="modal-content addcoins-modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h3 className="verify-modal-title">{dict.addCoins}</h3>

      <div className="addcoins-input-wrap">
        <img src="/Xpoints.svg" alt="" className="addcoins-icon" />
        <input
          type="number"
          min="1"
          placeholder={dict.coinsAmount}
          className="addcoins-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
        />
      </div>

      <div className="verify-actions">
        <button className="modal-confirm-btn" onClick={handleConfirm}>
          {dict.add}
        </button>
        <button className="modal-cancel-btn" onClick={onClose}>{dict.cancel}</button>
      </div>
    </div>
  );
}