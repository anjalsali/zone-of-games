import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import whiteLogo from "./../assets/images/zog-logo-white.png";
import blackLogo from "./../assets/images/zog-logo-black.png";
import { IoSearchSharp, IoCloseOutline } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { FaHome, FaTwitch, FaInfoCircle, FaAddressBook } from "react-icons/fa";
import rawgApi from "../services/rawgApi";

const NAV_ITEMS = [
   { to: "/", key: "home", label: "Home", icon: FaHome, end: true },
   { to: "/streams/", key: "streams", label: "Live", icon: FaTwitch, end: false },
   { to: "/about", key: "about", label: "About", icon: FaInfoCircle, end: false },
   { to: "/contact", key: "contact", label: "Contact", icon: FaAddressBook, end: false },
];

const MOBILE_DISCOVER_COUNT = 2;

const resolveActiveNavKey = (pathname) => {
   if (pathname === "/" || pathname === "") {
      return "home";
   }
   if (pathname.startsWith("/games/top")) {
      return null;
   }
   if (pathname === "/streams" || pathname === "/streams/" || pathname.startsWith("/streams/")) {
      return "streams";
   }
   if (pathname === "/about") {
      return "about";
   }
   if (pathname === "/contact" || pathname === "/Contact") {
      return "contact";
   }
   if (pathname.startsWith("/games/")) {
      return "home";
   }
   return null;
};

const ThemeToggle = ({ theme, setTheme }) => {
   const isDark = theme === "dark";

   const handleToggle = () => {
      const next = isDark ? "light" : "dark";
      setTheme(next);
      localStorage.setItem("theme", next);
   };

   return (
      <button
         type="button"
         aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
         aria-pressed={isDark}
         onClick={handleToggle}
         className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-transparent bg-primary/40 text-muted transition-colors hover:bg-accent/15 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary md:h-10 md:w-10"
      >
         {isDark ? (
            <MdLightMode className="h-[18px] w-[18px]" aria-hidden />
         ) : (
            <BsMoon className="h-[18px] w-[18px]" aria-hidden />
         )}
      </button>
   );
};

ThemeToggle.propTypes = {
   theme: PropTypes.string.isRequired,
   setTheme: PropTypes.func.isRequired,
};

