import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

// Icons
import { FaXbox, FaPlaystation, FaWindows, FaApple, FaLink, FaStarHalfAlt, FaAndroid, FaLinux } from "react-icons/fa";
import { GiJoystick } from "react-icons/gi";
import { SiNintendoswitch, SiNintendo } from "react-icons/si";
import { RiMacbookLine } from "react-icons/ri";
import { FcRating } from "react-icons/fc";

// Components
import GamePageStreams from "../../components/GamePageStreams";

// API
import rawgApi from "../../services/rawgApi";
import youtubeAPI from "../../services/youtubeAPI";

const DisplayGameInfo = () => {
   const { gId } = useParams();
   const [gameData, setGameData] = useState(null);
   const [error, setError] = useState(null);
   const [showFullDescription, setShowFullDescription] = useState(false);
   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
   const [trailerUrl, setTrailerUrl] = useState(null);

   const playerConfig = {
      youtube: {
         playerVars: {
            showinfo: 0,
            modestbranding: 1,
         },
      },
   };

   useEffect(() => {
      const fetchGameData = async () => {
         try {
            const response = await rawgApi.getGameData(gId);

            if (response.data) {
               setGameData(response.data);
               fetchGameTrailer(response.data.name);
            } else {
               handleInvalidApiResponse(response);
            }
         } catch (error) {
            handleFetchError();
         }
      };

      fetchGameData();
   }, [gId]);

   const fetchGameTrailer = async (gameName) => {
      try {
         const trailerUrl = await youtubeAPI.getGameTrailer(gameName);
         setTrailerUrl(trailerUrl);
      } catch (error) {
         console.error("Error fetching game trailer:", error);
      }
   };

   const handleInvalidApiResponse = (response) => {
      setError("Invalid response structure from the API");
      console.error("Invalid response structure from the API", response);
   };

   const handleFetchError = () => {
      setError("Failed to fetch game data");
      console.error("Failed to fetch game data");
   };

   const handleVideoPlay = () => {
      setIsVideoPlaying(true);
   };

   const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
   };

   const renderLink = (text, href) => (
      <p className="mt-2 text-base md:text-lg">
         <a
            className="font-medium text-accent underline-offset-4 transition-colors hover:text-info hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
         >
            {text}
         </a>
      </p>
   );

   const formatReleaseDate = (dateString) => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
   };

   // Helper function to render platform icons
   const renderPlatformIcon = (platformName) => {
      switch (platformName) {
         case "Apple Macintosh":
            return <RiMacbookLine />;
         case "Xbox":
            return <FaXbox />;
         case "Android":
            return <FaAndroid />;
         case "Linux":
            return <FaLinux />;
         case "PlayStation":
            return <FaPlaystation />;
         case "PC":
            return <FaWindows />;
         case "macOS":
            return <FaApple />;
         case "Nintendo Switch":
            return <SiNintendoswitch />;
         case "Nintendo":
            return <SiNintendo />;
         case "Xbox Series X":
            return <GiJoystick />;
         case "Xbox One":
            return <FaXbox />;
         default:
            // Fallback to text if no icon is available
            return <span>{platformName}</span>;
      }
   };

   if (error) {
      return (
         <div className="flex justify-center p-6 text-text">
            <div className="zog-card max-w-lg px-8 py-6 text-center">
               <p className="text-lg font-semibold text-error">Error: {error}</p>
            </div>
         </div>
      );
   }

   if (!gameData) {
      return (
         <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16" role="status">
            <div className="relative h-12 w-12">
               <span className="absolute inset-0 rounded-full border-2 border-borderTheme/40" />
               <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accent/40" />
            </div>
            <span className="text-sm font-medium text-muted">Loading…</span>
         </div>
      );
   }

   return (
      <div className="relative overflow-hidden text-text">
         <div className="pointer-events-none absolute inset-0 -z-10">
            <img
               className="h-[min(55vh,480px)] w-full object-cover opacity-40"
               style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)" }}
               src={gameData.background_image}
               alt=""
               aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
         </div>

         <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-12 sm:px-6">
            <div className="zog-glass mb-12 w-full max-w-3xl rounded-3xl px-6 py-10 text-center shadow-glow-sm">
               <h1 className="mb-4 bg-gradient-to-r from-text to-accent bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                  {gameData.name}
               </h1>
               <p className="text-muted">Released {formatReleaseDate(gameData.released)}</p>
               <p className="mt-3 flex items-center justify-center gap-2 text-lg font-bold text-text">
                  <FaStarHalfAlt alt="The number of ratings" className="text-accent" /> {gameData.rating} / {gameData.rating_top}
               </p>
            </div>

            <div className="flex w-full flex-col gap-10 md:flex-row md:gap-12">
               <div className="md:w-1/2">
                  <div className="zog-card mb-6 overflow-hidden rounded-2xl border-accent/30">
                     <img
                        className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        src={gameData.background_image}
                        alt={gameData.name}
                     />
                  </div>
                  <div className="zog-card overflow-hidden rounded-2xl border-accent/30">
                     <ReactPlayer
                        url={trailerUrl}
                        width="100%"
                        height="500px"
                        controls
                        onPlay={handleVideoPlay}
                        config={playerConfig}
                        style={{ opacity: isVideoPlaying ? 1 : 0.5, transition: "opacity 0.5s" }}
                     />
                  </div>
               </div>

               <div className="zog-glass rounded-3xl p-6 md:w-1/2 md:p-8">
                  <div className="mb-8">
                     <h2 className="mb-3 text-xl font-bold text-text">Game Description</h2>
                     <p className={`leading-relaxed text-muted ${showFullDescription ? "whitespace-pre-line" : "line-clamp-3"}`}>
                        {gameData.description_raw}
                     </p>
                     <button
                        type="button"
                        className="mt-3 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                        onClick={toggleDescription}
                     >
                        {showFullDescription ? "Show Less" : "Show More"}
                     </button>
                  </div>

                  <div className="mb-8">
                     <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-text">
                        <FcRating alt="MetaCritic Rating" /> Metacritic Score: {gameData.metacritic}
                     </h3>
                     {renderLink("Metacritic URL", gameData.metacritic)}
                  </div>

                  <div className="mb-8">
                     <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-text">
                        <FaLink className="text-accent" />
                        Additional Links
                     </h3>
                     {renderLink("Game Website", gameData.website)}
                     {renderLink("Reddit", gameData.reddit_url)}
                  </div>

                  <div className="mb-8">
                     <h3 className="mb-3 text-lg font-bold text-text">Developers</h3>
                     <div className="flex flex-wrap gap-2">
                        {gameData.developers.map((dev) => (
                           <span key={dev.id} className="rounded-lg bg-secondary/80 px-3 py-1 text-sm text-text">
                              {dev.name}
                           </span>
                        ))}
                     </div>
                  </div>

                  <div className="mb-8">
                     <h3 className="mb-3 text-lg font-bold text-text">Genres</h3>
                     <div className="flex flex-wrap gap-3">
                        {gameData.genres.map((genre) => (
                           <div key={genre.id} className="flex items-center gap-2 rounded-xl border border-borderTheme/40 bg-secondary/50 px-3 py-2">
                              <img src={genre.image_background} alt="" className="h-8 w-8 rounded-lg object-cover" />
                              <p className="text-sm font-medium">{genre.name}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="mb-8">
                     <h3 className="mb-3 text-lg font-bold text-text">Tags</h3>
                     <div className="flex flex-wrap gap-2">
                        {gameData.tags.map((tag) => (
                           <span key={tag.id} className="rounded-full border border-borderTheme/50 px-3 py-1 text-xs font-medium text-muted">
                              {tag.name}
                           </span>
                        ))}
                     </div>
                  </div>

                  <div className="mb-4">
                     <h3 className="mb-3 text-lg font-bold text-text">Platforms</h3>
                     <div className="flex flex-wrap gap-4 text-2xl text-accent">
                        {gameData.parent_platforms.map((platform, index) => (
                           <span key={index} className="transition-transform duration-200 hover:scale-110">
                              {renderPlatformIcon(platform.platform.name)}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-16 w-full rounded-3xl border border-borderTheme/30 bg-primary/30 p-4 shadow-xl backdrop-blur-sm sm:p-6">
               <GamePageStreams gameName={gameData.name} />
            </div>
         </div>
      </div>
   );
};

export default DisplayGameInfo;
