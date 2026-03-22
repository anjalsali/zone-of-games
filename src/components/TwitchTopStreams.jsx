import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import twitchApi from "../services/twitchApi";
import { useTwitchStreamsGridPageSize } from "../hooks/useTwitchGridPageSize";
import GamePagination from "./GamePagination";
import "../assets/styles/twitch.css";

const TwitchTopStreams = ({ gameId, limit }) => {
   const [twitchTopStreams, setTwitchTopStreams] = useState([]);
   const [selectedStream, setSelectedStream] = useState(null);
   const [fetchError, setFetchError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const pageSize = useTwitchStreamsGridPageSize();

   useEffect(() => {
      const fetchTwitchTopStreams = async () => {
         setFetchError(null);
         const first = Math.min(Math.max(1, limit ?? 100), 100);
         const params = { first };
         if (gameId) {
            params.game_id = gameId;
         }
         try {
            const response = await twitchApi.getTwitchStreams({ params });
            setTwitchTopStreams(response.data.data ?? []);
         } catch (error) {
            console.error("Error fetching twitch streams:", error);
            const status = error.response?.status;
            const msg =
               status === 401
                  ? "Twitch API rejected the token (401). Generate a new app access token and update VITE_TWITCH_OAUTH_TOKEN in .env."
                  : status === 403
                    ? "Twitch API access denied (403). Check your Client ID and token scopes."
                    : error.response?.data?.message || error.message || "Could not load Twitch streams.";
            setFetchError(msg);
            setTwitchTopStreams([]);
         }
      };
      fetchTwitchTopStreams();
   }, [gameId, limit]);

   const totalCount = twitchTopStreams.length;
   const totalPages = useMemo(() => Math.max(1, Math.ceil(totalCount / pageSize)), [totalCount, pageSize]);

   const paginatedStreams = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      return twitchTopStreams.slice(start, start + pageSize);
   }, [twitchTopStreams, currentPage, pageSize]);

   useEffect(() => {
      setCurrentPage(1);
   }, [gameId, limit, twitchTopStreams.length]);

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [currentPage, totalPages]);

   const handleThumbnailClick = (stream) => {
      setSelectedStream(stream);
   };

   const streamChannel = (stream) => stream.user_login || stream.user_name;

   const handlePageChange = (page) => {
      setSelectedStream(null);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <div className="pb-4 pt-1">
         <h2 className="zog-section-title">Top 100 Most viewed Live Streams on Twitch</h2>
         {fetchError && (
            <div
               className="mb-4 rounded-xl border border-error/40 bg-error/10 px-4 py-3 text-center text-sm text-error"
               role="alert"
            >
               {fetchError}
            </div>
         )}
         {!fetchError && twitchTopStreams.length === 0 && (
            <p className="mb-4 rounded-xl border border-borderTheme/50 bg-secondary/50 px-6 py-4 text-center text-muted">
               No live streams returned from Twitch for this view.
            </p>
         )}
         <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {paginatedStreams.map((stream) => (
               <div
                  key={stream.id}
                  className="group zog-card-interactive w-full sm:w-[calc(50%-14px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
               >
                  {selectedStream && selectedStream.id === stream.id ? (
                     <div className="player-wrapper">
                        <ReactPlayer
                           className="react-player"
                           url={`https://www.twitch.tv/${streamChannel(stream)}`}
                           width="100%"
                           height="100%"
                           controls
                           playing
                        />
                     </div>
                  ) : (
                     <div className="thumbnail-container relative w-full cursor-pointer overflow-hidden rounded-t-2xl">
                        {stream.thumbnail_url ? (
                           <img
                              src={stream.thumbnail_url.replace("{width}", "640").replace("{height}", "360")}
                              alt={`Thumbnail for ${streamChannel(stream)}`}
                              width="100%"
                              height="100%"
                              onClick={() => handleThumbnailClick(stream)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleThumbnailClick(stream);
                                 }
                              }}
                              role="button"
                              tabIndex={0}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                           />
                        ) : (
                           <div className="placeholder flex h-full w-full items-center justify-center bg-secondary text-muted">
                              <span>No Thumbnail</span>
                           </div>
                        )}
                        <button
                           type="button"
                           className="play-button twitch-play-btn"
                           onClick={() => handleThumbnailClick(stream)}
                           aria-label={`Play stream from ${streamChannel(stream)}`}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="48"
                              height="48"
                              fill="currentColor"
                              className="drop-shadow-lg"
                           >
                              <path d="M8 5v14l11-7z" />
                           </svg>
                        </button>
                     </div>
                  )}
                  <div className="px-5 py-4">
                     <h3 className="text-lg font-semibold text-text">{stream.user_name || stream.user_login}</h3>
                     <p className="mt-1 text-sm text-muted">Viewers: {stream.viewer_count}</p>
                  </div>
               </div>
            ))}
         </div>
         {!fetchError && totalCount > 0 && totalPages > 1 && (
            <GamePagination
               currentPage={currentPage}
               totalPages={totalPages}
               totalCount={totalCount}
               pageSize={pageSize}
               hasNextPage={currentPage < totalPages}
               onPageChange={handlePageChange}
               resourceName="streams"
            />
         )}
      </div>
   );
};

TwitchTopStreams.propTypes = {
   gameId: PropTypes.string,
   limit: PropTypes.number,
};

export default TwitchTopStreams;
