import { useState, useEffect } from "react";

const ROWS_PER_PAGE = 6;

/**
 * Column counts aligned with TwitchTopGames flex card widths:
 * full → sm → md → lg → xl
 */
const gamesGridColumns = (width) => {
   if (width >= 1280) {
      return 5;
   }
   if (width >= 1024) {
      return 4;
   }
   if (width >= 768) {
      return 3;
   }
   if (width >= 640) {
      return 2;
   }
   return 1;
};

/**
 * Column counts aligned with TwitchTopStreams / DisplayStreamsByGame card widths:
 * full → sm → md → lg (no fifth column)
 */
const streamsGridColumns = (width) => {
   if (width >= 1024) {
      return 4;
   }
   if (width >= 768) {
      return 3;
   }
   if (width >= 640) {
      return 2;
   }
   return 1;
};

export const useTwitchGamesGridPageSize = () => {
   const [pageSize, setPageSize] = useState(() =>
      typeof window !== "undefined" ? gamesGridColumns(window.innerWidth) * ROWS_PER_PAGE : 30
   );

   useEffect(() => {
      const handleResize = () => {
         setPageSize(gamesGridColumns(window.innerWidth) * ROWS_PER_PAGE);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return pageSize;
};

export const useTwitchStreamsGridPageSize = () => {
   const [pageSize, setPageSize] = useState(() =>
      typeof window !== "undefined" ? streamsGridColumns(window.innerWidth) * ROWS_PER_PAGE : 24
   );

   useEffect(() => {
      const handleResize = () => {
         setPageSize(streamsGridColumns(window.innerWidth) * ROWS_PER_PAGE);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return pageSize;
};
