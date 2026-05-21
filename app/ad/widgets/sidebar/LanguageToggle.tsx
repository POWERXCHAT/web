"use client";

import { useEffect, useState } from "react";

export function LanguageToggle() {
  const [isAr, setIsAr] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en";
    setIsAr(lang === "ar");
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, []);

  const toggle = () => {
    const next = !isAr;
    setIsAr(next);
    const lang = next ? "ar" : "en";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang);
  };

  return (
    <button onClick={toggle} className="sidebar-icon-btn" title={isAr ? "English" : "العربية"}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </button>
  );
}
