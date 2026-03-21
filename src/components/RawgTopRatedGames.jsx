import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { MdRateReview } from "react-icons/md";
import { FaGripfire } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

const RawgTopRatedGames = ({ gamesList }) => {
   return (
      <div className="pb-4 pt-1">
         <h2 className="zog-section-title">Top Rated Games</h2>
         <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gamesList
               .sort((a, b) => b.rating - a.rating)
               .map((game, index) => index < 24 && (
                  <div
                     key={game.id}
                     className="group zog-card-interactive relative min-w-0 w-full"
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
                     <div className="px-3 py-3.5 sm:px-4 sm:py-4">
                        <div className="mb-2 line-clamp-2 text-base font-bold text-text">{`${game.name}`}</div>
                        <div className="flex flex-nowrap items-center justify-between gap-1.5 text-[0.6875rem] leading-none sm:justify-center sm:gap-2 sm:text-xs md:gap-3">
                           <p className="flex shrink-0 items-center gap-0.5 tabular-nums text-muted sm:gap-1">
                              <FaStarHalfAlt className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                              <span>{game.rating}</span>
                           </p>
                           <p className="flex shrink-0 items-center gap-0.5 tabular-nums text-muted sm:gap-1">
                              <MdRateReview className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                              <span>{game.reviews_count}</span>
                           </p>
                           <p className="flex shrink-0 items-center gap-0.5 tabular-nums text-muted sm:gap-1">
                              <FaGripfire className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
                              <span>{game.suggestions_count}</span>
                           </p>
                        </div>
                     </div>
                  </div>
               )
               )}
         </div>
      </div>
   );
};

RawgTopRatedGames.propTypes = {
   gamesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RawgTopRatedGames;
