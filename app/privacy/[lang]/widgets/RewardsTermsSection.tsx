interface RewardSection {
  title: string;
  content?: string;
  points?: string[];
  note?: string;
  email?: string;
}

interface RewardsTermsSectionProps {
  title: string;
  sections: RewardSection[];
}

export function RewardsTermsSection({ title, sections }: RewardsTermsSectionProps) {
  return (
    <section className="privacy-section privacy-rewards-section">
      <h2 className="privacy-section-title privacy-rewards-title">{title}</h2>
      
      {sections.map((section, index) => (
        <div key={index} className="privacy-reward-block">
          <h3 className="privacy-subsection-title">{section.title}</h3>
          
          {section.content && (
            <p className="privacy-section-content">{section.content}</p>
          )}

          {section.points && section.points.length > 0 && (
            <ul className="privacy-points-list">
              {section.points.map((point, pointIndex) => (
                <li key={pointIndex} className="privacy-point-item">
                  <span className="privacy-point-bullet"></span>
                  <span className="privacy-point-text">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {section.note && (
            <p className="privacy-note">{section.note}</p>
          )}

          {section.email && (
            <a href={`mailto:${section.email}`} className="privacy-contact-link">
              {section.email}
            </a>
          )}
        </div>
      ))}
    </section>
  );
}
