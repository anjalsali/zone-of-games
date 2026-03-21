import { useState, useEffect, useCallback } from "react";
import rawgApi from "../services/rawgApi";
import useGameGridPageSize from "../hooks/useGameGridPageSize";

import NavigationSidebar from "../components/NavigationSidebar";
import MainContent from "../components/MainContent";

const Home = () => {
   const [allGamesByGenreIdAndPlatformId, setAllGamesByGenreIdAndPlatformId] = useState([]);
   const [randomGames, setRandomGames] = useState({});
   const [error, setError] = useState(null);

   const [selectedGenreId, setSelectedGenreId] = useState(4);
   const [selectedPlatformId, setSelectedPlatformId] = useState(4);
   const [currentPage, setCurrentPage] = useState(1);

   const [genreList, setGenreList] = useState([]);
   const [displayedGenres, setDisplayedGenres] = useState(10);
   const [genreActiveIndex, setGenreActiveIndex] = useState(4);

   const [platformList, setPlatformList] = useState([]);
   const [displayedPlatforms, setDisplayedPlatforms] = useState(10);
   const [platformActiveIndex, setPlatformActiveIndex] = useState(4);

   const [selectedGenreName, setSelectedGenreName] = useState("");
   const [selectedPlatformName, setSelectedPlatformName] = useState("");

   const gridPageSize = useGameGridPageSize();

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

   const fetchGamesAndLists = useCallback(async () => {
      try {
         const [gamesResponse, genreListResponse, platformListResponse] = await Promise.all([
            rawgApi.getGamesByGenreIdAndPlatformId(selectedGenreId, selectedPlatformId, currentPage, gridPageSize),
            rawgApi.getGenreList,
            rawgApi.getPlatformList,
         ]);

         // Check if the response status is okay (200)
         if (gamesResponse.status === 200 && genreListResponse.status === 200 && platformListResponse.status === 200) {
            setAllGamesByGenreIdAndPlatformId(gamesResponse.data.results);
            setGenreList(genreListResponse.data.results);
            setPlatformList(platformListResponse.data.results);

            // Get selected genre and platform names
            const selectedGenre = genreListResponse.data.results.find((genre) => genre.id === selectedGenreId);
            const selectedPlatform = platformListResponse.data.results.find((platform) => platform.id === selectedPlatformId);

            setSelectedGenreName(selectedGenre ? selectedGenre.name : "");
            setSelectedPlatformName(selectedPlatform ? selectedPlatform.name : "");
         } else {
            // Handle the case where the page doesn't exist
            handleApiError(null, "Page not found");
         }
      } catch (error) {
         handleApiError(error, "Error fetching data");
      }
   }, [selectedGenreId, selectedPlatformId, currentPage, gridPageSize, handleApiError]);

   useEffect(() => {
      fetchGamesAndLists();
   }, [fetchGamesAndLists]);

   const handleShowMore = (setDisplayed, currentCount) => {
      setDisplayed(currentCount + 5);
   };

   const handleShowLess = (setDisplayed, currentCount) => {
      setDisplayed(Math.max(currentCount - 5, 5));
   };

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
            displayedGenres={displayedGenres}
            genreActiveIndex={genreActiveIndex}
            onShowMore={() => handleShowMore(setDisplayedGenres, displayedGenres)}
            onShowLess={() => handleShowLess(setDisplayedGenres, displayedGenres)}
            onGenreSelect={(genreId) => handleSelect(setSelectedGenreId, setGenreActiveIndex, genreId)}
            platformList={platformList}
            displayedPlatforms={displayedPlatforms}
            platformActiveIndex={platformActiveIndex}
            onShowMorePlatforms={() => handleShowMore(setDisplayedPlatforms, displayedPlatforms)}
            onShowLessPlatforms={() => handleShowLess(setDisplayedPlatforms, displayedPlatforms)}
            onPlatformSelect={(platformId) => handleSelect(setSelectedPlatformId, setPlatformActiveIndex, platformId)}
         />

         {/* Main Content */}
         <MainContent
            allGamesByGenreIdAndPlatformId={allGamesByGenreIdAndPlatformId}
            randomGames={randomGames}
            selectedGenreName={selectedGenreName}
            selectedPlatformName={selectedPlatformName}
            currentPage={currentPage}
            onPrevPage={() => handlePageChange(currentPage - 1)}
            onNextPage={() => handlePageChange(currentPage + 1)}
         />
      </div>
   );
};

export default Home;
