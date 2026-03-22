import { Link } from "react-router-dom";
import {
   FaGithub,
   FaGamepad,
   FaTrophy,
   FaTwitch,
   FaYoutube,
   FaMagnifyingGlass,
   FaLayerGroup,
   FaMoon,
   FaCodeBranch,
} from "react-icons/fa6";
import { MdViewStream, MdPalette } from "react-icons/md";
import {
   SiAxios,
   SiGithub,
   SiJavascript,
   SiReact,
   SiReactrouter,
   SiSwiper,
   SiTailwindcss,
   SiVite,
} from "react-icons/si";

const featureCards = [
   {
      icon: FaGamepad,
      title: "Browse the catalog",
      body: "Explore a large catalog of games with sorting options—recently added, ratings, Metacritic, release date, or alphabetical order—so you can discover titles the way you prefer.",
   },
   {
      icon: FaLayerGroup,
      title: "Genres & platforms",
      body: "Filter the grid by genre and platform using collapsible sidebar sections with search, so you can narrow results without losing context.",
   },
   {
      icon: FaMagnifyingGlass,
      title: "Header search",
      body: "Search for games from the navigation bar and jump straight to a title’s detail page when you already know what you are looking for.",
   },
   {
      icon: FaTrophy,
      title: "Top rated",
      body: "View a dedicated top-rated games view powered by aggregated scores and community data from the game database API.",
   },
   {
      icon: FaTwitch,
      title: "Live on Twitch",
      body: "See which games are trending on Twitch, open the stream directory, browse the most-viewed live channels, or drill into streams for a specific game.",
   },
   {
      icon: FaYoutube,
      title: "Trailers & media",
      body: "Game detail pages combine metadata with trailer discovery via YouTube so you can preview gameplay and story before you dive into streams.",
   },
];

