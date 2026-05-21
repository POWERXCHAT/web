"use client";

import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { LoginForm } from "./LoginForm";
import "../login.css";

interface LoginContentProps {
  dictionary: Record<string, string>;
  lang: string;
}

export function LoginContent({ dictionary, lang }: LoginContentProps) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="login-top-bar">
        <LanguageSwitcher lang={lang} label={dictionary.languageSwitch} />
        <ThemeToggle />
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="16" fill="var(--primary)" />
              <path d="M20 44V24l12 10 12-10v20" stroke="var(--text-on-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <h1 className="login-title">
            {isSignup ? dictionary.signupTitle : dictionary.title}
          </h1>
          <p className="login-subtitle">
            {isSignup ? dictionary.signupSubtitle : dictionary.subtitle}
          </p>
        </div>

        <LoginForm
          dictionary={dictionary}
          isSignup={isSignup}
          onToggleMode={() => setIsSignup((prev) => !prev)}
        />
      </div>
    </div>
  );
}
