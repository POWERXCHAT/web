interface ContactSectionProps {
  title: string;
  content: string;
  points: string[];
  note?: string;
}

export function ContactSection({ title, content, points, note }: ContactSectionProps) {
  return (
    <section className="privacy-section privacy-contact-section">
      <h2 className="privacy-section-title">{title}</h2>
      <p className="privacy-section-content">{content}</p>
      
      <ul className="privacy-contact-list">
        {points.map((point, index) => (
          <li key={index} className="privacy-contact-item">
            {point}
          </li>
        ))}
      </ul>

      {note && <p className="privacy-note">{note}</p>}
    </section>
  );
}
