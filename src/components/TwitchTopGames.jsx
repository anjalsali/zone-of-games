import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import twitchApi from "../services/twitchApi";
import { useTwitchGamesGridPageSize } from "../hooks/useTwitchGridPageSize";
import GamePagination from "./GamePagination";

function TwitchTopGames() {
   const [twitchTopGames, setTwitchTopGames] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const pageSize = useTwitchGamesGridPageSize();

   const totalCount = twitchTopGames.length;
   const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / pageSize)), [totalCount, pageSize]);

   const paginatedGames = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      return twitchTopGames.slice(start, start + pageSize);
   }, [twitchTopGames, currentPage, pageSize]);

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [currentPage, totalPages]);

   useEffect(() => {
      const load = async () => {
         try {
            const response = await twitchApi.getTwitchTopGames(100);
            setTwitchTopGames(response.data.data ?? []);
         } catch (error) {
            console.error("Error fetching top games list from Twitch:", error);
         }
      };
      load();
   }, []);

   const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <div className="pb-4 pt-1">
         <h2 className="zog-section-title">Top Games Streaming on Twitch</h2>
         <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {paginatedGames.map((game) => (
               <div
                  key={game.id}
                  className="group zog-card-interactive w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-16px)] xl:w-[calc(20%-16px)]"
               >
                  <h3 className="line-clamp-2 min-h-[3.5rem] px-4 pb-2 pt-4 text-lg font-bold text-text">
                     {game.name}
                  </h3>
                  <Link to={`/streams/${game.id}`} className="block overflow-hidden px-4 pb-4">
                     <img
                        src={game.box_art_url.replace("{width}", "300").replace("{height}", "400")}
                        alt={game.name}
                        className="h-52 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                     />
                  </Link>
               </div>
            ))}
         </div>
         {totalCount > 0 && totalPages > 1 && (
            <GamePagination
               currentPage={currentPage}
               totalPages={totalPages}
               totalCount={totalCount}
               pageSize={pageSize}
               hasNextPage={currentPage < totalPages}
               onPageChange={handlePageChange}
               resourceName="games"
            />
         )}
      </div>
   );
}

export default TwitchTopGames;
