import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaHouse, FaTrophy } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa";
import { MdViewStream } from "react-icons/md";

const defaultItems = [
   { to: "/", label: "Store home", icon: FaHouse },
   { to: "/games/top", label: "Top rated", icon: FaTrophy },
   { to: "/streams/", label: "Twitch directory", icon: FaTwitch },
   { to: "/streams/most-viewed", label: "Live leaderboard", icon: MdViewStream },
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

const StoreSidebarNav = ({ className = "" }) => {
   const location = useLocation();
   const pathname = location.pathname;

   return (
      <nav className={className} aria-label="Store and streams">
         <p className="zog-sidebar-section-label">Discover</p>
         <ul className="zog-sidebar-nav-list">
            {defaultItems.map((item) => {
               const Icon = item.icon;
               const active = isActivePath(pathname, item);
               return (
                  <li key={item.to}>
                     <Link
                        to={item.to}
                        className={`zog-sidebar-nav-item ${active ? "zog-sidebar-nav-item-active" : ""}`}
                        aria-current={active ? "page" : undefined}
                     >
                        <span className="zog-sidebar-nav-icon" aria-hidden>
                           <Icon />
                        </span>
                        <span className="min-w-0 flex-1">{item.label}</span>
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
};

export default StoreSidebarNav;
