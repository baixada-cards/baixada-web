import {
  BaixadaGameLockup,
  BaixadaStamp,
  BaixadaWordmark,
  SuitGlyph,
  SuitRow,
  type BaixadaGameName,
  type BaixadaSuitKind,
} from "@baixada-cards/design-system";

type Locale = "en" | "pt-BR";

type Copy = {
  languageName: string;
  languageHref: string;
  navGames: string;
  navAbout: string;
  hero: string;
  primaryAction: string;
  labAction: string;
  invitation: string;
  roomsKicker: string;
  roomsTitle: string;
  roomsIntro: string;
  soon: string;
  open: string;
  games: Record<
    BaixadaGameName,
    {
      description: string;
      detail: string;
    }
  >;
  aboutKicker: string;
  aboutTitle: string;
  aboutBody: string;
  pronunciation: string;
  madeIn: string;
};

const COPY: Record<Locale, Copy> = {
  en: {
    languageName: "Português",
    languageHref: "/pt",
    navGames: "The games",
    navAbout: "About",
    hero:
      "Baixada is a quiet home for the card games of the south. Truco first, with a lab to study optimal play. Escopa and Bisca to follow.",
    primaryAction: "Sit at the Truco table",
    labAction: "Enter Truco · Lab",
    invitation: "Pull up a chair. The deck is shuffled.",
    roomsKicker: "Three rooms, one table",
    roomsTitle: "The games",
    roomsIntro:
      "The real games keep their real names. Each room is considered on its own, and all of them belong to the same place.",
    soon: "In the works",
    open: "Open now",
    games: {
      Truco: {
        description: "Truco paulista for two, with a thoughtful digital table.",
        detail: "Casual play and a solved study room.",
      },
      Escopa: {
        description: "Escopa de quinze, built around the pleasure of clearing the table.",
        detail: "The next room we are preparing.",
      },
      Bisca: {
        description: "A compact trick-taking game with a long southern history.",
        detail: "Planned for a later evening.",
      },
    },
    aboutKicker: "A place, not a platform",
    aboutTitle: "Como estão as coisas lá na baixada?",
    aboutBody:
      "Baixada is the family name for the farm where these games are actually played. This site is a digital answer to that old question: how are things down at Baixada? The cards are on the table, and the lamp is on.",
    pronunciation: "Baixada · bye-SHAH-dah",
    madeIn: "made in the south",
  },
  "pt-BR": {
    languageName: "English",
    languageHref: "/",
    navGames: "Os jogos",
    navAbout: "Sobre",
    hero:
      "Baixada é um lugar tranquilo para os jogos de carta do sul. Truco primeiro, com um laboratório para estudar jogadas ótimas. Escopa e Bisca depois.",
    primaryAction: "Sentar à mesa de Truco",
    labAction: "Entrar no Truco · Lab",
    invitation: "Puxa uma cadeira. O baralho está pronto.",
    roomsKicker: "Três salas, uma mesa",
    roomsTitle: "Os jogos",
    roomsIntro:
      "Os jogos de verdade mantêm seus nomes de verdade. Cada sala é pensada por conta própria, mas todas pertencem ao mesmo lugar.",
    soon: "Em preparo",
    open: "Aberto agora",
    games: {
      Truco: {
        description: "Truco paulista para dois, em uma mesa digital cuidadosa.",
        detail: "Jogo casual e uma sala de estudo resolvida.",
      },
      Escopa: {
        description: "Escopa de quinze, feita em torno do prazer de limpar a mesa.",
        detail: "A próxima sala que estamos preparando.",
      },
      Bisca: {
        description: "Um jogo de vazas compacto, com uma longa história no sul.",
        detail: "Planejada para outra noite.",
      },
    },
    aboutKicker: "Um lugar, não uma plataforma",
    aboutTitle: "Como estão as coisas lá na baixada?",
    aboutBody:
      "Baixada é o nome que a família dá à fazenda onde esses jogos realmente acontecem. Este site é uma resposta digital à velha pergunta: como estão as coisas lá na baixada? As cartas estão na mesa, e a luz está acesa.",
    pronunciation: "Baixada · bai-XA-da",
    madeIn: "feito no sul",
  },
};

