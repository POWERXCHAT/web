"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const hashStr = window.location.hash.replace("#", "?");
      const hashParams = new URLSearchParams(hashStr);
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token") || "";

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      try {
        if (accessToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = "/lg/en";
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("user_id", user.id);

        const isAdmin = profile && profile.length > 0 ? profile[0].is_admin : false;
        window.location.href = isAdmin ? "/ad" : "/";
      } catch {
        window.location.href = "/lg/en";
      }
    };

    handleCallback();
  }, [router]);

  return null;
}
