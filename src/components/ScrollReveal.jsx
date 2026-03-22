import { useContext, useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { ScrollMotionContext } from "../context/ScrollMotionContext";

/**
 * Fades/slides content into view when it crosses the viewport.
 * Direction follows global scroll: scrolling down → enter from below; scrolling up → enter from above.
 * Default once=true so layout shifts (e.g. images) do not flip isIntersecting off and hide content (opacity 0).
 */
const ScrollReveal = ({
   as: Component = "div",
   children,
   className = "",
   delay = 0,
   threshold = 0.12,
   rootMargin = "0px 0px -32px 0px",
   once = true,
   ...rest
}) => {
   const ctx = useContext(ScrollMotionContext);
   const directionRef = ctx?.directionRef;
   const elRef = useRef(null);
   const [visible, setVisible] = useState(false);
   const [entryFrom, setEntryFrom] = useState("bottom");

   const applyEntryDirection = useCallback(() => {
      const dir = directionRef?.current ?? "down";
      setEntryFrom(dir === "up" ? "top" : "bottom");
   }, [directionRef]);

   useEffect(() => {
      const el = elRef.current;
      if (!el) {
         return undefined;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
         setVisible(true);
         return undefined;
      }

      const io = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               applyEntryDirection();
               setVisible(true);
               if (once) {
                  io.unobserve(el);
               }
            } else if (!once) {
               setVisible(false);
            }
         },
         { threshold, rootMargin }
      );

      io.observe(el);
      return () => io.disconnect();
   }, [threshold, rootMargin, once, applyEntryDirection]);

   const fromClass = entryFrom === "top" ? "scroll-reveal--from-top" : "scroll-reveal--from-bottom";

   return (
      <Component
         ref={elRef}
         className={`scroll-reveal ${fromClass} ${visible ? "scroll-reveal--visible" : ""} ${className}`.trim()}
         style={delay ? { transitionDelay: `${delay}ms` } : undefined}
         {...rest}
      >
         {children}
      </Component>
   );
};

ScrollReveal.propTypes = {
   as: PropTypes.elementType,
   children: PropTypes.node.isRequired,
   className: PropTypes.string,
   delay: PropTypes.number,
   threshold: PropTypes.number,
   rootMargin: PropTypes.string,
   once: PropTypes.bool,
};

export default ScrollReveal;
