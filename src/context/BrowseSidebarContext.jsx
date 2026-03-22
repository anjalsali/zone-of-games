import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import rawgApi from "../services/rawgApi";
import twitchApi from "../services/twitchApi";

const BrowseSidebarContext = createContext(null);

export const BrowseSidebarProvider = ({ children }) => {
   const location = useLocation();
   const navigate = useNavigate();

   const [genreList, setGenreList] = useState([]);
   const [platformList, setPlatformList] = useState([]);
   const [twitchTopGames, setTwitchTopGames] = useState([]);

   const [selectedGenreId, setSelectedGenreId] = useState(4);
   const [selectedPlatformId, setSelectedPlatformId] = useState(4);
   const [genreActiveIndex, setGenreActiveIndex] = useState(4);
   const [platformActiveIndex, setPlatformActiveIndex] = useState(4);
   const [selectedOrdering, setSelectedOrdering] = useState("-added");

   const isHomePath =
      location.pathname === "/" || location.pathname === "";

   const goHomeIfNeeded = useCallback(() => {
      if (!isHomePath) {
         navigate("/");
      }
   }, [isHomePath, navigate]);

   const onGenreSelect = useCallback(
      (genreId) => {
         setSelectedGenreId(genreId);
         setGenreActiveIndex(genreId);
         goHomeIfNeeded();
      },
      [goHomeIfNeeded]
   );

   const onPlatformSelect = useCallback(
      (platformId) => {
         setSelectedPlatformId(platformId);
         setPlatformActiveIndex(platformId);
         goHomeIfNeeded();
      },
      [goHomeIfNeeded]
   );

   const onOrderingChange = useCallback(
      (ordering) => {
         setSelectedOrdering(ordering);
         goHomeIfNeeded();
      },
      [goHomeIfNeeded]
   );

   useEffect(() => {
      const loadLists = async () => {
         try {
            const [genreRes, platformRes, twitchRes] = await Promise.all([
               rawgApi.getGenreList,
               rawgApi.getPlatformList,
               twitchApi.getTwitchTopGames(12).catch(() => ({ data: { data: [] } })),
            ]);
            if (genreRes.status === 200) {
               setGenreList(genreRes.data.results ?? []);
            }
            if (platformRes.status === 200) {
               setPlatformList(platformRes.data.results ?? []);
            }
            setTwitchTopGames(twitchRes.data?.data ?? []);
         } catch (error) {
            console.error("Browse sidebar: failed to load lists", error);
         }
      };
      loadLists();
   }, []);

   const value = useMemo(
      () => ({
         genreList,
         platformList,
         twitchTopGames,
         selectedGenreId,
         selectedPlatformId,
         genreActiveIndex,
         platformActiveIndex,
         selectedOrdering,
         onGenreSelect,
         onPlatformSelect,
         onOrderingChange,
      }),
      [
         genreList,
         platformList,
         twitchTopGames,
         selectedGenreId,
         selectedPlatformId,
         genreActiveIndex,
         platformActiveIndex,
         selectedOrdering,
         onGenreSelect,
         onPlatformSelect,
         onOrderingChange,
      ]
   );

   return <BrowseSidebarContext.Provider value={value}>{children}</BrowseSidebarContext.Provider>;
};

BrowseSidebarProvider.propTypes = {
   children: PropTypes.node.isRequired,
};

export const useBrowseSidebar = () => {
   const ctx = useContext(BrowseSidebarContext);
   if (!ctx) {
      throw new Error("useBrowseSidebar must be used within BrowseSidebarProvider");
   }
   return ctx;
};
