import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollReveal from "./ScrollReveal";
import BrowseSidebarLayout from "./BrowseSidebarLayout";
import { ScrollMotionProvider } from "../context/ScrollMotionContext";

document.documentElement.style.setProperty("--font-montserrat", "Montserrat, system-ui, sans-serif");

const PATHS_WITHOUT_BROWSE_SIDEBAR = new Set([
   "/about",
   "/contact",
   "/Contact",
   "/privacy-policy",
   "/terms",
]);

const shouldHideBrowseSidebar = (pathname) => PATHS_WITHOUT_BROWSE_SIDEBAR.has(pathname);

const PageLayout = ({ children }) => {
   const { pathname } = useLocation();
   const hideBrowseSidebar = shouldHideBrowseSidebar(pathname);

   return (
      <ScrollMotionProvider>
         <div className="font-montserrat relative text-text">
            <Header />
            {hideBrowseSidebar ? (
               <main className="relative z-0 w-full pl-0 pr-3 pb-12 pt-1 sm:pr-4 md:pr-5">{children}</main>
            ) : (
               <BrowseSidebarLayout>{children}</BrowseSidebarLayout>
            )}
            <ScrollReveal as="div" className="block" threshold={0.06} rootMargin="0px 0px -20px 0px">
               <Footer />
            </ScrollReveal>
         </div>
      </ScrollMotionProvider>
   );
};

PageLayout.propTypes = {
   children: PropTypes.node.isRequired,
};

export default PageLayout;
