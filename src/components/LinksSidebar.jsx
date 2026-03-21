import { Link, useLocation } from "react-router-dom";

const links = [
   { to: "/streams/", label: "Top games streaming" },
   { to: "/streams/most-viewed", label: "Top 100 live streams" },
   { to: "/games/top", label: "Top rated games" },
];

export default function LinksSidebar() {
   const location = useLocation();

   return (
      <nav className="pb-1" aria-label="Game and stream sections">
         <p className="browse-aside-label mb-2 px-1">Store &amp; streams</p>
         <div className="border border-borderTheme bg-primary/30">
            {links.map(({ to, label }) => {
               const active =
                  to === "/streams/"
                     ? location.pathname === "/streams" || location.pathname === "/streams/"
                     : location.pathname === to;
               return (
                  <Link
                     key={to}
                     to={to}
                     className={`browse-quick-link border-b border-borderTheme last:border-b-0 ${active ? "browse-quick-link-active" : ""}`}
                  >
                     {label}
                  </Link>
               );
            })}
         </div>
      </nav>
   );
}
