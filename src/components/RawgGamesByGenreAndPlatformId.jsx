import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { MdRateReview } from "react-icons/md";
import { FaGripfire } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

const RawgGamesByGenreAndPlatformId = ({
   gamesByGenreAndPlatformList,
   genreName,
   platformName }) => {

   const [gamesList, setGamesList] = useState([]);

   useEffect(() => {
      setGamesList(gamesByGenreAndPlatformList);
   }, [gamesByGenreAndPlatformList]);

   return (
      <div className="pb-4 pt-1">
         <h2 className="zog-section-title">
            {platformName ? "" : "Genre — "}
            {platformName} — {genreName} Games
         </h2>

         <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {gamesList.map((game) => (
               <div
                  key={game.id}
                  className="group zog-card-interactive relative w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-16px)] xl:w-[calc(20%-16px)]"
               >
                  <Link to={`/games/${game.id}`} className="block overflow-hidden">
                     <img
                        loading="lazy"
                        width={100}
                        height={40}
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={game.short_screenshots[0].image}
                        alt={game.name}
                     />
                  </Link>
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-borderTheme/40 bg-background/90 px-2 py-1 text-xs font-bold text-text shadow-md backdrop-blur-sm">
                     <FcRating alt="MetaCritic Rating" /> {game.metacritic}
                  </div>
                  <div className="px-4 py-4">
                     <div className="mb-2 line-clamp-2 text-base font-bold text-text">{game.name}</div>
                     <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
                        <p className="flex items-center gap-1 text-muted">
                           <FaStarHalfAlt alt="The number of ratings" /> {game.rating}
                        </p>
                        <p className="flex items-center gap-1 text-muted">
                           <MdRateReview alt="The number of reviews" /> {game.reviews_count}
                        </p>
                        <p className="flex items-center gap-1 text-muted">
                           <FaGripfire alt="Suggestions" /> {game.suggestions_count}
                        </p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

RawgGamesByGenreAndPlatformId.propTypes = {
   gamesByGenreAndPlatformList: PropTypes.arrayOf(PropTypes.object).isRequired,
   genreName: PropTypes.string.isRequired,
   platformName: PropTypes.string.isRequired,
};

export default RawgGamesByGenreAndPlatformId;
