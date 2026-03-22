import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaHouse, FaTrophy } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa";
import { MdViewStream, MdSearch } from "react-icons/md";

const defaultItems = [
   { to: "/", label: "Home", icon: FaHouse },
   { to: "/games/top", label: "Top rated", icon: FaTrophy },
   { to: "/streams/", label: "Streams", icon: FaTwitch },
   { to: "/streams/most-viewed", label: "Most viewed", icon: MdViewStream },
];

const isActivePath = (pathname, item) => {
   if (item.to === "/") {
      return pathname === "/" || pathname === "";
   }
   if (item.to === "/streams/") {
      return pathname === "/streams" || pathname === "/streams/";
   }
   return pathname === item.to || pathname.startsWith(`${item.to}/`);
};

const StoreSidebarNav = ({ className = "", sectionLabel = "Navigate" }) => {
   const location = useLocation();
   const pathname = location.pathname;

   return (
      <nav className={className} aria-label="Browse and streams">
         <p className="zog-rail-nav-heading">{sectionLabel}</p>
         <ul className="zog-rail-nav-list">
            <li>
               <p className="zog-rail-search-hint" role="note">
                  <MdSearch className="zog-rail-search-hint-icon" aria-hidden />
                  <span>Use the search bar at the top to find games.</span>
               </p>
            </li>
            {defaultItems.map((item) => {
               const Icon = item.icon;
               const active = isActivePath(pathname, item);
               return (
                  <li key={item.to}>
                     <Link
                        to={item.to}
                        className={`zog-rail-nav-link ${active ? "zog-rail-nav-link-active" : ""}`}
                        aria-current={active ? "page" : undefined}
                     >
                        <span className="zog-rail-nav-link-icon" aria-hidden>
                           <Icon />
                        </span>
                        <span className="min-w-0 flex-1 font-semibold leading-tight">{item.label}</span>
                     </Link>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
};

StoreSidebarNav.propTypes = {
   className: PropTypes.string,
   sectionLabel: PropTypes.string,
};

export default StoreSidebarNav;
