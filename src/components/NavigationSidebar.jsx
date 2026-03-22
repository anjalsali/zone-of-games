import { useMemo, useState, useRef, useLayoutEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SiTwitch } from "react-icons/si";
import { HiChevronRight } from "react-icons/hi2";
import CollapsibleSection from "./CollapsibleSection";
import StoreSidebarNav from "./StoreSidebarNav";

/** Home grid sort options */
const ORDERING_OPTIONS = [
   { value: "-added", label: "Recently added", sub: "Newest listings" },
   { value: "-rating", label: "Highest rated", sub: "By user score" },
   { value: "-metacritic", label: "Metacritic", sub: "By critic score" },
   { value: "-released", label: "New releases", sub: "By release date" },
   { value: "name", label: "Title A–Z", sub: "Alphabetical" },
];

const SCROLL_BOX_CLASS =
   "min-h-0 flex-1 overflow-y-auto overscroll-y-auto [-webkit-overflow-scrolling:touch] touch-pan-y rounded-lg border border-borderTheme/50 bg-background/45";

const useScrollRegionOverflow = (listSignature) => {
   const ref = useRef(null);
   const [hintVisible, setHintVisible] = useState(false);

   const recheck = useCallback(() => {
      const el = ref.current;
      if (!el) {
         return;
      }
      const overflow = el.scrollHeight > el.clientHeight + 2;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      setHintVisible(overflow && !atBottom);
   }, []);

   useLayoutEffect(() => {
      recheck();
      const el = ref.current;
      if (!el) {
         return undefined;
      }
      const ro = new ResizeObserver(() => recheck());
      ro.observe(el);
      const t = window.requestAnimationFrame(() => recheck());
      return () => {
         window.cancelAnimationFrame(t);
         ro.disconnect();
      };
   }, [listSignature, recheck]);

   return { ref, hintVisible, recheck };
};

