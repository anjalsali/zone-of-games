import { useState, useEffect } from "react";

const ROWS_PER_PAGE = 5;

/**
 * Matches `RawgGamesByGenreAndPlatformId` grid:
 * 1 / 2 / 3 / 4 columns (md+) → page size = columns × rows so the grid fills evenly.
 */
const getGridColumns = () => {
   if (typeof window === "undefined") {
      return 4;
   }
   const w = window.innerWidth;
   if (w >= 1200) {
      return 4;
   }
   if (w >= 960) {
      return 3;
   }
   if (w >= 768) {
      return 2;
   }
   return 1;
};

const useGameGridPageSize = () => {
   const [pageSize, setPageSize] = useState(() => getGridColumns() * ROWS_PER_PAGE);

   useEffect(() => {
      const handleResize = () => {
         setPageSize(getGridColumns() * ROWS_PER_PAGE);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return pageSize;
};

export default useGameGridPageSize;
