"use client";

import { useEffect, useState, useMemo } from "react";
import { Sidebar } from "../widgets/sidebar/Sidebar";
import { UserCard } from "./UserCard";
import enDict from "../../../public/translation/users/en.json";
import arDict from "../../../public/translation/users/ar.json";
import "./users.css";

const dicts: Record<string, Record<string, string>> = { en: enDict, ar: arDict };

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

interface UsersContentProps {
  users: User[];
}

export function UsersContent({ users: initialUsers }: UsersContentProps) {
  const [dict, setDict] = useState(dicts.en);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    const lang = document.documentElement.lang || "en";
    setDict(dicts[lang] || dicts.en);

    const observer = new MutationObserver(() => {
      const l = document.documentElement.lang || "en";
      setDict(dicts[l] || dicts.en);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const toggleBan = (userId: string, banned: boolean) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, is_banned: banned } : u)));
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...updates } : u)));
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const filtered = useMemo(
    () =>
      users
        .filter((u) => {
          if (filter === "verified") return u.is_verified;
          if (filter === "active") return !u.is_banned;
          if (filter === "inactive") return u.is_banned;
          return true;
        })
        .filter(
          (u) =>
            (u.email?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (u.first_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
            (u.last_name?.toLowerCase().includes(search.toLowerCase()) ?? false)
        ),
    [users, search, filter]
  );

  return (
    <div className="admin-page users-page">
      <Sidebar />

      <main className="admin-main">
        <div className="users-header">
          <div className="users-header-left">
            <h1>{dict.title}</h1>
            <p>{dict.totalUsers}: {users.length.toLocaleString()}</p>
          </div>
          <div className="users-header-right">
            <input
              type="text"
              className="users-search"
              placeholder={dict.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="users-filters">
              {["all", "verified", "active", "inactive"].map((f) => (
                <button
                  key={f}
                  className={`users-filter-btn${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {dict[`filter${f.charAt(0).toUpperCase() + f.slice(1)}`]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="users-grid">
          {filtered.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
              {dict.noUsers}
            </p>
          ) : (
            filtered.map((u) => <UserCard key={u.id} user={u} dict={dict} onToggleBan={toggleBan} onUpdateUser={updateUser} onDeleteUser={deleteUser} />)
          )}
        </div>
      </main>
    </div>
  );
}
