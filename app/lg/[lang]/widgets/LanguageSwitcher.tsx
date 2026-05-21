"use client";

import { useRouter, usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  lang: string;
  label: string;
}

export function LanguageSwitcher({ lang, label }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const targetLang = lang === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${lang}`, `/${targetLang}`);
    router.push(newPath);
  };

  return (
    <button onClick={switchLanguage} className="language-switcher">
      {label}
    </button>
  );
}
