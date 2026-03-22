import { createContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/** Mutable scroll direction for scroll-driven reveals (read at intersection time; no re-renders). */
export const ScrollMotionContext = createContext(null);

export const ScrollMotionProvider = ({ children }) => {
   const directionRef = useRef("down");
   const lastY = useRef(0);

   useEffect(() => {
      lastY.current = window.scrollY;
      const handleScroll = () => {
         const y = window.scrollY;
         directionRef.current = y > lastY.current ? "down" : "up";
         lastY.current = y;
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return <ScrollMotionContext.Provider value={{ directionRef }}>{children}</ScrollMotionContext.Provider>;
};

ScrollMotionProvider.propTypes = {
   children: PropTypes.node.isRequired,
};
