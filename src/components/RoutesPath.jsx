/* eslint-disable react-refresh/only-export-components -- route table exports lazy page modules */
import { lazy } from "react";

// Pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const TopRatedGames = lazy(() => import("../pages/games/top"));
const DisplayGameInfo = lazy(() => import("../pages/games/DisplayGameInfo"));
const TopGamesStreaming = lazy(() => import("../pages/streams"));
const ErrorPage = lazy(() => import("../pages/404"));

const DisplayMostViewedStreams =
lazy(() => import("../pages/streams/DisplayMostViewedStreams"));

const DisplayStreamsByGame =
lazy(() => import("../pages/streams/DisplayStreamsByGame"));


// Page path
const routes = [
   { path: "/", component: Home },
   { path: "/about", component: About },
   { path: "/Contact", component: Contact },
   { path: "/games/top", component: TopRatedGames },
   { path: "/games/:gId", component: DisplayGameInfo },
   { path: "/streams/", component: TopGamesStreaming },
   { path: "/streams/most-viewed", component: DisplayMostViewedStreams },
   { path: "/streams/:gameId", component: DisplayStreamsByGame },
   { path: "*", component: ErrorPage },
];

export default routes;
