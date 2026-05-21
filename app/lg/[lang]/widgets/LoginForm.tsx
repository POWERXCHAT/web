"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  dictionary: Record<string, string>;
  isSignup: boolean;
  onToggleMode: () => void;
}

export function LoginForm({ dictionary, isSignup, onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignup) {
      const { error: signupErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (signupErr) {
        setError(signupErr.message);
      } else {
        alert(dictionary.signupSuccess);
      }
    } else {
      const { data: { session }, error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginErr) {
        setError(dictionary.loginFailed);
      } else if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("user_id", session.user.id)
          .single();
        router.push(profile?.is_admin ? "/ad" : "/");
        router.refresh();
      }
    }

    setLoading(false);
  };

  const handleGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const redirectTo = window.location.origin + "/auth/callback";
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Google sign-in failed");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-field">
        <label className="login-label" htmlFor="email">
          {dictionary.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          className="login-input"
          placeholder={dictionary.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="login-field">
        <label className="login-label" htmlFor="password">
          {dictionary.passwordLabel}
        </label>
        <input
          id="password"
          type="password"
          className="login-input"
          placeholder={dictionary.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {error && <p className="login-error">{error}</p>}

      <button type="submit" className="login-button" disabled={loading}>
        {loading
          ? isSignup ? dictionary.creatingAccount : dictionary.signingIn
          : isSignup ? dictionary.signupButton : dictionary.loginButton}
      </button>

      <div className="login-divider">
        <span className="login-divider-text">or</span>
      </div>

      <button type="button" className="google-button" onClick={handleGoogle} disabled={loading}>
        <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {dictionary.googleButton}
      </button>

      <button type="button" className="login-toggle-mode" onClick={onToggleMode}>
        {isSignup ? dictionary.hasAccount : dictionary.noAccount}{" "}
        <span>{isSignup ? dictionary.loginButton : dictionary.signupButton}</span>
      </button>
    </form>
  );
}
