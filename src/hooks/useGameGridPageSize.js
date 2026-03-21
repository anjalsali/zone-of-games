import { useState, useEffect } from "react";

/**
 * Matches `RawgGamesByGenreAndPlatformId` grid:
 * 1 / 2 / 3 / 4 columns (md+) → wider cards so stats row fits on one line.
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
   const [pageSize, setPageSize] = useState(() => getGridColumns() * 3);

   useEffect(() => {
      const handleResize = () => {
         setPageSize(getGridColumns() * 3);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return pageSize;
};

export default useGameGridPageSize;