const Header = () => {
   const { theme, setTheme } = useContext(ThemeContext);
   const logoSrc = theme === "dark" ? whiteLogo : blackLogo;
   const navigate = useNavigate();
   const location = useLocation();

   const [gameList, setGameList] = useState([]);
   const [openMenu, setOpenMenu] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredGames, setFilteredGames] = useState([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [selectedSuggestion, setSelectedSuggestion] = useState(0);

   const activeNavKey = useMemo(() => resolveActiveNavKey(location.pathname), [location.pathname]);

   useEffect(() => {
      const q = searchQuery.trim();
      if (q === "") {
         setGameList([]);
         return undefined;
      }
      const handle = window.setTimeout(async () => {
         try {
            const response = await rawgApi.getSearchAllGames(q);
            const raw = response?.data?.results;
            const list = Array.isArray(raw)
               ? raw.filter((g) => g != null && g.id != null && g.id !== "")
               : [];
            setGameList(list);
         } catch (error) {
            console.error("Error fetching game list:", error);
            setGameList([]);
         }
      }, 300);
      return () => window.clearTimeout(handle);
   }, [searchQuery]);

   useEffect(() => {
      const needle = searchQuery.toLowerCase();
      const filtered = gameList.filter((game) => {
         const name = typeof game?.name === "string" ? game.name : "";
         return name.toLowerCase().includes(needle);
      });
      setFilteredGames(filtered);
      setShowSuggestions(searchQuery.trim() !== "" && filtered.length > 0);
   }, [searchQuery, gameList]);

   useEffect(() => {
      setSelectedSuggestion(0);
   }, [searchQuery]);

   const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
   };

   const goToGame = useCallback(
      (gameId) => {
         if (!gameId) {
            return;
         }
         navigate(`/games/${gameId}`);
         setShowSuggestions(false);
         setOpenMenu(false);
      },
      [navigate]
   );

   const handleEnterPress = (event, gameId) => {
      if (event.key === "Enter" && searchQuery.trim() !== "" && filteredGames.length > 0) {
         event.preventDefault();
         goToGame(gameId);
      }
   };

   const handleArrowKeyPress = (event) => {
      if (event.key === "ArrowDown" && selectedSuggestion < filteredGames.length - 1) {
         event.preventDefault();
         setSelectedSuggestion((i) => i + 1);
      } else if (event.key === "ArrowUp" && selectedSuggestion > 0) {
         event.preventDefault();
         setSelectedSuggestion((i) => i - 1);
      }
   };

   const handleSearchSubmit = (gameId) => {
      if (searchQuery.trim() !== "" && filteredGames.length > 0) {
         goToGame(gameId ?? filteredGames[selectedSuggestion]?.id);
      }
   };

   const desktopNavLinkClass = (key) =>
      `zog-nav-link ${activeNavKey === key ? "zog-nav-link-active" : ""}`;

   const mobileNavLinkClass = (key) =>
      `zog-nav-pill ${activeNavKey === key ? "zog-nav-pill-active" : ""}`;

   return (
      <header className="zog-nav-shell sticky top-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-primary/70">
         <div className="relative mx-auto flex w-full max-w-[1920px] flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4 md:flex-nowrap md:gap-3 md:px-5 md:py-0 md:h-[3.75rem]">
            <Link
               to="/"
               className="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none ring-offset-2 ring-offset-primary focus-visible:ring-2 focus-visible:ring-accent sm:gap-3"
               aria-label="Zone Of Games home"
            >
               <img
                  className="h-8 w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.03] md:h-9"
                  src={logoSrc}
                  width={120}
                  height={48}
                  alt="Zone Of Games"
               />
               <span className="hidden min-w-0 sm:block">
                  <span className="block font-black leading-tight tracking-tight text-text sm:text-[1.05rem] md:text-lg">
                     Zone Of Games
                  </span>
               </span>
            </Link>

            <div className="relative order-3 flex min-h-[2.5rem] w-full flex-1 items-stretch gap-1.5 rounded-lg zog-nav-search-shell px-2.5 py-1 md:order-none md:mx-2 md:min-w-0 md:max-w-xl md:flex-1 lg:mx-4 lg:max-w-2xl">
               <div className="flex min-w-0 flex-1 items-center gap-2">
                  <IoSearchSharp className="shrink-0 text-lg text-accent/80" aria-hidden />
                  <input
                     type="search"
                     placeholder="Search the catalog…"
                     className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-text outline-none placeholder:text-muted md:text-[15px]"
                     value={searchQuery}
                     onChange={handleSearchChange}
                     aria-label="Search games"
                     aria-autocomplete="list"
                     aria-controls="nav-search-suggestions"
                     aria-expanded={showSuggestions}
                     autoComplete="off"
                     onKeyDown={(event) => {
                        handleArrowKeyPress(event);
                        handleEnterPress(
                           event,
                           filteredGames.length > 0 ? filteredGames[selectedSuggestion]?.id : ""
                        );
                     }}
                  />
               </div>
               {showSuggestions && (
                  <div
                     id="nav-search-suggestions"
                     className="absolute left-0 top-[calc(100%+8px)] z-[70] max-h-80 w-full overflow-y-auto rounded-xl border border-borderTheme/60 bg-primary py-1 shadow-2xl ring-1 ring-black/20"
                     role="listbox"
                     aria-label="Search suggestions"
                  >
                     {filteredGames.map((game, index) => (
                        <button
                           key={game.id}
                           type="button"
                           role="option"
                           aria-selected={index === selectedSuggestion}
                           className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                              index === selectedSuggestion
                                 ? "bg-accent/15 text-text"
                                 : "text-text/90 hover:bg-secondary/80"
                           }`}
                           onClick={() => {
                              setSearchQuery(game.name);
                              goToGame(game.id);
                           }}
                        >
                           {game.background_image ? (
                              <img
                                 src={game.background_image}
                                 alt=""
                                 className="h-10 w-14 shrink-0 rounded-md object-cover"
                                 width={56}
                                 height={40}
                              />
                           ) : (
                              <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-secondary text-[10px] text-muted">
                                 —
                              </span>
                           )}
                           <span className="min-w-0 flex-1 truncate font-semibold">
                              {typeof game.name === "string" ? game.name : "Untitled"}
                           </span>
                        </button>
                     ))}
                  </div>
               )}
               <button
                  type="button"
                  className={`shrink-0 self-center rounded-md border border-transparent px-2 py-1.5 transition-colors ${
                     searchQuery.trim() === "" || filteredGames.length === 0
                        ? "cursor-not-allowed text-muted"
                        : "border-accent/30 bg-accent/15 text-accent hover:bg-accent/25"
                  }`}
                  disabled={searchQuery.trim() === "" || filteredGames.length === 0}
                  onClick={(event) => {
                     event.preventDefault();
                     handleSearchSubmit(filteredGames[selectedSuggestion]?.id);
                  }}
                  aria-label="Open selected game"
               >
                  <span className="hidden text-[10px] font-bold uppercase tracking-wider sm:inline">Go</span>
                  <svg
                     className="h-4 w-4 sm:hidden"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth="2"
                     aria-hidden
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
               </button>
            </div>

            <button
               type="button"
               onClick={() => setOpenMenu((o) => !o)}
               className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-borderTheme/55 bg-primary/50 text-text transition-colors hover:border-accent/40 hover:bg-accent/10 md:hidden"
               aria-expanded={openMenu}
               aria-controls="zog-mobile-nav"
               aria-label={openMenu ? "Close menu" : "Open menu"}
            >
               {openMenu ? (
                  <IoCloseOutline className="h-6 w-6" aria-hidden />
               ) : (
                  <svg
                     className="h-5 w-5"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth="2"
                     aria-hidden
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
               )}
            </button>

            <div
               id="zog-mobile-nav"
               className={`fixed inset-y-0 right-0 z-[80] w-[min(100%,340px)] border-l border-borderTheme/60 bg-primary/98 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out md:hidden ${
                  openMenu ? "translate-x-0" : "translate-x-full"
               }`}
               aria-hidden={!openMenu}
            >
               <div className="flex h-full flex-col overflow-y-auto px-5 pb-8 pt-6">
                  <p className="zog-nav-mobile-section">Discover</p>
                  <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                     {NAV_ITEMS.slice(0, 3).map(({ to, key, label, icon: Icon }) => (
                        <Link
                           key={key}
                           to={to}
                           className={mobileNavLinkClass(key)}
                           onClick={() => setOpenMenu(false)}
                           aria-current={activeNavKey === key ? "page" : undefined}
                        >
                           <Icon className="text-base opacity-90" aria-hidden />
                           {label}
                        </Link>
                     ))}
                  </nav>
                  <p className="zog-nav-mobile-section">Site</p>
                  <nav className="flex flex-col gap-1" aria-label="Mobile secondary">
                     {NAV_ITEMS.slice(MOBILE_DISCOVER_COUNT).map(({ to, key, label, icon: Icon }) => (
                        <Link
                           key={key}
                           to={to}
                           className={mobileNavLinkClass(key)}
                           onClick={() => setOpenMenu(false)}
                           aria-current={activeNavKey === key ? "page" : undefined}
                        >
                           <Icon className="text-base opacity-90" aria-hidden />
                           {label}
                        </Link>
                     ))}
                  </nav>
                  <div className="mt-8 flex items-center gap-3 border-t border-borderTheme/50 pt-6">
                     <span className="text-xs font-semibold uppercase tracking-wider text-muted">Theme</span>
                     <ThemeToggle theme={theme} setTheme={setTheme} />
                  </div>
               </div>
            </div>

            {openMenu && (
               <button
                  type="button"
                  className="fixed inset-0 z-[75] bg-background/50 backdrop-blur-sm md:hidden"
                  aria-label="Close menu"
                  onClick={() => setOpenMenu(false)}
               />
            )}

            <nav
               className="hidden items-center gap-0.5 md:flex md:shrink-0 lg:gap-1"
               aria-label="Main navigation"
            >
               {NAV_ITEMS.map(({ to, key, label, icon: Icon }) => (
                  <Link
                     key={key}
                     to={to}
                     className={desktopNavLinkClass(key)}
                     aria-current={activeNavKey === key ? "page" : undefined}
                  >
                     <Icon className="h-3.5 w-3.5 opacity-90" aria-hidden />
                     {label}
                  </Link>
               ))}
               <div className="ml-1 flex shrink-0 items-center border-l border-borderTheme/40 pl-2 lg:ml-2 lg:pl-3">
                  <ThemeToggle theme={theme} setTheme={setTheme} />
               </div>
            </nav>
         </div>
      </header>
   );
};

export default Header;
