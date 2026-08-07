import {
  BaixadaStamp,
  BaixadaWordmark,
  SuitRow,
} from "@baixada-cards/design-system";

export type Locale = "en" | "pt-BR" | "es";

type Copy = {
  languageLabel: string;
  navLab: string;
  navGuide: string;
  contactAction: string;
  heroKicker: string;
  wordmarkTagline: string;
  hero: string;
  playAction: string;
  labAction: string;
  guideAction: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    languageLabel: "Language",
    navLab: "Laboratory",
    navGuide: "Guide",
    contactAction: "Contact",
    heroKicker: "Heads-up truco paulista",
    wordmarkTagline: "card games and optimal play",
    hero:
      "A laboratory specialized in heads-up truco paulista (more games to come).",
    playAction: "Play Truco",
    labAction: "Open the lab",
    guideAction: "Read the guide",
  },
  "pt-BR": {
    languageLabel: "Idioma",
    navLab: "Laboratório",
    navGuide: "Guia",
    contactAction: "Contato",
    heroKicker: "Truco paulista para dois",
    wordmarkTagline: "jogos de carta e estratégia ótima",
    hero:
      "Um laboratório especializado em truco paulista para dois jogadores (mais jogos em breve).",
    playAction: "Jogar Truco",
    labAction: "Abrir o laboratório",
    guideAction: "Ler o guia",
  },
  es: {
    languageLabel: "Idioma",
    navLab: "Laboratorio",
    navGuide: "Guía",
    contactAction: "Contacto",
    heroKicker: "Truco paulista mano a mano",
    wordmarkTagline: "juegos de cartas y estrategia óptima",
    hero:
      "Un laboratorio especializado en truco paulista mano a mano (más juegos próximamente).",
    playAction: "Jugar al Truco",
    labAction: "Abrir el laboratorio",
    guideAction: "Leer la guía",
  },
};

const LOCALES: Array<{
  locale: Locale;
  href: string;
  label: string;
  shortLabel: string;
}> = [
  { locale: "en", href: "/", label: "English", shortLabel: "EN" },
  {
    locale: "pt-BR",
    href: "/pt",
    label: "Português",
    shortLabel: "PT",
  },
  { locale: "es", href: "/es", label: "Español", shortLabel: "ES" },
];

function LanguageMenu({ locale, copy }: { locale: Locale; copy: Copy }) {
  const current =
    LOCALES.find((option) => option.locale === locale) ?? LOCALES[0];

  return (
    <details className="language-menu">
      <summary
        aria-label={`${copy.languageLabel}: ${current.label}`}
        title={copy.languageLabel}
      >
        <span className="language-menu__long">{current.label}</span>
        <span className="language-menu__short">{current.shortLabel}</span>
        <span className="language-menu__chevron" aria-hidden="true">
          ⌄
        </span>
      </summary>
      <div className="language-menu__options">
        {LOCALES.map((option) =>
          option.locale === locale ? (
            <span
              className="language-menu__option language-menu__option--current"
              aria-current="page"
              key={option.locale}
              lang={option.locale}
            >
              {option.label}
              <span aria-hidden="true">●</span>
            </span>
          ) : (
            <a
              className="language-menu__option"
              href={option.href}
              hrefLang={option.locale}
              key={option.locale}
              lang={option.locale}
            >
              {option.label}
            </a>
          ),
        )}
      </div>
    </details>
  );
}

export function BaixadaHome({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const trucoBase = `https://truco.baixada.cards/${locale}`;

  return (
    <main className="site-shell" lang={locale}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__photograph" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />

        <header className="site-nav">
          <div className="site-nav__inner">
            <a className="nav-stamp" href="#top" aria-label="Baixada home">
              <BaixadaStamp />
            </a>
            <nav className="nav-links" aria-label="Main navigation">
              <a href={`${trucoBase}/lab/study`}>{copy.navLab}</a>
              <a href={`${trucoBase}/lab/study/guide`}>{copy.navGuide}</a>
              <LanguageMenu locale={locale} copy={copy} />
            </nav>
          </div>
        </header>

        <div className="hero__content">
          <p className="kicker hero__kicker">{copy.heroKicker}</p>
          <h1 className="visually-hidden" id="hero-title">
            Baixada
          </h1>
          <BaixadaWordmark
            dark
            tagline={copy.wordmarkTagline}
            className="hero__wordmark"
          />
          <p className="hero__copy">{copy.hero}</p>
          <div className="hero__actions">
            <a
              className="button button--primary"
              href={`${trucoBase}/lab/study`}
            >
              {copy.labAction}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button--secondary"
              href={`${trucoBase}/lab/study/guide`}
            >
              {copy.guideAction}
            </a>
            <a className="button button--tertiary" href={trucoBase}>
              {copy.playAction}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <SuitRow size={14} gap={11} color="var(--brass-0)" />
        <p>Baixada · est. 2026</p>
        <div className="site-footer__links">
          <a href="mailto:hello@baixada.cards">{copy.contactAction}</a>
          <a href="https://github.com/baixada-cards">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
