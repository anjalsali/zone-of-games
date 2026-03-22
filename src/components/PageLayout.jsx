import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import ScrollReveal from "./ScrollReveal";
import { ScrollMotionProvider } from "../context/ScrollMotionContext";

document.documentElement.style.setProperty("--font-montserrat", "Montserrat, system-ui, sans-serif");

const PageLayout = ({ children }) => {
   return (
      <ScrollMotionProvider>
         <div className="font-montserrat relative text-text">
            <Header />
            <main className="relative z-0 w-full pl-0 pr-3 pb-12 pt-1 sm:pr-4 md:pr-5">
               {children}
            </main>
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
