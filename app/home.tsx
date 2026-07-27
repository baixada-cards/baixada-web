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
  heroKicker: string;
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
  storyKicker: string;
  storyLead: string;
  storyBody: string;
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
    navAbout: "The place",
    heroKicker: "A table in the south",
    hero:
      "Card games, kept alive around the table—and rebuilt with care for the screen. Truco is open. Escopa and Bisca are next.",
    primaryAction: "Play Truco",
    labAction: "Study the game",
    invitation: "Come in. Someone has already shuffled.",
    roomsKicker: "Games played after dinner",
    roomsTitle: "Take your seat.",
    roomsIntro:
      "Each game gets its own room. Same table, different conversation.",
    soon: "The light comes on soon",
    open: "The table is open",
    games: {
      Truco: {
        description:
          "Truco paulista for two. Bluff, raise, and read the person across the table.",
        detail: "Casual play and a solved study room.",
      },
      Escopa: {
        description:
          "Fifteen on the table. Clear it at the right moment and leave nothing behind.",
        detail: "The next room we are preparing.",
      },
      Bisca: {
        description:
          "A compact trick-taking game, sharp enough to make a long evening disappear.",
        detail: "Waiting for a later evening.",
      },
    },
    storyKicker: "Where the name comes from",
    storyLead: "This is not a casino. It is a family table.",
    storyBody:
      "Baixada is the name of the farm where these games are actually played: cards softened by use, coffee nearby, and one more hand before everybody leaves. The website keeps that feeling while making room for careful software, study, and new players.",
    aboutKicker: "A place, not a platform",
    aboutTitle: "Como estão as coisas lá na baixada?",
    aboutBody:
      "That is the old family question: how are things down at Baixada? Our answer is simple. The lamp is on. The cards are on the table. There is room for one more.",
    pronunciation: "Baixada · bye-SHAH-dah",
    madeIn: "made in the south",
  },
  "pt-BR": {
    languageName: "English",
    languageHref: "/",
    navGames: "Os jogos",
    navAbout: "O lugar",
    heroKicker: "Uma mesa no sul",
    hero:
      "Jogos de carta mantidos vivos em volta da mesa—e refeitos com cuidado para a tela. O Truco está aberto. Escopa e Bisca vêm depois.",
    primaryAction: "Jogar Truco",
    labAction: "Estudar o jogo",
    invitation: "Chega mais. Alguém já embaralhou.",
    roomsKicker: "Jogos para depois da janta",
    roomsTitle: "Puxa uma cadeira.",
    roomsIntro:
      "Cada jogo ganha sua própria sala. A mesa é a mesma; a conversa muda.",
    soon: "A luz acende em breve",
    open: "A mesa está aberta",
    games: {
      Truco: {
        description:
          "Truco paulista para dois. Blefe, aumente e leia quem está do outro lado.",
        detail: "Jogo casual e uma sala de estudo resolvida.",
      },
      Escopa: {
        description:
          "Quinze na mesa. Limpe tudo na hora certa e não deixe nada para trás.",
        detail: "A próxima sala que estamos preparando.",
      },
      Bisca: {
        description:
          "Um jogo de vazas compacto, afiado o bastante para fazer a noite passar.",
        detail: "Guardada para outra noite.",
      },
    },
    storyKicker: "De onde vem o nome",
    storyLead: "Isto não é um cassino. É uma mesa de família.",
    storyBody:
      "Baixada é o nome da fazenda onde esses jogos realmente acontecem: cartas amaciadas pelo uso, café por perto e só mais uma mão antes de todo mundo ir embora. O site guarda esse sentimento e abre espaço para software cuidadoso, estudo e novos jogadores.",
    aboutKicker: "Um lugar, não uma plataforma",
    aboutTitle: "Como estão as coisas lá na baixada?",
    aboutBody:
      "Essa é a velha pergunta da família. A nossa resposta é simples. A luz está acesa. As cartas estão na mesa. Ainda cabe mais um.",
    pronunciation: "Baixada · bai-XA-da",
    madeIn: "feito no sul",
  },
};

const ROOMS: Array<{
  game: BaixadaGameName;
  suit: BaixadaSuitKind;
  className: string;
  order: string;
  href?: string;
}> = [
  {
    game: "Truco",
    suit: "copas",
    className: "room--truco",
    order: "01",
    href: "https://truco.baixada.cards/",
  },
  {
    game: "Escopa",
    suit: "bastos",
    className: "room--escopa",
    order: "02",
  },
  {
    game: "Bisca",
    suit: "oros",
    className: "room--bisca",
    order: "03",
  },
];

function GameRoom({
  room,
  copy,
}: {
  room: (typeof ROOMS)[number];
  copy: Copy;
}) {
  const content = (
    <>
      {room.href ? <span className="room__photograph" aria-hidden="true" /> : null}
      <span className="room__wash" aria-hidden="true" />
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
        <span className="room__status">{room.href ? copy.open : copy.soon}</span>
        <span>{copy.games[room.game].detail}</span>
        {room.href ? <span className="room__arrow" aria-hidden="true">↗</span> : null}
      </div>
    </>
  );

  return room.href ? (
    <a className={`room ${room.className}`} href={room.href}>
      {content}
    </a>
  ) : (
    <article className={`room ${room.className}`}>{content}</article>
  );
}

export function BaixadaHome({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const trucoLocale = locale === "pt-BR" ? "pt-BR" : "en";

  return (
    <main className="site-shell" lang={locale}>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__photograph" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />

        <header className="site-nav" aria-label="Main navigation">
          <a className="nav-stamp" href="#top" aria-label="Baixada home">
            <BaixadaStamp />
          </a>
          <nav className="nav-links">
            <a href="#games">{copy.navGames}</a>
            <a href="#about">{copy.navAbout}</a>
            <a
              href={copy.languageHref}
              hrefLang={locale === "en" ? "pt-BR" : "en"}
            >
              {copy.languageName}
            </a>
          </nav>
        </header>

        <div className="hero__content">
          <p className="kicker hero__kicker">{copy.heroKicker}</p>
          <h1 className="visually-hidden" id="hero-title">
            Baixada
          </h1>
          <BaixadaWordmark dark className="hero__wordmark" />
          <p className="hero__copy">{copy.hero}</p>
          <div className="hero__actions">
            <a
              className="button button--primary"
              href={`https://truco.baixada.cards/${trucoLocale}`}
            >
              {copy.primaryAction}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button--secondary"
              href={`https://truco.baixada.cards/${trucoLocale}/lab/study`}
            >
              {copy.labAction}
            </a>
          </div>
          <p className="hero__invitation">{copy.invitation}</p>
        </div>

        <a className="hero__scroll" href="#story">
          <span>{copy.storyKicker}</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="story" id="story" aria-labelledby="story-title">
        <div className="story__aside">
          <SuitRow size={16} gap={14} color="var(--brass-0)" />
          <p className="kicker">{copy.storyKicker}</p>
        </div>
        <div className="story__content">
          <h2 id="story-title">{copy.storyLead}</h2>
          <p>{copy.storyBody}</p>
        </div>
        <div className="story__stamp" aria-hidden="true">
          <BaixadaStamp />
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
            <GameRoom key={room.game} room={room} copy={copy} />
          ))}
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about__ornament" aria-hidden="true">
          <span>B</span>
        </div>
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
          <a
            href={copy.languageHref}
            hrefLang={locale === "en" ? "pt-BR" : "en"}
          >
            {copy.languageName}
          </a>
        </div>
      </footer>
    </main>
  );
}
