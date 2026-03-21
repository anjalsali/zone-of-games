import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import twitchApi from "../services/twitchApi";
import "../assets/styles/twitch.css";

const TwitchTopStreams = ({ gameId, limit }) => {
    const [twitchTopStreams, setTwitchTopStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);

    useEffect(() => {
        fetchTwitchTopStreams(gameId, limit);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps -- mount-only fetch preserves original API usage

    const fetchTwitchTopStreams = async (gameId, limit = 100) => {
        try {
            const response = await twitchApi.getTwitchStreams({
                params: {
                    game_id: gameId,
                    first: limit,
                    sort: "viewers",
                },
            });
            setTwitchTopStreams(response.data.data);
        } catch (error) {
            console.error("Error fetching twitch streams:", error);
        }
    };

    const handleThumbnailClick = (stream) => {
        setSelectedStream(stream);
    };

    return (
        <div className="pb-4 pt-1">
            <h2 className="zog-section-title">
                Top 100 Most viewed Live Streams on Twitch
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
                                        className="drop-shadow-lg"
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
    );
}

TwitchTopStreams.propTypes = {
   gameId: PropTypes.string,
   limit: PropTypes.number,
};

export default TwitchTopStreams;
