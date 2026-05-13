interface Subsection {
  title?: string;
  content?: string;
  points?: string[];
  note?: string;
  email?: string;
}

interface PrivacySectionProps {
  title: string;
  content?: string;
  points?: string[];
  subsections?: Subsection[];
  note?: string;
  email?: string;
}

export function PrivacySection({
  title,
  content,
  points,
  subsections,
  note,
  email,
}: PrivacySectionProps) {
  return (
    <section className="privacy-section">
      <h2 className="privacy-section-title">{title}</h2>
      
      {content && <p className="privacy-section-content">{content}</p>}

      {subsections && subsections.length > 0 && (
        <div className="privacy-subsections">
          {subsections.map((subsection, index) => (
            <div key={index} className="privacy-subsection">
              {subsection.title && (
                <h3 className="privacy-subsection-title">{subsection.title}</h3>
              )}
              {subsection.content && (
                <p className="privacy-section-content">{subsection.content}</p>
              )}
              {subsection.points && subsection.points.length > 0 && (
                <ul className="privacy-points-list">
                  {subsection.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="privacy-point-item">
                      <span className="privacy-point-bullet"></span>
                      <span className="privacy-point-text">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {subsection.note && (
                <p className="privacy-note">{subsection.note}</p>
              )}
              {subsection.email && (
                <a href={`mailto:${subsection.email}`} className="privacy-contact-link">
                  {subsection.email}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {points && points.length > 0 && (
        <ul className="privacy-points-list">
          {points.map((point, index) => (
            <li key={index} className="privacy-point-item">
              <span className="privacy-point-bullet"></span>
              <span className="privacy-point-text">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {note && <p className="privacy-note">{note}</p>}

      {email && (
        <a href={`mailto:${email}`} className="privacy-contact-link">
          {email}
        </a>
      )}
    </section>
  );
}
