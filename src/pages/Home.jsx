import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import rawgApi from "../services/rawgApi";
import useGameGridPageSize from "../hooks/useGameGridPageSize";
import { useBrowseSidebar } from "../context/BrowseSidebarContext";

import MainContent from "../components/MainContent";
import ScrollReveal from "../components/ScrollReveal";

const Home = () => {
   const {
      genreList,
      platformList,
      selectedGenreId,
      selectedPlatformId,
      selectedOrdering,
   } = useBrowseSidebar();

   const [allGamesByGenreIdAndPlatformId, setAllGamesByGenreIdAndPlatformId] = useState([]);
   const [randomGames, setRandomGames] = useState({});
   const [error, setError] = useState(null);

   const [currentPage, setCurrentPage] = useState(1);

   const [gamesTotalCount, setGamesTotalCount] = useState(0);
   const [gamesHasNextPage, setGamesHasNextPage] = useState(false);
   const skipScrollRef = useRef(true);

   const gridPageSize = useGameGridPageSize();

   const selectedGenreName = useMemo(() => {
      const g = genreList.find((genre) => genre.id === selectedGenreId);
      return g ? g.name : "";
   }, [genreList, selectedGenreId]);

   const selectedPlatformName = useMemo(() => {
      const p = platformList.find((platform) => platform.id === selectedPlatformId);
      return p ? p.name : "";
   }, [platformList, selectedPlatformId]);

   const totalPages = useMemo(
      () => Math.max(1, Math.ceil((gamesTotalCount || 0) / gridPageSize)),
      [gamesTotalCount, gridPageSize]
   );

   const selectRandomGames = (games, count) => {
      const n = Math.min(count, games.length);
      const copy = [...games];
      const shuffled = copy.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
   };

   const handleApiError = useCallback((err, errorMessage) => {
      if (err?.response && err.response.status === 404) {
         setError("No more pages available.");
      } else {
         setError(errorMessage);
      }
      console.error(`Error: ${errorMessage}`, err);
   }, []);

   useEffect(() => {
      if (allGamesByGenreIdAndPlatformId.length > 0) {
         setRandomGames(selectRandomGames(allGamesByGenreIdAndPlatformId, 10));
      }
   }, [allGamesByGenreIdAndPlatformId]);

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedGenreId, selectedPlatformId, selectedOrdering]);

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [currentPage, totalPages]);

   useEffect(() => {
      if (skipScrollRef.current) {
         skipScrollRef.current = false;
         return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [currentPage]);

   const fetchGames = useCallback(async () => {
      try {
         const gamesResponse = await rawgApi.getGamesByGenreIdAndPlatformId(
            selectedGenreId,
            selectedPlatformId,
            currentPage,
            gridPageSize,
            selectedOrdering
         );

         if (gamesResponse.status === 200) {
            setError(null);
            setAllGamesByGenreIdAndPlatformId(gamesResponse.data.results);
            setGamesTotalCount(gamesResponse.data.count ?? 0);
            setGamesHasNextPage(Boolean(gamesResponse.data.next));
         } else {
            handleApiError(null, "Page not found");
         }
      } catch (err) {
         handleApiError(err, "Error fetching data");
      }
   }, [selectedGenreId, selectedPlatformId, currentPage, gridPageSize, selectedOrdering, handleApiError]);

   useEffect(() => {
      fetchGames();
   }, [fetchGames]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   if (error) {
      return (
         <ScrollReveal className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="zog-card max-w-md px-8 py-10">
               <h1 className="mb-3 text-2xl font-bold text-error md:text-3xl">Error: {error}</h1>
               <p className="text-muted">
                  <a href="/" className="font-semibold text-accent underline-offset-4 hover:underline">
                     Go back to homepage
                  </a>
               </p>
            </div>
         </ScrollReveal>
      );
   }

   return (
      <MainContent
         allGamesByGenreIdAndPlatformId={allGamesByGenreIdAndPlatformId}
         randomGames={randomGames}
         selectedGenreName={selectedGenreName}
         selectedPlatformName={selectedPlatformName}
         currentPage={currentPage}
         totalPages={totalPages}
         totalCount={gamesTotalCount}
         pageSize={gridPageSize}
         hasNextPage={gamesHasNextPage}
         onPageChange={handlePageChange}
      />
   );
};

export default Home;
