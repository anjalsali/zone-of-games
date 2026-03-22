import { useState } from "react";
import PropTypes from "prop-types";
import NavigationSidebar from "./NavigationSidebar";
import ScrollReveal from "./ScrollReveal";
import useSyncedMainColumnHeight from "../hooks/useSyncedMainColumnHeight";
import { useBrowseSidebar } from "../context/BrowseSidebarContext";

/** Full browse rail + main column; main area height drives sidebar lock (matches previous Home/stream shells). */
const BrowseSidebarLayout = ({ children }) => {
   const {
      genreList,
      platformList,
      twitchTopGames,
      genreActiveIndex,
      platformActiveIndex,
      selectedOrdering,
      onGenreSelect,
      onPlatformSelect,
      onOrderingChange,
   } = useBrowseSidebar();

   const [mainColumnEl, setMainColumnEl] = useState(null);
   const mainColumnHeightPx = useSyncedMainColumnHeight(mainColumnEl);

   return (
      <main className="relative z-0 flex w-full flex-col pl-0 pr-3 pb-12 pt-1 sm:pr-4 md:flex-row md:items-start md:pr-5">
         <ScrollReveal className="shrink-0 md:flex md:shrink-0" delay={40}>
            <NavigationSidebar
               genreList={genreList}
               genreActiveIndex={genreActiveIndex}
               onGenreSelect={onGenreSelect}
               platformList={platformList}
               platformActiveIndex={platformActiveIndex}
               onPlatformSelect={onPlatformSelect}
               twitchTopGames={twitchTopGames}
               selectedOrdering={selectedOrdering}
               onOrderingChange={onOrderingChange}
               mainColumnHeightPx={mainColumnHeightPx}
            />
         </ScrollReveal>
         <div
            ref={setMainColumnEl}
            className="min-w-0 w-full flex-1 border-borderTheme md:self-start md:border-l md:pl-4 lg:pl-5"
         >
            {children}
         </div>
      </main>
   );
};

BrowseSidebarLayout.propTypes = {
   children: PropTypes.node.isRequired,
};

export default BrowseSidebarLayout;
