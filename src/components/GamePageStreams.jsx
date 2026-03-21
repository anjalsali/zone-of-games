import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import Loading from "../components/Loading";
import twitchApi from "../services/twitchApi";
import "../assets/styles/twitch.css";

const GamePageStreams = ({ gameName }) => {
    const [streamsByGameId, setStreamsByGameId] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTwitchGameId(gameName);
    }, [gameName]); // eslint-disable-line react-hooks/exhaustive-deps -- fetch chain defined below; gameName is the trigger

    const fetchTwitchGameId = async (gameName) => {
        try {
            const response = await twitchApi.getTwitchGameId(gameName);
            const twitchGameId = response.data.data[0]?.id;
            if (twitchGameId) {
                fetchTwitchStreamsByGameId(twitchGameId);
            }
        } catch (error) {
            console.error("Error fetching twitch game ID:", error);
            setIsLoading(false);
        }
    };

    const fetchTwitchStreamsByGameId = async (twitchGameId) => {
        try {
            const response = await twitchApi.getTwitchStreamsByGameId(twitchGameId);
            setStreamsByGameId(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching twitch streams by game ID:", error);
            setIsLoading(false);
        }
    };

    const handleThumbnailClick = (stream) => {
        setSelectedStream(stream);
    };

    return (
        <div className="text-text">
            <h2 className="zog-section-title">
                Most viewed Live Streams on Twitch — {gameName}
            </h2>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {streamsByGameId.length === 0 ? (
                        <p className="rounded-xl border border-borderTheme/50 bg-secondary/50 px-6 py-4 text-muted">No live streams available.</p>
                    ) : (
                        streamsByGameId.map((stream) => (
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
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

GamePageStreams.propTypes = {
   gameName: PropTypes.string.isRequired,
};

export default GamePageStreams;
