import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";

const GameBanner = ({ randomGames }) => {
   return (
      <div className="mb-8 w-full max-w-full pt-2">
         <Swiper
            effect={"cube"}
            grabCursor={true}
            loop={true}
            cubeEffect={{
               shadow: true,
               slideShadows: true,
               shadowOffset: 50,
               shadowScale: 0.9,
            }}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
               dynamicBullets: true,
            }}
            modules={[EffectCube, Pagination, Autoplay]}
            className="game-hero-swiper w-full"
         >
            {randomGames.map((game, index) => (
               <SwiperSlide key={game.id} className="relative flex items-center justify-center my-[40px]">
                  <Link to={`/games/${game.id}`} className="relative z-0 block w-full overflow-hidden">
                     <img
                        loading="lazy"
                        width={300}
                        height={400}
                        className="h-[400px] w-full object-cover"
                        src={game.background_image}
                        alt={`Game ${index + 1}`}
                     />
                  </Link>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-900 via-slate-900/75 to-transparent p-5">
                     <h2 className="text-center text-3xl font-black text-white text-pretty sm:text-4xl md:text-5xl">
                        {game.name}
                     </h2>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

GameBanner.propTypes = {
   randomGames: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameBanner;
