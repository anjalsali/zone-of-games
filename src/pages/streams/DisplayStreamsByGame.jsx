import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import LinksSidebar from "../../components/LinksSidebar";
import twitchApi from "../../services/twitchApi";
import "../../assets/styles/twitch.css";

const DisplayStreamsByGame = ({ limit }) => {
    const { gameId } = useParams();
    const [twitchTopStreams, setTwitchTopStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);
    const [gameName, setGameName] = useState("");

    useEffect(() => {
        fetchTwitchTopStreams(gameId, limit);
    }, [gameId, limit]);

    const fetchTwitchTopStreams = async (gameId, limit = 24) => {
        try {
            const response = await twitchApi.getTwitchStreams({
                params: {
                    game_id: gameId,
                    first: limit,
                    sort: "viewers",
                },
            });
            setTwitchTopStreams(response.data.data);
            setGameName(response.data.data[0].game_name || "");
        } catch (error) {
            console.error("Error fetching twitch streams:", error);
        }
    };

    const handleThumbnailClick = (stream) => {
        setSelectedStream(stream);
    };

    return (
        <div className="flex w-full flex-col md:flex-row md:items-start">
            <aside className="browse-aside hidden w-60 max-w-[240px] shrink-0 text-text md:block md:min-h-[50vh]">
                <div className="sticky top-14 py-2 pr-2">
                    <LinksSidebar />
                </div>
            </aside>
            <div className="min-w-0 flex-1 border-borderTheme md:border-l md:pl-4 lg:pl-5">
                <div className="py-1 pr-0 sm:pr-1">
                    <h2 className="zog-section-title">
                        Most viewed Live Streams on Twitch — {gameName}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {twitchTopStreams.map((stream) => (
                            <div
                                key={stream.id}
                                className="group zog-card-interactive w-full sm:w-[calc(50%-14px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                            >
                                {selectedStream && selectedStream.id === stream.id ? (
                                    <div className="player-wrapper">
                                        <ReactPlayer
                                            className="react-player"
                                            url={`https://www.twitch.tv/${stream.user_name}`}
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
                                                alt={`Thumbnail for ${stream.user_name}`}
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
                                            aria-label={`Play stream from ${stream.user_name}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="48"
                                                height="48"
                                                fill="currentColor"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                <div className="px-5 py-4">
                                    <h3 className="text-lg font-semibold text-text">{stream.user_name}</h3>
                                    <p className="mt-1 text-sm text-muted">Viewers: {stream.viewer_count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

DisplayStreamsByGame.propTypes = {
   limit: PropTypes.number,
};

export default DisplayStreamsByGame;
