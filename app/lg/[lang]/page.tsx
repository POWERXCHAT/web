import { getDictionary } from "./dictionaries";
import { LoginContent } from "./widgets/LoginContent";
import "./login.css";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LoginPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <LoginContent dictionary={dictionary} lang={lang} />;
}