const ROOMS: Array<{
  game: BaixadaGameName;
  suit: BaixadaSuitKind;
  className: string;
  href?: string;
}> = [
  {
    game: "Truco",
    suit: "copas",
    className: "game-card--truco",
    href: "https://truco.baixada.cards/",
  },
  {
    game: "Escopa",
    suit: "bastos",
    className: "game-card--escopa",
  },
  {
    game: "Bisca",
    suit: "oros",
    className: "game-card--bisca",
  },
];

function GameCard({
  room,
  copy,
}: {
  room: (typeof ROOMS)[number];
  copy: Copy;
}) {
  const content = (
    <>
      <div className="game-card__corners" aria-hidden="true">
        <span>01</span>
        <SuitGlyph kind={room.suit} size={18} />
      </div>
      <BaixadaGameLockup game={room.game} className="game-card__lockup" />
      <p className="game-card__description">
        {copy.games[room.game].description}
      </p>
      <div className="game-card__foot">
        <span className="game-card__status">
          {room.href ? copy.open : copy.soon}
        </span>
        <span>{copy.games[room.game].detail}</span>
      </div>
    </>
  );

  return room.href ? (
    <a className={`game-card ${room.className}`} href={room.href}>
      {content}
    </a>
  ) : (
    <article className={`game-card ${room.className}`}>{content}</article>
  );
}

export function BaixadaHome({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const trucoLocale = locale === "pt-BR" ? "pt-BR" : "en";

  return (
    <main className="site-shell walnut" lang={locale}>
      <header className="site-nav" aria-label="Main navigation">
        <a className="nav-stamp" href="#top" aria-label="Baixada home">
          <BaixadaStamp />
        </a>
        <nav className="nav-links">
          <a href="#games">{copy.navGames}</a>
          <a href="#about">{copy.navAbout}</a>
          <a href={copy.languageHref} hrefLang={locale === "en" ? "pt-BR" : "en"}>
            {copy.languageName}
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <h1 className="visually-hidden" id="hero-title">
          Baixada
        </h1>
        <BaixadaWordmark dark showLamp className="hero__wordmark" />
        <p className="hero__copy">{copy.hero}</p>
        <div className="hero__actions">
          <a
            className="button button--primary"
            href={`https://truco.baixada.cards/${trucoLocale}`}
          >
            {copy.primaryAction}
          </a>
          <a
            className="button button--secondary"
            href={`https://truco.baixada.cards/${trucoLocale}/lab/study`}
          >
            {copy.labAction}
          </a>
        </div>
        <p className="hero__invitation">{copy.invitation}</p>
        <a className="hero__scroll" href="#games" aria-label={copy.navGames}>
          <span />
        </a>
      </section>

      <section className="rooms" id="games" aria-labelledby="rooms-title">
        <div className="section-heading">
          <p className="kicker">{copy.roomsKicker}</p>
          <h2 id="rooms-title">{copy.roomsTitle}</h2>
          <p>{copy.roomsIntro}</p>
        </div>
        <div className="game-grid">
          {ROOMS.map((room) => (
            <GameCard key={room.game} room={room} copy={copy} />
          ))}
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about__rule" aria-hidden="true" />
        <div className="about__heading">
          <p className="kicker">{copy.aboutKicker}</p>
          <h2 id="about-title">{copy.aboutTitle}</h2>
        </div>
        <div className="about__copy">
          <p>{copy.aboutBody}</p>
          <p className="pronunciation">{copy.pronunciation}</p>
        </div>
      </section>

      <footer className="site-footer">
        <SuitRow size={15} gap={12} color="var(--brass-0)" />
        <p>
          Baixada · est. 2026 · {copy.madeIn}
        </p>
        <div className="footer-links">
          <a href="https://github.com/baixada-cards">GitHub</a>
          <a href={copy.languageHref} hrefLang={locale === "en" ? "pt-BR" : "en"}>
            {copy.languageName}
          </a>
        </div>
      </footer>
    </main>
  );
}
