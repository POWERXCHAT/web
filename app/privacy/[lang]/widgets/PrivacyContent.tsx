import { PrivacyHeader } from "./PrivacyHeader";
import { PrivacySection } from "./PrivacySection";
import { RewardsTermsSection } from "./RewardsTermsSection";
import { ContactSection } from "./ContactSection";
import { BackButton } from "./BackButton";
import "../privacy.css";

interface Subsection {
  title?: string;
  content?: string;
  points?: string[];
  note?: string;
  email?: string;
}

interface Section {
  title: string;
  content?: string;
  points?: string[];
  subsections?: Subsection[];
  note?: string;
  email?: string;
}

interface RewardSection {
  title: string;
  content?: string;
  points?: string[];
  note?: string;
  email?: string;
}

interface RewardsTerms {
  title: string;
  sections: RewardSection[];
}

interface Dictionary {
  title: string;
  lastUpdated: string;
  appName: string;
  intro: string;
  sections: {
    [key: string]: Section | RewardsTerms;
  };
}

interface PrivacyContentProps {
  dictionary: Dictionary;
  lang: string;
}

export function PrivacyContent({ dictionary, lang }: PrivacyContentProps) {
  const { title, lastUpdated, intro, sections } = dictionary;
  
  // Separate sections by type
  const regularSections: [string, Section][] = [];
  let rewardsTerms: RewardsTerms | null = null;
  let contactSection: Section | null = null;

  Object.entries(sections).forEach(([key, section]) => {
    if (key === "rewardsTerms") {
      rewardsTerms = section as RewardsTerms;
    } else if (key === "contact") {
      contactSection = section as Section;
    } else {
      regularSections.push([key, section as Section]);
    }
  });

  return (
    <div className="privacy-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="privacy-container">
        <PrivacyHeader title={title} lastUpdated={lastUpdated} />

        <p className="privacy-intro">{intro}</p>

        {/* Regular Sections */}
        {regularSections.map(([key, section]) => (
          <PrivacySection
            key={key}
            title={section.title}
            content={section.content}
            points={section.points}
            subsections={section.subsections}
            note={section.note}
            email={section.email}
          />
        ))}

        {/* Rewards Terms Section */}
        {rewardsTerms && (
          <RewardsTermsSection
            title={rewardsTerms.title}
            sections={rewardsTerms.sections}
          />
        )}

        {/* Contact Section */}
        {contactSection && (
          <ContactSection
            title={contactSection.title}
            content={contactSection.content || ""}
            points={contactSection.points || []}
            note={contactSection.note}
          />
        )}

        <BackButton lang={lang} />
      </div>
    </div>
  );
}
