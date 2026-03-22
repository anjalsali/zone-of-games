import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import whiteLogo from "./../assets/images/zog-logo-white.png";
import blackLogo from "./../assets/images/zog-logo-black.png";

const footerLinkClass =
   "inline-flex rounded-md py-1 text-sm font-medium text-text/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

const externalFooterLinkClass = `${footerLinkClass}`;

const socialButtonClass =
   "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-borderTheme/45 bg-primary/25 text-muted transition-colors hover:border-accent/35 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

const FooterSectionTitle = ({ children }) => (
   <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{children}</h2>
);

FooterSectionTitle.propTypes = {
   children: PropTypes.node.isRequired,
};

const Footer = () => {
   const { theme } = useContext(ThemeContext);
   const logoSrc = theme === "dark" ? whiteLogo : blackLogo;
   const currentYear = new Date().getFullYear();

   return (
      <footer
         className="relative mt-auto border-t border-borderTheme/50 bg-gradient-to-b from-secondary/45 via-primary/35 to-primary/55"
         role="contentinfo"
      >
         <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" aria-hidden />

         <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
               {/* Brand */}
               <div className="flex max-w-lg flex-col items-center text-center lg:max-w-sm lg:items-start lg:text-left">
                  <a
                     href="https://zoneofgames.co.uk/"
                     className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                     aria-label="Zone Of Games — official site"
                  >
                     <img
                        src={logoSrc}
                        className="h-20 w-auto object-contain sm:h-24 md:h-28 lg:h-32"
                        alt="Zone Of Games"
                     />
                  </a>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                     Browse games by genre and platform, explore top-rated titles, and discover live Twitch streams—your
                     hub for gaming discovery.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
                     <Link
                        to="/"
                        className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:text-text hover:underline"
                     >
                        Home
                     </Link>
                     <span className="hidden text-borderTheme sm:inline" aria-hidden>
                        |
                     </span>
                     <a
                        href="https://zoneofgames.co.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:text-text hover:underline"
                     >
                        Official site
                     </a>
                  </div>
               </div>

               <div className="flex w-full justify-center lg:w-auto lg:shrink-0 lg:justify-end">
                  <nav
                     className="grid w-full max-w-md grid-cols-2 gap-x-10 gap-y-8 sm:max-w-none sm:grid-cols-3 sm:gap-x-12"
                     aria-label="Footer navigation"
                  >
                     <div className="min-w-[7.5rem]">
                        <FooterSectionTitle>Explore</FooterSectionTitle>
                        <ul className="flex flex-col gap-1">
                           <li>
                              <Link to="/" className={footerLinkClass}>
                                 Home
                              </Link>
                           </li>
                           <li>
                              <Link to="/games/top" className={footerLinkClass}>
                                 Top rated
                              </Link>
                           </li>
                           <li>
                              <Link to="/streams/" className={footerLinkClass}>
                                 Streams
                              </Link>
                           </li>
                        </ul>
                     </div>
                     <div className="min-w-[7.5rem]">
                        <FooterSectionTitle>Company</FooterSectionTitle>
                        <ul className="flex flex-col gap-1">
                           <li>
                              <Link to="/about" className={footerLinkClass}>
                                 About
                              </Link>
                           </li>
                           <li>
                              <Link to="/contact" className={footerLinkClass}>
                                 Contact
                              </Link>
                           </li>
                        </ul>
                     </div>
                     <div className="col-span-2 min-w-[7.5rem] sm:col-span-1">
                        <FooterSectionTitle>Legal &amp; social</FooterSectionTitle>
                        <ul className="flex flex-col gap-1">
                           <li>
                              <Link to="/privacy-policy" className={footerLinkClass}>
                                 Privacy Policy
                              </Link>
                           </li>
                           <li>
                              <Link to="/terms" className={footerLinkClass}>
                                 Terms &amp; Conditions
                              </Link>
                           </li>
                           <li>
                              <a
                                 href="https://github.com/group14-aaa/zone-of-games"
                                 className={externalFooterLinkClass}
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 GitHub
                              </a>
                           </li>
                        </ul>
                     </div>
                  </nav>
               </div>
            </div>

            <div className="mt-10 border-t border-borderTheme/40 pt-6">
               <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-center sm:text-left">
                     <p className="text-xs leading-snug text-muted">
                        © {currentYear}{" "}
                        <a
                           href="https://zoneofgames.co.uk/"
                           className="font-semibold text-text/90 transition-colors hover:text-accent"
                        >
                           Zone Of Games™
                        </a>
                        . All rights reserved.
                     </p>
                     <p className="mt-1 text-[11px] leading-snug text-muted/90">
                        Game data and imagery are provided by third-party services and remain property of their respective
                        owners.
                     </p>
                  </div>

                  <ul className="m-0 flex shrink-0 list-none items-center gap-2 p-0" aria-label="Social links">
                     <li>
                     <a href="#" className={socialButtonClass} aria-label="Facebook">
                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                           <path
                              fillRule="evenodd"
                              d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </a>
                     </li>
                     <li>
                     <a href="#" className={socialButtonClass} aria-label="Twitter">
                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                           <path
                              fillRule="evenodd"
                              d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </a>
                     </li>
                     <li>
                     <a
                        href="https://github.com/group14-aaa/zone-of-games"
                        className={socialButtonClass}
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path
                              fillRule="evenodd"
                              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
