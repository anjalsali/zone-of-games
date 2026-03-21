import axios from "axios";

const TWITCH_API_BASE_URL = "https://api.twitch.tv/helix";

/** Helix requires a valid app or user access token; app tokens expire (~60 days) — refresh via Twitch Developer console or client-credentials flow. */
const axiosCreateTwitchApi = axios.create({
   baseURL: TWITCH_API_BASE_URL,
   headers: {
      "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_TWITCH_OAUTH_TOKEN}`,
   },
});
const getTwitchTopGames = axiosCreateTwitchApi.get(
   "/games/top"
);
const getTwitchStreams = (params) => axiosCreateTwitchApi.get(
   "/streams", params
);
const getTwitchGameId = (gameName) => axiosCreateTwitchApi.get(
   "/games?name=" + encodeURIComponent(gameName)
);
const getTwitchStreamsByGameId = (gameId) => axiosCreateTwitchApi.get(
   "/streams?game_id=" + encodeURIComponent(gameId)
);

export default {
   getTwitchTopGames,
   getTwitchStreams,
   getTwitchGameId,
   getTwitchStreamsByGameId,
};
