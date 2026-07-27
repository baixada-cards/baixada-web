import {
  BaixadaGameLockup,
  BaixadaStamp,
  BaixadaWordmark,
  SuitGlyph,
  SuitRow,
  type BaixadaGameName,
  type BaixadaSuitKind,
} from "@baixada-cards/design-system";

export type Locale = "en" | "pt-BR" | "es";

type Copy = {
  languageLabel: string;
  navGames: string;
  navOrigin: string;
  heroKicker: string;
  wordmarkTagline: string;
  hero: string;
  playAction: string;
  labAction: string;
  guideAction: string;
  roomsKicker: string;
  roomsTitle: string;
  roomsIntro: string;
  available: string;
  coming: string;
  openGame: string;
  games: Record<
    BaixadaGameName,
    {
      description: string;
      detail: string;
    }
  >;
  originKicker: string;
  originBody: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    languageLabel: "Language",
    navGames: "The games",
    navOrigin: "Why Baixada",
    heroKicker: "Play · study · learn",
    wordmarkTagline: "card games, software, and study",
    hero:
      "A home for playing and studying the card games that have become part of my life. Truco paulista is open; Escopa and Bisca come next.",
    playAction: "Play Truco",
    labAction: "Open the lab",
    guideAction: "Read the guide",
    roomsKicker: "The collection",
    roomsTitle: "The games.",
    roomsIntro: "Play what is ready and follow what comes next.",
    available: "Available now",
    coming: "In development",
    openGame: "Open Truco",
    games: {
      Truco: {
        description:
          "Truco paulista for two, with casual play and a separate study environment.",
        detail: "Game, lab, and guide are available.",
      },
      Escopa: {
        description:
          "A capture game built around making fifteen and clearing the table.",
        detail: "The next game in the collection.",
      },
      Bisca: {
        description:
          "A compact trick-taking game with a small deck and sharp decisions.",
        detail: "Planned for a later release.",
      },
    },
    originKicker: "Why Baixada",
    originBody:
      "Baixada is the name of my family’s farm in southern Brazil. It is where these games became part of my life, and the name carries that personal history into the project.",
  },
  "pt-BR": {
    languageLabel: "Idioma",
    navGames: "Os jogos",
    navOrigin: "Por que Baixada",
    heroKicker: "Jogar · estudar · aprender",
    wordmarkTagline: "jogos de carta, software e estudo",
    hero:
      "Um espaço para jogar e estudar os jogos de carta que fazem parte da minha vida. O truco paulista já está disponível; Escopa e Bisca vêm depois.",
    playAction: "Jogar Truco",
    labAction: "Abrir o laboratório",
    guideAction: "Ler o guia",
    roomsKicker: "A coleção",
    roomsTitle: "Os jogos.",
    roomsIntro: "Jogue o que já está pronto e acompanhe o que vem depois.",
    available: "Disponível agora",
    coming: "Em desenvolvimento",
    openGame: "Abrir o Truco",
    games: {
      Truco: {
        description:
          "Truco paulista para dois, com jogo casual e um ambiente separado de estudo.",
        detail: "Jogo, laboratório e guia estão disponíveis.",
      },
      Escopa: {
        description:
          "Um jogo de captura baseado em formar quinze e limpar a mesa.",
        detail: "O próximo jogo da coleção.",
      },
      Bisca: {
        description:
          "Um jogo de vazas compacto, com poucas cartas e decisões afiadas.",
        detail: "Planejada para uma versão futura.",
      },
    },
    originKicker: "Por que Baixada",
    originBody:
      "Baixada é o nome da fazenda da minha família no sul do Brasil. Foi lá que esses jogos se tornaram parte da minha vida, e o nome leva essa história pessoal para o projeto.",
  },
  es: {
    languageLabel: "Idioma",
    navGames: "Los juegos",
    navOrigin: "Por qué Baixada",
    heroKicker: "Jugar · estudiar · aprender",
    wordmarkTagline: "juegos de cartas, software y estudio",
    hero:
      "Un espacio para jugar y estudiar los juegos de cartas que forman parte de mi vida. El truco paulista ya está disponible; Escopa y Bisca llegarán después.",
    playAction: "Jugar al Truco",
    labAction: "Abrir el laboratorio",
    guideAction: "Leer la guía",
    roomsKicker: "La colección",
    roomsTitle: "Los juegos.",
    roomsIntro: "Juega a lo que ya está listo y sigue lo que viene.",
    available: "Disponible ahora",
    coming: "En desarrollo",
    openGame: "Abrir Truco",
    games: {
      Truco: {
        description:
          "Truco paulista para dos, con juego casual y un entorno de estudio separado.",
        detail: "El juego, el laboratorio y la guía están disponibles.",
      },
      Escopa: {
        description:
          "Un juego de captura basado en sumar quince y limpiar la mesa.",
        detail: "El próximo juego de la colección.",
      },
      Bisca: {
        description:
          "Un juego de bazas compacto, con pocas cartas y decisiones precisas.",
        detail: "Planeado para una versión futura.",
      },
    },
    originKicker: "Por qué Baixada",
    originBody:
      "Baixada es el nombre de la finca de mi familia en el sur de Brasil. Allí estos juegos pasaron a formar parte de mi vida, y el nombre lleva esa historia personal al proyecto.",
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

const ROOMS: Array<{
  game: BaixadaGameName;
  suit: BaixadaSuitKind;
  className: string;
  order: string;
  available: boolean;
}> = [
  {
    game: "Truco",
    suit: "copas",
    className: "room--truco",
    order: "01",
    available: true,
  },
  {
    game: "Escopa",
    suit: "bastos",
    className: "room--escopa",
    order: "02",
    available: false,
  },
  {
    game: "Bisca",
    suit: "oros",
    className: "room--bisca",
    order: "03",
    available: false,
  },
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

function GameRoom({
  room,
  copy,
  trucoLocale,
}: {
  room: (typeof ROOMS)[number];
  copy: Copy;
  trucoLocale: Locale;
}) {
  const content = (
    <>
      <div className="room__top">
        <span>{room.order}</span>
        <SuitGlyph kind={room.suit} size={20} />
      </div>
      <div className="room__body">
        <BaixadaGameLockup
          game={room.game}
          dark
          className="room__lockup"
        />
        <p>{copy.games[room.game].description}</p>
      </div>
      <div className="room__foot">
        <span className="room__status">
          {room.available ? copy.available : copy.coming}
        </span>
        <span>{copy.games[room.game].detail}</span>
        <span
          className={`room__action${room.available ? "" : " room__action--disabled"}`}
        >
          {room.available ? copy.openGame : copy.coming}
          {room.available ? <span aria-hidden="true">↗</span> : null}
        </span>
      </div>
    </>
  );

  return room.available ? (
    <a
      className={`room ${room.className}`}
      href={`https://truco.baixada.cards/${trucoLocale}`}
    >
      {content}
    </a>
  ) : (
    <article
      className={`room room--unavailable ${room.className}`}
      aria-label={`${room.game}: ${copy.coming}`}
    >
      {content}
    </article>
  );
}

export function BaixadaHome({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const trucoLocale = locale;

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
              <a href="#games">{copy.navGames}</a>
              <a href="#origin">{copy.navOrigin}</a>
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
              href={`https://truco.baixada.cards/${trucoLocale}`}
            >
              {copy.playAction}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button--secondary"
              href={`https://truco.baixada.cards/${trucoLocale}/lab/study`}
            >
              {copy.labAction}
            </a>
            <a
              className="button button--secondary"
              href={`https://truco.baixada.cards/${trucoLocale}/lab/study/guide`}
            >
              {copy.guideAction}
            </a>
          </div>
        </div>
      </section>

      <section className="rooms" id="games" aria-labelledby="rooms-title">
        <div className="section-heading">
          <div>
            <p className="kicker">{copy.roomsKicker}</p>
            <h2 id="rooms-title">{copy.roomsTitle}</h2>
          </div>
          <p>{copy.roomsIntro}</p>
        </div>
        <div className="room-grid">
          {ROOMS.map((room) => (
            <GameRoom
              key={room.game}
              room={room}
              copy={copy}
              trucoLocale={trucoLocale}
            />
          ))}
        </div>
      </section>

      <section className="origin" id="origin" aria-labelledby="origin-title">
        <div className="origin__mark" aria-hidden="true">
          <BaixadaStamp />
        </div>
        <p className="kicker" id="origin-title">
          {copy.originKicker}
        </p>
        <p className="origin__body">{copy.originBody}</p>
      </section>

      <footer className="site-footer">
        <SuitRow size={15} gap={12} color="var(--brass-0)" />
        <p>Baixada · est. 2026</p>
        <a href="https://github.com/baixada-cards">GitHub</a>
      </footer>
    </main>
  );
}