const NavigationSidebar = ({
   genreList,
   genreActiveIndex,
   onGenreSelect,
   platformList,
   platformActiveIndex,
   onPlatformSelect,
   twitchTopGames,
   selectedOrdering,
   onOrderingChange,
   mainColumnHeightPx,
}) => {
   const [genreSearch, setGenreSearch] = useState("");
   const [platformSearch, setPlatformSearch] = useState("");
   const [genresExpanded, setGenresExpanded] = useState(true);
   const [platformsExpanded, setPlatformsExpanded] = useState(true);
   const bothBrowseCollapsed = !genresExpanded && !platformsExpanded;

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

   const genreListKey = `${filteredGenres.length}:${genreSearch}`;
   const platformListKey = `${filteredPlatforms.length}:${platformSearch}`;

   const genreScroll = useScrollRegionOverflow(genreListKey);
   const platformScroll = useScrollRegionOverflow(platformListKey);

   const handleOrderingClick = (value) => {
      onOrderingChange(value);
   };

   const isHeightLocked =
      typeof mainColumnHeightPx === "number" && mainColumnHeightPx > 0;

   const twitchRows = twitchTopGames.slice(0, 10);

   return (
      <aside
         className={`zog-store-sidebar hidden w-[min(300px,92vw)] max-w-[min(300px,92vw)] shrink-0 text-text md:flex md:min-h-0 md:flex-col ${
            isHeightLocked ? "overflow-hidden" : "md:self-stretch"
         }`}
         style={
            isHeightLocked
               ? { height: mainColumnHeightPx, maxHeight: mainColumnHeightPx }
               : undefined
         }
         aria-label="Game browse sidebar"
      >
         <div className="flex h-full min-h-0 w-full flex-col gap-0 pb-2 pr-2 pt-4">
            {/* Brand */}
            <header className="shrink-0 px-3 pb-3">
               <div className="flex gap-3">
                  <div
                     className="w-1 shrink-0 self-stretch rounded-full bg-accent shadow-[0_0_12px_rgb(var(--color-accent)/0.45)]"
                     aria-hidden
                  />
                  <div className="min-w-0">
                     <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                        Zone of Games
                     </p>
                     <h1 className="mt-0.5 text-lg font-extrabold tracking-tight text-text">Browse</h1>
                  </div>
               </div>
            </header>

            {/* Shortcuts + search hint */}
            <div className="zog-rail-surface mx-2 mb-3 shrink-0 p-2.5">
               <StoreSidebarNav sectionLabel="Navigate" />
            </div>

            {/* Sort */}
            <section
               className="zog-rail-surface mx-2 mb-2 shrink-0 p-3"
               aria-labelledby="zog-rail-sort-heading"
            >
               <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Catalog
               </p>
               <h2 id="zog-rail-sort-heading" className="text-sm font-bold text-text">
                  Sort by
               </h2>
               <p className="mb-2.5 text-[11px] leading-snug text-muted">
                  Changes how games are ordered in the main list.
               </p>
               <ul className="flex flex-col gap-1.5" role="list">
                  {ORDERING_OPTIONS.map((opt) => {
                     const active = selectedOrdering === opt.value;
                     return (
                        <li key={opt.value}>
                           <button
                              type="button"
                              onClick={() => handleOrderingClick(opt.value)}
                              className={`zog-rail-sort-row ${active ? "zog-rail-sort-row-active" : ""}`}
                              aria-pressed={active}
                           >
                              <span className="min-w-0">
                                 <span className="block">{opt.label}</span>
                                 <span className="mt-0.5 block text-[10px] font-medium normal-case tracking-normal text-muted">
                                    {opt.sub}
                                 </span>
                              </span>
                              <HiChevronRight
                                 className={`h-4 w-4 shrink-0 ${active ? "text-accent" : "text-muted"}`}
                                 aria-hidden
                              />
                           </button>
                        </li>
                     );
                  })}
               </ul>
            </section>

            <div className="zog-sidebar-divider mx-2 shrink-0" />

            {/* Genres & platforms */}
            <div
               className={
                  bothBrowseCollapsed
                     ? "flex shrink-0 flex-col px-2 pb-1"
                     : "flex min-h-0 flex-1 flex-col px-2 pb-1"
               }
            >
               <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Filters
               </p>
               <CollapsibleSection
                  title="Genres"
                  variant="browse"
                  onExpandedChange={setGenresExpanded}
               >
                  <label className="sr-only" htmlFor="sidebar-genre-search">
                     Search genres
                  </label>
                  <input
                     id="sidebar-genre-search"
                     type="search"
                     placeholder="Search genres…"
                     value={genreSearch}
                     onChange={(e) => setGenreSearch(e.target.value)}
                     className="zog-sidebar-search mb-2 shrink-0"
                     autoComplete="off"
                  />
                  <div
                     ref={genreScroll.ref}
                     className={SCROLL_BOX_CLASS}
                     onScroll={genreScroll.recheck}
                     aria-label="Genres list"
                  >
                     {filteredGenres.length === 0 ? (
                        <p className="px-2 py-3 text-center text-xs text-muted">No genres match.</p>
                     ) : (
                        filteredGenres.map((item) => (
                           <div
                              key={item.id}
                              role="button"
                              onClick={() => onGenreSelect(item.id)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onGenreSelect(item.id);
                                 }
                              }}
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
                        ))
                     )}
                  </div>
                  {genreScroll.hintVisible && filteredGenres.length > 0 && (
                     <p className="mt-1.5 shrink-0 px-1 text-[10px] leading-tight text-muted">
                        Scroll for more genres
                     </p>
                  )}
               </CollapsibleSection>

               <div className="zog-sidebar-divider my-2 shrink-0" />

               <CollapsibleSection
                  title="Platforms"
                  variant="browse"
                  onExpandedChange={setPlatformsExpanded}
               >
                  <label className="sr-only" htmlFor="sidebar-platform-search">
                     Search platforms
                  </label>
                  <input
                     id="sidebar-platform-search"
                     type="search"
                     placeholder="Search platforms…"
                     value={platformSearch}
                     onChange={(e) => setPlatformSearch(e.target.value)}
                     className="zog-sidebar-search mb-2 shrink-0"
                     autoComplete="off"
                  />
                  <div
                     ref={platformScroll.ref}
                     className={SCROLL_BOX_CLASS}
                     onScroll={platformScroll.recheck}
                     aria-label="Platforms list"
                  >
                     {filteredPlatforms.length === 0 ? (
                        <p className="px-2 py-3 text-center text-xs text-muted">No platforms match.</p>
                     ) : (
                        filteredPlatforms.map((item) => (
                           <div
                              key={item.id}
                              role="button"
                              onClick={() => onPlatformSelect(item.id)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onPlatformSelect(item.id);
                                 }
                              }}
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
                        ))
                     )}
                  </div>
                  {platformScroll.hintVisible && filteredPlatforms.length > 0 && (
                     <p className="mt-1.5 shrink-0 px-1 text-[10px] leading-tight text-muted">
                        Scroll for more platforms
                     </p>
                  )}
               </CollapsibleSection>
            </div>

            {/* Trending streams */}
            <div
               className={
                  bothBrowseCollapsed
                     ? "flex min-h-0 min-w-0 flex-1 flex-col"
                     : "mt-auto shrink-0"
               }
            >
               <div className="zog-sidebar-divider mx-2 mt-2 shrink-0" />

               <div
                  className={`zog-rail-twitch-card mx-2 mt-2 flex min-h-0 min-w-0 flex-col p-3 ${bothBrowseCollapsed ? "flex-1" : ""}`}
               >
                  <div className="mb-2 flex shrink-0 items-start justify-between gap-2">
                     <div>
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                           <SiTwitch className="h-3.5 w-3.5 text-[#9146FF]" aria-hidden />
                           Live
                        </div>
                        <h2 className="text-sm font-bold text-text">Trending on Twitch</h2>
                        <p className="mt-0.5 text-[11px] leading-snug text-muted">
                           Popular games being streamed now.
                        </p>
                     </div>
                  </div>

                  <Link
                     to="/streams/"
                     className="zog-rail-twitch-link mb-2 shrink-0 text-[11px]"
                  >
                     <span>All streams</span>
                     <HiChevronRight className="ml-auto h-4 w-4 shrink-0 opacity-70" aria-hidden />
                  </Link>

                  {twitchTopGames.length === 0 ? (
                     <p className="rounded-lg border border-borderTheme/60 bg-primary/40 px-2 py-2 text-xs text-muted">
                        No trending categories available.
                     </p>
                  ) : (
                     <ul
                        className={`flex flex-col gap-1 ${
                           bothBrowseCollapsed
                              ? "min-h-0 flex-1 overflow-y-auto overscroll-y-auto [-webkit-overflow-scrolling:touch]"
                              : "zog-sidebar-panel-scroll max-h-[min(22vh,9rem)] overflow-y-auto overscroll-y-auto"
                        }`}
                     >
                        {twitchRows.map((game) => (
                           <li key={game.id}>
                              <Link
                                 to={`/streams/${game.id}`}
                                 className="group zog-rail-twitch-link"
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
                                 <span className="min-w-0 flex-1 truncate text-left font-semibold leading-tight text-text transition-colors group-hover:text-[#9146FF]">
                                    {game.name}
                                 </span>
                                 <HiChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
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
   genreActiveIndex: PropTypes.number.isRequired,
   onGenreSelect: PropTypes.func.isRequired,
   platformList: PropTypes.arrayOf(PropTypes.object).isRequired,
   platformActiveIndex: PropTypes.number.isRequired,
   onPlatformSelect: PropTypes.func.isRequired,
   twitchTopGames: PropTypes.arrayOf(PropTypes.object).isRequired,
   selectedOrdering: PropTypes.string.isRequired,
   onOrderingChange: PropTypes.func.isRequired,
   mainColumnHeightPx: PropTypes.number,
};

export default NavigationSidebar;
