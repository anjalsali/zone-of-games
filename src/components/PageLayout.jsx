import PropTypes from "prop-types";
// Components
import Header from "./Header";
import Footer from "./Footer";

document.documentElement.style.setProperty("--font-montserrat", "Montserrat, system-ui, sans-serif");

const PageLayout = ({ children }) => {
   return (
      <div className="font-montserrat relative text-text">
         <Header />
         <main className="relative z-0 w-full px-3 pb-12 pt-1 sm:px-4 md:px-5 animate-fade-up">
            {children}
         </main>
         <Footer />
      </div>
   );
};

PageLayout.propTypes = {
   children: PropTypes.node.isRequired,
};

export default PageLayout;
