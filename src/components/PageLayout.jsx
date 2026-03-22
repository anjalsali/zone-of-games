import PropTypes from "prop-types";
// Components
import Header from "./Header";
import Footer from "./Footer";

document.documentElement.style.setProperty("--font-montserrat", "Montserrat, system-ui, sans-serif");

const PageLayout = ({ children }) => {
   return (
      <div className="font-montserrat relative flex min-h-dvh flex-col text-text">
         <Header />
         <main className="relative z-0 flex min-h-0 w-full flex-1 flex-col pl-0 pr-3 pb-12 pt-1 sm:pr-4 md:pr-5 animate-fade-up">
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
