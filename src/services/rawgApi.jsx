import axios from "axios";

const RAWG_BASE_URL = "https://api.rawg.io/api/";

const axiosCreateRawgApi = axios.create({
   baseURL: RAWG_BASE_URL,
});

const getGenreList = axiosCreateRawgApi.get(
   "/genres?key=" + import.meta.env.VITE_RAWG_API_KEY
);
const getPlatformList = axiosCreateRawgApi.get(
   "/platforms?key=" + import.meta.env.VITE_RAWG_API_KEY
);
const getGamesList = axiosCreateRawgApi.get(
   "/games?key=" + import.meta.env.VITE_RAWG_API_KEY
);
const getSearchAllGames = (query) => axiosCreateRawgApi.get(
   "/games?key=" + import.meta.env.VITE_RAWG_API_KEY +
   "&search=" + query
);
const getGameData = (gId) => axiosCreateRawgApi.get(
   "/games/" + gId +
   "?key=" + import.meta.env.VITE_RAWG_API_KEY
);
const getGamesByGenreIdAndPlatformId = (genreId, platformId, pageNumber, pageSize = 20) => axiosCreateRawgApi.get(
   "/games?key=" + import.meta.env.VITE_RAWG_API_KEY +
   "&genres=" + genreId +
   "&platforms=" + platformId +
   "&page=" + pageNumber +
   "&page_size=" + pageSize
);
const getGamesByPlatform = (platformId) => axiosCreateRawgApi.get(
   "/games?key=" + import.meta.env.VITE_RAWG_API_KEY +
   "&platforms=" + platformId
);

export default {
   getGenreList,
   getPlatformList,
   getGamesList,
   getGameData,
   getGamesByGenreIdAndPlatformId,
   getGamesByPlatform,
   getSearchAllGames,
};
