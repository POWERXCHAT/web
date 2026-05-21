"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { UserDetailModal } from "./UserDetailModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

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

interface UserCardProps {
  user: User;
  dict: Record<string, string>;
  onToggleBan: (userId: string, banned: boolean) => void;
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserCard({ user: initialUser, dict, onToggleBan, onUpdateUser, onDeleteUser }: UserCardProps) {
  const [user, setUser] = useState(initialUser);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || "—";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleDelete = async () => {
    const res = await fetch("/api/admin/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id }),
    });
    if (res.ok) onDeleteUser(user.id); // remove from UI
  };

  const handleChangePassword = async (password: string) => {
    await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id, password }),
    });
  };

  const toggleBan = async () => {
    const next = !user.is_banned;
    const { error } = await supabase
      .from("profiles")
      .update({ is_banned: next })
      .eq("id", user.id);

    if (!error) {
      setUser((prev) => ({ ...prev, is_banned: next }));
      onToggleBan(user.id, next);
    }
  };

  return (
    <div className="user-card">
      {user.profile_image_url ? (
        <img src={user.profile_image_url} alt="" className="user-card-avatar" />
      ) : (
        <div className="user-card-avatar-placeholder">{initials}</div>
      )}

      <p className="user-card-name">
        {name}
        {user.is_verified && (
          <svg className="user-checkmark" width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
        {user.is_banned && <span className="user-badge user-badge-inactive">{dict.inactive}</span>}
      </p>
      <p className="user-card-email">
        {user.email}
        {user.auth_provider === "google" && (
          <span className="user-badge user-badge-google" title="Google">G</span>
        )}
      </p>

      <div className="user-card-actions">
        {user.auth_provider !== "google" && (
          <button className="user-action-btn" title={dict.edit} onClick={() => setShowPasswordModal(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            {dict.edit}
          </button>
        )}
        <button className="user-action-btn" title={dict.view} onClick={() => setShowModal(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <button
          className={`user-action-btn ${user.is_banned ? "activate" : "deactivate"}`}
          title={user.is_banned ? dict.activate : dict.deactivate}
          onClick={toggleBan}
        >
          {user.is_banned ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          )}
          {user.is_banned ? dict.activate : dict.deactivate}
        </button>
        <button className="user-action-btn delete" title={dict.delete} onClick={() => setShowDeleteModal(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
      {showDeleteModal && (
        <DeleteConfirmModal
          userName={name}
          dict={dict}
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showPasswordModal && (
        <ChangePasswordModal
          userEmail={user.email || ""}
          dict={dict}
          onConfirm={handleChangePassword}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
      {showModal && (
        <UserDetailModal
          user={user}
          dict={dict}
          onClose={() => setShowModal(false)}
          onUpdate={(updates) => {
            setUser((prev) => ({ ...prev, ...updates }));
            onUpdateUser(user.id, updates);
          }}
        />
      )}
    </div>
  );
}
