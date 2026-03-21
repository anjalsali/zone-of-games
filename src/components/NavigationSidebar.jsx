import PropTypes from "prop-types";
import CollapsibleSection from "./CollapsibleSection";
import LinksSidebar from "./LinksSidebar";

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
}) => {
   return (
      <aside className="browse-aside hidden w-60 max-w-[240px] shrink-0 text-text md:block md:min-h-[50vh]">
         <div className="sticky top-14 py-2 pr-2">
            <LinksSidebar />
            <div className="browse-divider" />

            <div className="px-1">
               <CollapsibleSection title="Browse by genre" variant="browse">
                  <div className="border border-borderTheme bg-background/50">
                     {genreList.slice(0, displayedGenres).map((item) => (
                        <div
                           key={item.id}
                           onClick={() => {
                              onGenreSelect(item.id);
                           }}
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

            <div className="browse-divider" />

            <div className="px-1">
               <CollapsibleSection title="Browse by platform" variant="browse">
                  <div className="border border-borderTheme bg-background/50">
                     {platformList.slice(0, displayedPlatforms).map((item) => (
                        <div
                           key={item.id}
                           onClick={() => {
                              onPlatformSelect(item.id);
                           }}
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
};

export default NavigationSidebar;
