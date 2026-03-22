import { useLayoutEffect, useState } from "react";

/**
 * Tracks the main (right) column height so the store sidebar can match it
 * (sidebar never taller than main; bottoms line up above the footer).
 * Pass the DOM node (e.g. from ref callback state), not a ref object.
 */
const useSyncedMainColumnHeight = (element) => {
   const [heightPx, setHeightPx] = useState(null);

   useLayoutEffect(() => {
      if (!element) {
         setHeightPx(null);
         return undefined;
      }

      const read = () => {
         const h = element.offsetHeight;
         setHeightPx(h > 0 ? Math.round(h) : null);
      };

      read();
      const ro = new ResizeObserver(read);
      ro.observe(element);
      window.addEventListener("resize", read);

      return () => {
         ro.disconnect();
         window.removeEventListener("resize", read);
      };
   }, [element]);

   return heightPx;
};

export default useSyncedMainColumnHeight;
