import { useContext, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import _debounce from "debounce";
import { ThemeContext } from "../context/ThemeContext";
import whiteLogo from "./../assets/images/zog-logo-white.png";
import blackLogo from "./../assets/images/zog-logo-black.png";
import { IoSearchSharp, IoCloseOutline } from "react-icons/io5";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaHome, FaInfoCircle, FaAddressBook } from "react-icons/fa";
import rawgApi from "../services/rawgApi";

const Header = () => {
   const { theme, setTheme } = useContext(ThemeContext);
   const logoSrc = theme === "dark" ? whiteLogo : blackLogo;
   const [gameList, setGameList] = useState([]);
   const [openMenu, setOpenMenu] = useState(false);
   const location = useLocation();
   const [activeIndex, setActiveIndex] = useState(0);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredGames, setFilteredGames] = useState([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [selectedSuggestion, setSelectedSuggestion] = useState(0);

   useEffect(() => {
      const getActiveIndex = () => {
         switch (location.pathname) {
            case "/":
               return 0;
            case "/about":
               return 1;
            case "/contact":
               return 2;
            default:
               return 0;
         }
      };
      setActiveIndex(getActiveIndex());
   }, [location]);

   const fetchGameList = async () => {
      try {
         if (searchQuery.trim() !== "") {
            const response = await rawgApi.getSearchAllGames(searchQuery);
            setGameList(response?.data?.results || []);
         } else {
            setGameList([]);
         }
      } catch (error) {
         console.error("Error fetching game list:", error);
      }
   };

   const debouncedFetchGameList = _debounce(fetchGameList, 300);

   useEffect(() => {
      debouncedFetchGameList();
      return debouncedFetchGameList.cancel;
   }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps -- debounced side effect tied to searchQuery

   useEffect(() => {
      const filtered = gameList.filter((game) =>
         game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
      setShowSuggestions(searchQuery !== "" && filtered.length > 0);
   }, [searchQuery, gameList]);

   const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
   };

   const handleSuggestionClick = (gameName) => {
      setSearchQuery(gameName);
      setShowSuggestions(false);
   };

   const handleEnterPress = (event, gameId) => {
      if (event.key === "Enter" && searchQuery.trim() !== "" && filteredGames.length > 0) {
         window.location.href = `/games/${gameId}`;
      }
   };

   const handleArrowKeyPress = (event) => {
      if (event.key === "ArrowDown" && selectedSuggestion < filteredGames.length - 1) {
         setSelectedSuggestion(selectedSuggestion + 1);
      } else if (event.key === "ArrowUp" && selectedSuggestion > 0) {
         setSelectedSuggestion(selectedSuggestion - 1);
      }
   };

   const handleSearchSubmit = (gameId) => {
      if (searchQuery.trim() !== "" && filteredGames.length > 0) {
         window.location.href = `/games/${gameId}`;
      }
   };

   const navLinkClass = (idx) =>
      `zog-nav-pill ${activeIndex === idx ? "zog-nav-pill-active" : ""}`;

   return (
      <header className="sticky top-0 z-50 border-b border-borderTheme/50 bg-primary/75 backdrop-blur-xl">
         <div className="flex w-full flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 md:flex-nowrap md:px-5">
            <a href="/" className="shrink-0 transition-transform duration-200 hover:scale-105">
               <img
                  className="ml-1 h-10 w-auto object-contain md:h-11"
                  src={logoSrc}
                  width={100}
                  height={50}
                  alt="Zone of Games logo"
               />
            </a>

            <div className="relative order-3 flex min-h-[44px] w-full flex-1 items-center gap-2 rounded-xl border border-borderTheme/60 bg-secondary/60 px-3 py-2 shadow-inner shadow-black/5 backdrop-blur-md md:order-none md:mx-2 md:min-w-0 md:max-w-none md:flex-1 lg:mx-4">
               <IoSearchSharp className="shrink-0 text-lg text-muted" aria-hidden />
               <input
                  required
                  type="search"
                  placeholder="Search games…"
                  className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted md:text-base"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  aria-label="Search games"
                  autoComplete="off"
                  onKeyDown={(event) => {
                     handleArrowKeyPress(event);
                     handleEnterPress(event, filteredGames.length > 0 ? filteredGames[selectedSuggestion].id : "");
                  }}
               />
               {showSuggestions && (
                  <div
                     className="absolute left-0 top-[calc(100%+10px)] z-20 max-h-72 w-full overflow-y-auto rounded-2xl border border-borderTheme/60 bg-secondary py-2 shadow-glow backdrop-blur-xl"
                     role="listbox"
                  >
                     {filteredGames.map((game, index) => (
                        <div
                           key={game.id}
                           role="option"
                           aria-selected={index === selectedSuggestion}
                           className={`cursor-pointer px-4 py-3 text-sm transition-colors ${
                              index === selectedSuggestion
                                 ? "bg-accent/15 text-accent"
                                 : "text-text hover:bg-primary/80"
                           }`}
                           onClick={() => {
                              handleSuggestionClick(game.name);
                              handleSearchSubmit(game.id);
                           }}
                        >
                           {game.name}
                        </div>
                     ))}
                  </div>
               )}
               <button
                  type="button"
                  className={`shrink-0 rounded-xl p-2 transition-colors ${
                     searchQuery.trim() === "" || filteredGames.length === 0
                        ? "cursor-not-allowed text-muted"
                        : "text-accent hover:bg-accent/10"
                  }`}
                  disabled={searchQuery.trim() === "" || filteredGames.length === 0}
                  onClick={(event) => {
                     event.preventDefault();
                     handleSearchSubmit(filteredGames.length > 0 ? filteredGames[selectedSuggestion].id : "");
                  }}
                  aria-label="Go to selected game"
               >
                  <svg
                     className="h-5 w-5"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth="2"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
               </button>
            </div>

            <button
               type="button"
               onClick={() => setOpenMenu(!openMenu)}
               className="ml-auto inline-flex items-center rounded-xl border border-borderTheme/50 p-2 text-text transition-colors hover:border-accent/40 hover:bg-accent/10 md:hidden"
               aria-expanded={openMenu}
               aria-label="Open menu"
            >
               <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>

            <div
               className={`fixed inset-y-0 right-0 z-[60] w-[min(100%,320px)] border-l border-borderTheme/50 bg-primary/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out md:hidden ${
                  openMenu ? "translate-x-0" : "translate-x-full"
               }`}
            >
               <button
                  type="button"
                  onClick={() => setOpenMenu(false)}
                  className="absolute right-4 top-4 rounded-lg p-2 text-muted hover:bg-secondary hover:text-text"
                  aria-label="Close menu"
               >
                  <IoCloseOutline className="text-2xl" />
               </button>
               <nav className="mt-12 flex flex-col gap-2" aria-label="Mobile">
                  <Link
                     to="/"
                     title="Home"
                     className={navLinkClass(0)}
                     onClick={() => setOpenMenu(false)}
                     aria-current={activeIndex === 0 ? "page" : undefined}
                  >
                     <FaHome className="text-lg" aria-hidden />
                     Home
                  </Link>
                  <Link to="/about" title="About" className={navLinkClass(1)} onClick={() => setOpenMenu(false)}>
                     <FaInfoCircle className="text-lg" aria-hidden />
                     About
                  </Link>
                  <Link to="/contact" title="Contact" className={navLinkClass(2)} onClick={() => setOpenMenu(false)}>
                     <FaAddressBook className="text-lg" aria-hidden />
                     Contact
                  </Link>
                  <button
                     type="button"
                     onClick={() => {
                        const newTheme = theme === "light" ? "dark" : "light";
                        setTheme(newTheme);
                        localStorage.setItem("theme", newTheme);
                     }}
                     className="zog-nav-pill mt-4 justify-center border border-borderTheme/50"
                  >
                     {theme === "light" ? <MdDarkMode className="text-xl" /> : <MdLightMode className="text-xl" />}
                     <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
                  </button>
               </nav>
            </div>

            {openMenu && (
               <button
                  type="button"
                  className="fixed inset-0 z-[55] bg-background/40 backdrop-blur-sm md:hidden"
                  aria-label="Close menu overlay"
                  onClick={() => setOpenMenu(false)}
               />
            )}

            <nav
               className="hidden items-center gap-1 md:flex md:shrink-0"
               aria-label="Main"
            >
               <a href="/" className={navLinkClass(0)} aria-current={activeIndex === 0 ? "page" : undefined}>
                  <FaHome aria-hidden />
                  Home
               </a>
               <a href="/about" className={navLinkClass(1)}>
                  <FaInfoCircle aria-hidden />
                  About
               </a>
               <a href="/contact" className={navLinkClass(2)}>
                  <FaAddressBook aria-hidden />
                  Contact
               </a>
               <button
                  type="button"
                  onClick={() => {
                     const newTheme = theme === "light" ? "dark" : "light";
                     setTheme(newTheme);
                     localStorage.setItem("theme", newTheme);
                  }}
                  className="ml-2 flex h-11 w-11 items-center justify-center rounded-xl border border-borderTheme/50 text-accent transition-all hover:border-accent/50 hover:bg-accent/10 hover:shadow-glow-sm"
                  aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
               >
                  {theme === "light" ? <MdDarkMode className="text-2xl" /> : <MdLightMode className="text-2xl" />}
               </button>
            </nav>
         </div>
      </header>
   );
};

export default Header;
