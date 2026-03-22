import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import rawgApi from "../services/rawgApi";
import twitchApi from "../services/twitchApi";
import useGameGridPageSize from "../hooks/useGameGridPageSize";

import NavigationSidebar from "../components/NavigationSidebar";
import MainContent from "../components/MainContent";
import useSyncedMainColumnHeight from "../hooks/useSyncedMainColumnHeight";

const Home = () => {
   const [allGamesByGenreIdAndPlatformId, setAllGamesByGenreIdAndPlatformId] = useState([]);
   const [randomGames, setRandomGames] = useState({});
   const [error, setError] = useState(null);

   const [selectedGenreId, setSelectedGenreId] = useState(4);
   const [selectedPlatformId, setSelectedPlatformId] = useState(4);
   const [currentPage, setCurrentPage] = useState(1);

   const [genreList, setGenreList] = useState([]);
   const [genreActiveIndex, setGenreActiveIndex] = useState(4);

   const [platformList, setPlatformList] = useState([]);
   const [platformActiveIndex, setPlatformActiveIndex] = useState(4);

   const [selectedGenreName, setSelectedGenreName] = useState("");
   const [selectedPlatformName, setSelectedPlatformName] = useState("");
   const [gamesTotalCount, setGamesTotalCount] = useState(0);
   const [gamesHasNextPage, setGamesHasNextPage] = useState(false);
   const [twitchTopGames, setTwitchTopGames] = useState([]);
   const [selectedOrdering, setSelectedOrdering] = useState("-added");
   const skipScrollRef = useRef(true);
   const [mainColumnEl, setMainColumnEl] = useState(null);
   const mainColumnHeightPx = useSyncedMainColumnHeight(mainColumnEl);

   const gridPageSize = useGameGridPageSize();

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

   const handleApiError = useCallback((error, errorMessage) => {
      if (error.response && error.response.status === 404) {
         setError("No more pages available.");
      } else {
         setError(errorMessage);
      }
      console.error(`Error: ${errorMessage}`, error);
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

   const fetchGamesAndLists = useCallback(async () => {
      try {
         const [gamesResponse, genreListResponse, platformListResponse, twitchResponse] = await Promise.all([
            rawgApi.getGamesByGenreIdAndPlatformId(
               selectedGenreId,
               selectedPlatformId,
               currentPage,
               gridPageSize,
               selectedOrdering
            ),
            rawgApi.getGenreList,
            rawgApi.getPlatformList,
            twitchApi.getTwitchTopGames(12).catch(() => ({ data: { data: [] } })),
         ]);

         if (gamesResponse.status === 200 && genreListResponse.status === 200 && platformListResponse.status === 200) {
            setError(null);
            setAllGamesByGenreIdAndPlatformId(gamesResponse.data.results);
            setGamesTotalCount(gamesResponse.data.count ?? 0);
            setGamesHasNextPage(Boolean(gamesResponse.data.next));
            setGenreList(genreListResponse.data.results);
            setPlatformList(platformListResponse.data.results);
            setTwitchTopGames(twitchResponse.data?.data ?? []);

            const selectedGenre = genreListResponse.data.results.find((genre) => genre.id === selectedGenreId);
            const selectedPlatform = platformListResponse.data.results.find((platform) => platform.id === selectedPlatformId);

            setSelectedGenreName(selectedGenre ? selectedGenre.name : "");
            setSelectedPlatformName(selectedPlatform ? selectedPlatform.name : "");
         } else {
            handleApiError(null, "Page not found");
         }
      } catch (error) {
         handleApiError(error, "Error fetching data");
      }
   }, [selectedGenreId, selectedPlatformId, currentPage, gridPageSize, selectedOrdering, handleApiError]);

   useEffect(() => {
      fetchGamesAndLists();
   }, [fetchGamesAndLists]);

   const handleSelect = (setId, setIndex, id) => {
      setId(id);
      setIndex(id);
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   if (error) {
      return (
         <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="zog-card max-w-md px-8 py-10">
               <h1 className="mb-3 text-2xl font-bold text-error md:text-3xl">Error: {error}</h1>
               <p className="text-muted">
                  <a href="/" className="font-semibold text-accent underline-offset-4 hover:underline">
                     Go back to homepage
                  </a>
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="flex w-full flex-col md:flex-row md:items-start">
         {/* Navigation Sidebar — fixed store-standard width on md+ */}
         <NavigationSidebar
            genreList={genreList}
            genreActiveIndex={genreActiveIndex}
            onGenreSelect={(genreId) => handleSelect(setSelectedGenreId, setGenreActiveIndex, genreId)}
            platformList={platformList}
            platformActiveIndex={platformActiveIndex}
            onPlatformSelect={(platformId) => handleSelect(setSelectedPlatformId, setPlatformActiveIndex, platformId)}
            twitchTopGames={twitchTopGames}
            selectedOrdering={selectedOrdering}
            onOrderingChange={setSelectedOrdering}
            mainColumnHeightPx={mainColumnHeightPx}
         />

         {/* Main Content */}
         <MainContent
            ref={setMainColumnEl}
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
      </div>
   );
};

export default Home;
