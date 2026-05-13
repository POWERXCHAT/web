import { getDictionary } from "./dictionaries";
import { PrivacyContent } from "./widgets/PrivacyContent";
import "./privacy.css";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <PrivacyContent dictionary={dictionary} lang={lang} />;
}
