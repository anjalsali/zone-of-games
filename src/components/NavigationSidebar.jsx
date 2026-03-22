import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SiTwitch } from "react-icons/si";
import CollapsibleSection from "./CollapsibleSection";
import StoreSidebarNav from "./StoreSidebarNav";

const ORDERING_OPTIONS = [
   { value: "-added", label: "Recently added" },
   { value: "-rating", label: "Highest rated" },
   { value: "-released", label: "New releases" },
   { value: "name", label: "Title A–Z" },
];

const NavigationSidebar = ({
   genreList,
   displayedGenres,
   genreActiveIndex,
   onShowMore,
   onShowLess,
   onGenreSelect,
   platformList,
   displayedPlatforms,
   platformActiveIndex,
   onShowMorePlatforms,
   onShowLessPlatforms,
   onPlatformSelect,
   twitchTopGames,
   selectedOrdering,
   onOrderingChange,
}) => {
   const [genreSearch, setGenreSearch] = useState("");
   const [platformSearch, setPlatformSearch] = useState("");

   const filteredGenres = useMemo(() => {
      const q = genreSearch.trim().toLowerCase();
      if (!q) {
         return genreList;
      }
      return genreList.filter((g) => g.name.toLowerCase().includes(q));
   }, [genreList, genreSearch]);

   const filteredPlatforms = useMemo(() => {
      const q = platformSearch.trim().toLowerCase();
      if (!q) {
         return platformList;
      }
      return platformList.filter((p) => p.name.toLowerCase().includes(q));
   }, [platformList, platformSearch]);

   const visibleGenres = filteredGenres.slice(0, displayedGenres);
   const visiblePlatforms = filteredPlatforms.slice(0, displayedPlatforms);

   const handleOrderingClick = (value) => {
      onOrderingChange(value);
   };

   return (
      <aside className="zog-store-sidebar hidden w-[280px] max-w-[min(280px,92vw)] shrink-0 text-text md:flex md:min-h-0 md:flex-col">
         <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-0 pb-6 pr-1 pt-3">
            <div className="shrink-0">
               <div className="zog-store-sidebar-header px-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Zone of Games</p>
                  <p className="mt-0.5 text-sm font-black tracking-tight text-text">Store</p>
               </div>

               <div className="mt-3 px-3">
                  <StoreSidebarNav />
               </div>

               <div className="zog-sidebar-divider mt-4" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-2">
               <div className="flex min-h-0 flex-1 flex-col">
                  <CollapsibleSection title="Genres" variant="browse">
                     <label className="sr-only" htmlFor="sidebar-genre-search">
                        Search genres
                     </label>
                     <input
                        id="sidebar-genre-search"
                        type="search"
                        placeholder="Search genres…"
                        value={genreSearch}
                        onChange={(e) => setGenreSearch(e.target.value)}
                        className="zog-sidebar-search mb-2"
                        autoComplete="off"
                     />
                     <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border border-borderTheme/60 bg-background/40">
                     {visibleGenres.map((item) => (
                        <div
                           key={item.id}
                           onClick={() => onGenreSelect(item.id)}
                           onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                 e.preventDefault();
                                 onGenreSelect(item.id);
                              }
                           }}
                           role="button"
                           tabIndex={0}
                           className={`browse-filter-row ${genreActiveIndex === item.id ? "browse-filter-row-active" : ""}`}
                        >
                           <img
                              loading="lazy"
                              width={36}
                              height={36}
                              src={item.image_background}
                              alt=""
                              className="browse-filter-thumb"
                           />
                           <span className="min-w-0 flex-1 text-left text-[13px] font-semibold leading-snug text-text">
                              {item.name}
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-borderTheme pt-3">
                     <button type="button" onClick={onShowMore} className="zog-btn zog-btn-primary text-xs">
                        Show more
                     </button>
                     {displayedGenres > 5 && (
                        <button type="button" onClick={onShowLess} className="zog-btn text-xs">
                           Show less
                        </button>
                     )}
                     </div>
                  </CollapsibleSection>
               </div>

               <div className="zog-sidebar-divider mt-2 shrink-0" />

               <div className="flex min-h-0 flex-1 flex-col pb-2">
                  <CollapsibleSection title="Platforms" variant="browse">
                     <label className="sr-only" htmlFor="sidebar-platform-search">
                        Search platforms
                     </label>
                     <input
                        id="sidebar-platform-search"
                        type="search"
                        placeholder="Search platforms…"
                        value={platformSearch}
                        onChange={(e) => setPlatformSearch(e.target.value)}
                        className="zog-sidebar-search mb-2"
                        autoComplete="off"
                     />
                     <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border border-borderTheme/60 bg-background/40">
                     {visiblePlatforms.map((item) => (
                        <div
                           key={item.id}
                           onClick={() => onPlatformSelect(item.id)}
                           onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                 e.preventDefault();
                                 onPlatformSelect(item.id);
                              }
                           }}
                           role="button"
                           tabIndex={0}
                           className={`browse-filter-row ${platformActiveIndex === item.id ? "browse-filter-row-active" : ""}`}
                        >
                           <img
                              loading="lazy"
                              width={36}
                              height={36}
                              src={item.image_background}
                              alt=""
                              className="browse-filter-thumb"
                           />
                           <span className="min-w-0 flex-1 text-left text-[13px] font-semibold leading-snug text-text">
                              {item.name}
                           </span>
                        </div>
                     ))}
                     </div>
                     <div className="mt-3 flex flex-wrap gap-2 border-t border-borderTheme pt-3">
                        <button type="button" onClick={onShowMorePlatforms} className="zog-btn zog-btn-primary text-xs">
                           Show more
                        </button>
                        {displayedPlatforms > 5 && (
                           <button type="button" onClick={onShowLessPlatforms} className="zog-btn text-xs">
                              Show less
                           </button>
                        )}
                     </div>
                  </CollapsibleSection>
               </div>
            </div>

            <div className="mt-auto shrink-0">
               <div className="zog-sidebar-divider mt-4" />

               <div className="px-3 pb-1 pt-1">
                  <p className="zog-sidebar-section-label">Catalog sort</p>
                  <p className="mb-2 text-[11px] leading-snug text-muted">RAWG — applies to the game grid</p>
                  <div className="grid grid-cols-2 gap-1.5">
                     {ORDERING_OPTIONS.map((opt) => (
                        <button
                           key={opt.value}
                           type="button"
                           onClick={() => handleOrderingClick(opt.value)}
                           className={`zog-sidebar-pill ${selectedOrdering === opt.value ? "zog-sidebar-pill-active" : ""}`}
                        >
                           {opt.label}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="zog-sidebar-divider mt-4" />

               <div className="px-3 pb-2 pt-1">
                  <div className="mb-2 flex items-center gap-2">
                     <SiTwitch className="h-4 w-4 shrink-0 text-[#9146FF]" aria-hidden />
                     <p className="zog-sidebar-section-label mb-0">Trending on Twitch</p>
                  </div>
                  <p className="mb-2 text-[11px] leading-snug text-muted">Helix — top categories being streamed</p>
                  {twitchTopGames.length === 0 ? (
                     <p className="rounded-lg border border-borderTheme/60 bg-primary/40 px-2 py-2 text-xs text-muted">
                        Live categories unavailable.
                     </p>
                  ) : (
                     <ul className="zog-twitch-chips zog-sidebar-panel-scroll space-y-1">
                        {twitchTopGames.slice(0, 5).map((game) => (
                           <li key={game.id}>
                              <Link
                                 to={`/streams/${game.id}`}
                                 className="zog-twitch-chip group flex items-center gap-2 rounded-lg border border-borderTheme/50 bg-primary/30 p-1.5 transition-colors hover:border-[#9146FF]/50 hover:bg-[#9146FF]/10"
                              >
                                 {game.box_art_url ? (
                                    <img
                                       src={game.box_art_url.replace("{width}", "52").replace("{height}", "72")}
                                       alt=""
                                       width={28}
                                       height={40}
                                       className="h-10 w-7 shrink-0 rounded object-cover"
                                    />
                                 ) : (
                                    <span className="flex h-10 w-7 shrink-0 items-center justify-center rounded bg-secondary text-[10px] text-muted">
                                       —
                                    </span>
                                 )}
                                 <span className="min-w-0 flex-1 truncate text-left text-[12px] font-semibold leading-tight text-text group-hover:text-[#9146FF]">
                                    {game.name}
                                 </span>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </div>
         </div>
      </aside>
   );
};

NavigationSidebar.propTypes = {
   genreList: PropTypes.arrayOf(PropTypes.object).isRequired,
   displayedGenres: PropTypes.number.isRequired,
   genreActiveIndex: PropTypes.number.isRequired,
   onShowMore: PropTypes.func.isRequired,
   onShowLess: PropTypes.func.isRequired,
   onGenreSelect: PropTypes.func.isRequired,
   platformList: PropTypes.arrayOf(PropTypes.object).isRequired,
   displayedPlatforms: PropTypes.number.isRequired,
   platformActiveIndex: PropTypes.number.isRequired,
   onShowMorePlatforms: PropTypes.func.isRequired,
   onShowLessPlatforms: PropTypes.func.isRequired,
   onPlatformSelect: PropTypes.func.isRequired,
   twitchTopGames: PropTypes.arrayOf(PropTypes.object).isRequired,
   selectedOrdering: PropTypes.string.isRequired,
   onOrderingChange: PropTypes.func.isRequired,
};

export default NavigationSidebar;
