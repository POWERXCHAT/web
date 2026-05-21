"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu } from "react-icons/hi";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import enDict from "../../../../public/translation/sidebar/en.json";
import arDict from "../../../../public/translation/sidebar/ar.json";

const dicts: Record<string, Record<string, string>> = { en: enDict, ar: arDict };

export function Sidebar() {
  const [dict, setDict] = useState(dicts.en);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  const close = () => setOpen(false);

  return (
    <>
      <button className={`sidebar-hamburger ${open ? "hidden" : ""}`} onClick={() => setOpen(true)}>
        <HiMenu size={24} />
      </button>

      <div className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="admin-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          {dict.admin}
        </div>

        <nav className="admin-nav">
          <Link href="/ad" className={`admin-nav-item${pathname === "/ad" ? " active" : ""}`} onClick={close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {dict.dashboard}
          </Link>
          <Link href="/ad/users" className={`admin-nav-item${pathname.startsWith("/ad/users") ? " active" : ""}`} onClick={close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            {dict.users}
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-icon-row">
            <Link href="/ad/profile" className="sidebar-icon-btn" title={dict.profile} onClick={close}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <a href="/auth/signout" className="sidebar-signout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {dict.signOut}
          </a>
        </div>
      </div>

      <div className={`sidebar-overlay ${open ? "visible" : ""}`} onClick={close} />
    </>
  );
}
