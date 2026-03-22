import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import LinksSidebar from "../../components/LinksSidebar";
import ScrollReveal from "../../components/ScrollReveal";
import twitchApi from "../../services/twitchApi";
import useSyncedMainColumnHeight from "../../hooks/useSyncedMainColumnHeight";
import "../../assets/styles/twitch.css";

const DisplayStreamsByGame = ({ limit }) => {
    const [mainColumnEl, setMainColumnEl] = useState(null);
    const mainColumnHeightPx = useSyncedMainColumnHeight(mainColumnEl);
    const isHeightLocked =
        typeof mainColumnHeightPx === "number" && mainColumnHeightPx > 0;
    const { gameId } = useParams();
    const [twitchTopStreams, setTwitchTopStreams] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);
    const [gameName, setGameName] = useState("");
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchTwitchTopStreams = async () => {
            if (!gameId) {
                setFetchError("Missing game ID in URL.");
                setTwitchTopStreams([]);
                return;
            }
            setFetchError(null);
            const first = Math.min(Math.max(1, limit ?? 24), 100);
            try {
                const response = await twitchApi.getTwitchStreams({
                    params: {
                        game_id: gameId,
                        first,
                    },
                });
                const rows = response.data.data ?? [];
                setTwitchTopStreams(rows);
                setGameName(rows[0]?.game_name || "");
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
                setGameName("");
            }
        };
        fetchTwitchTopStreams();
    }, [gameId, limit]);

    const handleThumbnailClick = (stream) => {
        setSelectedStream(stream);
    };

    const streamChannel = (stream) => stream.user_login || stream.user_name;

    return (
        <div className="flex w-full flex-col md:flex-row md:items-start">
            <aside
                className={`zog-store-sidebar hidden w-[min(300px,92vw)] max-w-[min(300px,92vw)] shrink-0 text-text md:flex md:min-h-0 md:flex-col ${
                    isHeightLocked ? "overflow-hidden" : "md:self-stretch"
                }`}
                style={
                    isHeightLocked
                        ? { height: mainColumnHeightPx, maxHeight: mainColumnHeightPx }
                        : undefined
                }
            >
                <ScrollReveal className="flex h-full min-h-0 flex-col py-3 pr-2" delay={40}>
                    <LinksSidebar />
                </ScrollReveal>
            </aside>
            <div
                ref={setMainColumnEl}
                className="min-w-0 flex-1 border-borderTheme md:self-start md:border-l md:pl-4 lg:pl-5"
            >
                <ScrollReveal className="py-1 pr-0 sm:pr-1" delay={90}>
                    <h2 className="zog-section-title">
                        Most viewed Live Streams on Twitch — {gameName || "…"}
                    </h2>
                    {fetchError && (
                        <div
                            className="mb-4 rounded-xl border border-error/40 bg-error/10 px-4 py-3 text-center text-sm text-error"
                            role="alert"
                        >
                            {fetchError}
                        </div>
                    )}
                    {!fetchError && twitchTopStreams.length === 0 && gameId && (
                        <p className="mb-4 rounded-xl border border-borderTheme/50 bg-secondary/50 px-6 py-4 text-center text-muted">
                            No one is live for this game on Twitch right now.
                        </p>
                    )}
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
                </ScrollReveal>
            </div>
        </div>
    );
}

DisplayStreamsByGame.propTypes = {
   limit: PropTypes.number,
};

export default DisplayStreamsByGame;
