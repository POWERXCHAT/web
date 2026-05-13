interface PrivacyHeaderProps {
  title: string;
  lastUpdated: string;
}

export function PrivacyHeader({ title, lastUpdated }: PrivacyHeaderProps) {
  return (
    <header className="privacy-header">
      <h1 className="privacy-title">{title}</h1>
      <p className="privacy-last-updated">{lastUpdated}</p>
    </header>
  );
}
