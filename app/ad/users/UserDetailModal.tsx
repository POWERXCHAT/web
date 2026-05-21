"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { VerifyModal } from "./VerifyModal";
import { AddCoinsModal } from "./AddCoinsModal";

interface User {
  id: string;
  user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_image_url: string | null;
  is_admin: boolean;
  is_verified: boolean;
  verified_until: string | null;
  is_banned: boolean;
  auth_provider: string;
  current_coins: number;
  created_at: string | null;
}

interface UserDetailModalProps {
  user: User;
  dict: Record<string, string>;
  onClose: () => void;
  onUpdate: (updated: Partial<User>) => void;
}

export function UserDetailModal({ user: initialUser, dict, onClose, onUpdate }: UserDetailModalProps) {
  const [user, setUser] = useState(initialUser);
  const [showVerify, setShowVerify] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || "—";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleVerify = async (duration: string | null) => {
    const updates: Record<string, unknown> = { is_verified: false, verified_until: null };
    if (duration) {
      updates.is_verified = true;
      updates.verified_until = duration;
    }
    const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);
    if (!error) {
      setUser((prev) => ({ ...prev, ...updates } as User));
      onUpdate(updates as Partial<User>);
    }
  };

  const handleAddCoins = async (amount: number) => {
    const { data, error } = await supabase.rpc("admin_add_coins", {
      target_user_id: user.user_id,
      amount,
    });
    if (!error && data) {
      setUser((prev) => ({ ...prev, current_coins: data }));
      onUpdate({ current_coins: data });
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>&times;</button>

          <div className="modal-header">
            {user.profile_image_url ? (
              <img src={user.profile_image_url} alt="" className="modal-avatar" />
            ) : (
              <div className="modal-avatar-placeholder">{initials}</div>
            )}
          </div>

          <div className="modal-body">
            <h2 className="modal-name">
              {name}
              {user.is_verified && (
                <svg className="user-checkmark" width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            </h2>

            <div className="modal-info-row">
              <span className="modal-label">{dict.email}:</span>
              <span className="modal-value">{user.email || "—"}</span>
            </div>

            <div className="modal-info-row">
              <span className="modal-label">{dict.status}:</span>
              <span className="modal-value">
                {user.is_verified ? dict.verified : dict.unverified}
              </span>
              <button className="modal-action-btn" onClick={() => setShowVerify(true)} title={user.is_verified ? dict.unverify : dict.verify}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>

            <div className="modal-info-row">
              <span className="modal-label">{dict.accountType}:</span>
              <span className="modal-value">
                {user.auth_provider === "google" ? "Google" : dict.email}
              </span>
            </div>

            <div className="modal-info-row">
              <span className="modal-label">{dict.isBanned}:</span>
              <span className="modal-value">{user.is_banned ? dict.yes : dict.no}</span>
            </div>

            <div className="modal-tokens-row">
              <img src="/Xpoints.svg" alt="" className="modal-tokens-icon" />
              <span className="modal-tokens-value">{(user.current_coins ?? 0).toLocaleString()}</span>
              <button className="modal-action-btn" onClick={() => setShowCoins(true)} title={dict.addCoins}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showVerify && (
        <div className="modal-overlay" onClick={() => setShowVerify(false)}>
          <VerifyModal
            dict={dict}
            isVerified={user.is_verified}
            onConfirm={handleVerify}
            onClose={() => setShowVerify(false)}
          />
        </div>
      )}
      {showCoins && (
        <div className="modal-overlay" onClick={() => setShowCoins(false)}>
          <AddCoinsModal
            dict={dict}
            onConfirm={handleAddCoins}
            onClose={() => setShowCoins(false)}
          />
        </div>
      )}
    </>
  );
}