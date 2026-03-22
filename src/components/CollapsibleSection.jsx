import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaMinus } from "react-icons/fa";

const CollapsibleSection = ({ title, children, variant = "default" }) => {
   const [isCollapsed, setIsCollapsed] = useState(false);

   const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         handleToggleCollapse();
      }
   };

   const isBrowse = variant === "browse";

   return (
      <>
         <div
            role="button"
            tabIndex={0}
            className={
               isBrowse
                  ? "mb-0 flex shrink-0 cursor-pointer select-none items-center justify-between gap-2 border-b border-borderTheme py-2.5 pl-1 pr-0 transition-colors hover:bg-primary/40"
                  : "mb-4 flex cursor-pointer select-none items-center justify-between gap-3 rounded-xl px-1 py-2 transition-colors hover:bg-primary/50"
            }
            onClick={handleToggleCollapse}
            onKeyDown={handleKeyDown}
            aria-expanded={!isCollapsed}
         >
            <h2
               className={
                  isBrowse
                     ? "text-[11px] font-bold uppercase tracking-[0.16em] text-muted"
                     : "text-xl font-bold tracking-tight text-text md:text-2xl"
               }
            >
               {title}
            </h2>
            <span
               className={
                  isBrowse
                     ? "flex h-7 w-7 shrink-0 items-center justify-center border border-borderTheme text-sm text-accent"
                     : "flex h-9 w-9 items-center justify-center rounded-lg border border-borderTheme/50 text-accent"
               }
               aria-hidden
            >
               {isCollapsed ? <FaPlus /> : <FaMinus />}
            </span>
         </div>
         {!isCollapsed && (
            <div
               className={
                  isBrowse ? "flex min-h-0 flex-1 flex-col pt-1" : ""
               }
            >
               {children}
            </div>
         )}
      </>
   );
};

CollapsibleSection.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.node,
   variant: PropTypes.oneOf(["default", "browse"]),
};

export default CollapsibleSection;
