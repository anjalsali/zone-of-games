import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const LegalDocumentLayout = ({ title, lastUpdatedLabel, intro, children }) => {
   return (
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12">
         <ScrollReveal as="div" delay={30}>
            <nav className="mb-6 text-sm text-muted" aria-label="Breadcrumb">
               <Link to="/" className="transition-colors hover:text-accent">
                  Home
               </Link>
               <span className="mx-2 text-borderTheme" aria-hidden>
                  /
               </span>
               <span className="text-text/80">{title}</span>
            </nav>

            <header className="zog-glass mb-10 rounded-2xl p-6 sm:p-8">
               <h1 className="text-3xl font-black tracking-tight text-text sm:text-4xl">{title}</h1>
               <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">{lastUpdatedLabel}</p>
               {intro ? <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p> : null}
            </header>
         </ScrollReveal>

         <ScrollReveal as="div" className="legal-doc-body space-y-8 text-left text-sm leading-relaxed" delay={70}>
            {children}
         </ScrollReveal>
      </article>
   );
};

LegalDocumentLayout.propTypes = {
   title: PropTypes.string.isRequired,
   lastUpdatedLabel: PropTypes.string.isRequired,
   intro: PropTypes.string,
   children: PropTypes.node.isRequired,
};

export default LegalDocumentLayout;