const techStackItems = [
   { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", title: "JavaScript", Icon: SiJavascript },
   { href: "https://vitejs.dev/", title: "Vite", Icon: SiVite },
   { href: "https://react.dev/", title: "React", Icon: SiReact },
   { href: "https://tailwindcss.com/", title: "Tailwind", Icon: SiTailwindcss },
   { href: "https://swiperjs.com", title: "Swiper", Icon: SiSwiper },
   { href: "https://axios-http.com/", title: "Axios", Icon: SiAxios },
   { href: "https://reactrouter.com/", title: "React Router", Icon: SiReactrouter },
   { href: "https://github.com/", title: "GitHub", Icon: SiGithub },
];

const techTileClass =
   "group flex h-[4.25rem] flex-col items-center justify-center gap-1 rounded-lg border border-borderTheme/50 bg-primary/40 px-1.5 py-2 text-center transition-colors hover:border-accent/35 hover:bg-accent/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:h-[4.5rem]";

const apiCards = [
   {
      href: "https://rawg.io/",
      title: "RAWG",
      imgSrc: "https://rawg.io/assets/en/share-vk.png?v=4",
      body: "Powers game listings, genres, platforms, search, ratings, screenshots, and rich metadata on detail pages.",
   },
   {
      href: "https://dev.twitch.tv/",
      title: "Twitch",
      imgSrc: "https://dev.twitch.tv/marketing-assets/images/TwitchDev.png",
      body: "Supplies top games, live streams, viewer counts, and embed-friendly stream data tied to each title.",
   },
   {
      href: "https://developers.google.com/youtube/v3",
      title: "YouTube",
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      body: "Used to locate and surface trailer videos that match the game you are viewing.",
   },
];

const About = () => {
   return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
         {/* Hero */}
         <header className="animate-fade-up relative mb-12 overflow-hidden rounded-3xl border border-borderTheme/50 bg-gradient-to-br from-primary/80 via-secondary/60 to-primary/90 p-8 shadow-lg sm:p-10 md:p-12">
            <div
               className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
               aria-hidden
            />
            <div
               className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
               aria-hidden
            />
            <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-accent">Zone of Games</p>
            <h1 className="relative mt-3 text-3xl font-black leading-tight tracking-tight text-text sm:text-4xl md:text-5xl">
               A modern hub for discovering games and live streams
            </h1>
            <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
               Zone of Games is a React-based web application that combines a searchable game catalog with Twitch live content
               and YouTube trailers. It was built as a portfolio and team project to demonstrate clean architecture, API
               integration, and a polished browsing experience across desktop and mobile.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
               <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
               >
                  Browse games
               </Link>
               <a
                  href="https://zoneofgames.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-borderTheme/60 bg-primary/50 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/40 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
               >
                  Live demo
               </a>
               <a
                  href="https://github.com/group14-aaa/zone-of-games"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-borderTheme/60 bg-primary/50 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/40 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
               >
                  <FaGithub className="h-4 w-4" aria-hidden />
                  Source code
               </a>
            </div>
         </header>

         {/* Mission */}
         <section className="zog-glass animate-fade-up mb-12 rounded-3xl p-8 sm:p-10" aria-labelledby="about-mission-heading">
            <h2 id="about-mission-heading" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
               Why this project exists
            </h2>
            <div className="mt-5 space-y-4 text-left text-base leading-relaxed text-muted">
               <p>
                  Traditional store fronts often separate “buying a game” from “watching it being played.” Zone of Games
                  closes that gap for discovery: you can scan the catalog, read about a release, watch a trailer, and then
                  see who is streaming that title on Twitch—without juggling multiple tabs or apps.
               </p>
               <p>
                  The codebase follows a component-driven structure: layout, navigation, data fetching, and presentation are
                  split so features can evolve independently. Routes are lazy-loaded to keep the initial bundle lean; theme
                  preference persists locally; API access is centralized in service modules with environment-based keys so
                  secrets stay out of the UI layer.
               </p>
               <p>
                  This aligns with the project goals described in the repository: showcase top-rated games, streams, genre
                  and platform exploration, responsive UI, and integrations with industry-standard entertainment APIs.
               </p>
            </div>
         </section>

         {/* Features grid */}
         <section className="mb-14" aria-labelledby="about-features-heading">
            <h2 id="about-features-heading" className="zog-section-title">
               What you can do
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
               {featureCards.map(({ icon: Icon, title, body }) => (
                  <div
                     key={title}
                     className="zog-glass flex gap-4 rounded-2xl border border-borderTheme/40 p-5 transition hover:border-accent/25"
                  >
                     <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <Icon className="h-6 w-6" aria-hidden />
                     </span>
                     <div className="min-w-0 text-left">
                        <h3 className="text-lg font-bold text-text">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Engineering */}
         <section className="zog-glass mb-12 rounded-3xl p-8 sm:p-10" aria-labelledby="about-engineering-heading">
            <div className="mb-6 flex flex-wrap items-center gap-3">
               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <FaCodeBranch className="h-5 w-5" aria-hidden />
               </span>
               <h2 id="about-engineering-heading" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                  Engineering highlights
               </h2>
            </div>
            <ul className="grid gap-4 text-left sm:grid-cols-2">
               <li className="flex gap-3 rounded-xl border border-borderTheme/30 bg-primary/30 p-4">
                  <MdPalette className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                     <p className="font-semibold text-text">Theming</p>
                     <p className="mt-1 text-sm text-muted">
                        Light and dark modes via React context with persistence, so the interface stays comfortable in any
                        lighting.
                     </p>
                  </div>
               </li>
               <li className="flex gap-3 rounded-xl border border-borderTheme/30 bg-primary/30 p-4">
                  <FaMoon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                     <p className="font-semibold text-text">Performance-minded UI</p>
                     <p className="mt-1 text-sm text-muted">
                        Lazy route loading, debounced search, and pagination on large lists help keep interactions smooth.
                     </p>
                  </div>
               </li>
               <li className="flex gap-3 rounded-xl border border-borderTheme/30 bg-primary/30 p-4">
                  <MdViewStream className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                     <p className="font-semibold text-text">Stream playback</p>
                     <p className="mt-1 text-sm text-muted">
                        Integrated players for Twitch (and related embeds) let you preview live content where it makes
                        sense in the flow.
                     </p>
                  </div>
               </li>
               <li className="flex gap-3 rounded-xl border border-borderTheme/30 bg-primary/30 p-4">
                  <FaLayerGroup className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                     <p className="font-semibold text-text">Modular services</p>
                     <p className="mt-1 text-sm text-muted">
                        RAWG, Twitch, and YouTube clients live in dedicated modules, making limits, errors, and future
                        caching easier to manage.
                     </p>
                  </div>
               </li>
            </ul>
         </section>

         {/* Tech stack */}
         <section className="mb-14" aria-labelledby="about-tech-heading">
            <h2 id="about-tech-heading" className="zog-section-title">
               Core technologies
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted">
               Built with Vite, React 18, React Router, Tailwind CSS, Axios, Swiper for the home banner, and ESLint for code
               quality—matching the stack documented in the project README.
            </p>
            <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:max-w-xl sm:gap-2.5">
               {techStackItems.map(({ href, title, Icon }) => (
                  <a
                     key={title}
                     href={href}
                     target="_blank"
                     rel="noopener noreferrer"
                     title={title}
                     aria-label={title}
                     className={techTileClass}
                  >
                     <Icon className="h-6 w-6 shrink-0 text-text/75 transition-colors group-hover:text-accent sm:h-7 sm:w-7" aria-hidden />
                     <span className="line-clamp-2 max-w-full px-0.5 text-[9px] font-semibold leading-tight text-muted transition-colors group-hover:text-text/90 sm:text-[10px]">
                        {title}
                     </span>
                  </a>
               ))}
            </div>
         </section>

         {/* APIs */}
         <section className="mb-14" aria-labelledby="about-api-heading">
            <h2 id="about-api-heading" className="zog-section-title">
               Data &amp; media partners
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
               {apiCards.map((api) => (
                  <a
                     key={api.title}
                     href={api.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="zog-glass group flex flex-col rounded-2xl border border-borderTheme/50 p-6 transition hover:border-accent/35"
                  >
                     <div className="mb-4 flex h-16 items-center justify-center">
                        <img src={api.imgSrc} alt={api.title} className="max-h-14 object-contain" />
                     </div>
                     <h3 className="text-center text-lg font-bold text-text group-hover:text-accent">{api.title}</h3>
                     <p className="mt-3 text-center text-sm leading-relaxed text-muted">{api.body}</p>
                  </a>
               ))}
            </div>
         </section>

         {/* License & team */}
         <section className="zog-glass rounded-3xl p-8 sm:p-10" aria-labelledby="about-team-heading">
            <h2 id="about-team-heading" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
               License, contributors &amp; credits
            </h2>
            <p className="mt-4 text-left text-base leading-relaxed text-muted">
               Zone of Games is open source under the{" "}
               <a
                  href="https://github.com/group14-aaa/zone-of-games/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline decoration-accent/40 underline-offset-2 hover:text-text"
               >
                  MIT License
               </a>
               . Contributors include Mihai Pirvu, Adam Riley, Anjal Sali, and Chris Di Luca. Thank you to Pratikto
               Ariestyadi (instructor) and Mahyar Mottaghi Zadeh (TA) for guidance during development.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
               <a
                  href="https://rebrand.ly/zoguk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
               >
                  View presentation slides
               </a>
            </div>
         </section>
      </div>
   );
};

export default About;
