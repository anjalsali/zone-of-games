import { Link } from "react-router-dom";
import LegalDocumentLayout from "../components/LegalDocumentLayout";

const PrivacyPolicy = () => {
   const lastUpdated = new Date().toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      year: "numeric",
   });

   return (
      <LegalDocumentLayout
         title="Privacy Policy"
         lastUpdatedLabel={`Last updated: ${lastUpdated}`}
         intro="This policy describes how Zone of Games (“we”, “our”, or “the site”) handles information when you use our public game discovery and streaming directory. It applies to the web application available at zoneofgames.co.uk and related demo or repository deployments."
      >
         <section>
            <h2>1. Who we are</h2>
            <p>
               Zone of Games is an educational and portfolio project developed by contributors listed on our{" "}
               <Link to="/contact">Contact</Link> page. The site aggregates publicly available game metadata and streaming
               information from third-party services so visitors can browse games and discover live content in one place.
            </p>
         </section>

         <section>
            <h2>2. Information we do not intentionally collect</h2>
            <p>
               The application is designed as a browse-first experience. We do not require you to create an account, and
               we do not operate a proprietary user database as part of the open-source demo. You can use most features
               without telling us who you are.
            </p>
         </section>

         <section>
            <h2>3. Data stored on your device</h2>
            <p>Your browser may store small amounts of data to improve your experience:</p>
            <ul>
               <li>
                  <strong className="text-text/90">Theme preference</strong> — light or dark mode may be saved in{" "}
                  <code className="rounded bg-primary/80 px-1 py-0.5 text-xs text-text/80">localStorage</code> so your
                  choice persists when you return.
               </li>
               <li>
                  <strong className="text-text/90">Standard browser storage</strong> — embedded players (for example
                  Twitch or YouTube) may set their own cookies or use storage according to those providers’ policies when
                  you interact with their widgets.
               </li>
            </ul>
         </section>

         <section>
            <h2>4. Contact form</h2>
            <p>
               If you use the Contact page, you may enter an email address, subject, and message. In the current
               open-source build, submissions are handled in the browser for demonstration and may be logged only to the
               developer console unless a backend or email service is connected by the deployer. Do not submit passwords,
               financial data, or other highly sensitive information through the form. If a production deployment adds
               server-side processing, that operator should provide supplementary privacy information for how messages are
               stored and used.
            </p>
         </section>

         <section>
            <h2>5. Third-party services and APIs</h2>
            <p>
               Game listings, search, genres, platforms, ratings, and related metadata are loaded from the{" "}
               <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer">
                  RAWG
               </a>{" "}
               video game database API. Live game categories and streams are loaded from the{" "}
               <a href="https://dev.twitch.tv/docs/api/" target="_blank" rel="noopener noreferrer">
                  Twitch
               </a>{" "}
               API. Trailers and video content may be loaded via the{" "}
               <a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer">
                  YouTube
               </a>{" "}
               Data API. When you use these features, your browser sends requests (including your IP address and standard
               technical data) directly to those providers under their respective terms and privacy policies. We do not
               control how they process that data.
            </p>
         </section>

         <section>
            <h2>6. Hosting and logs</h2>
            <p>
               The public site may be hosted on infrastructure (for example Hostinger or similar) that collects access
               logs, IP addresses, and technical metadata for security and operations. That processing is governed by the
               hosting provider’s documentation and the configuration chosen by the project maintainers.
            </p>
         </section>

         <section>
            <h2>7. Children’s privacy</h2>
            <p>
               Zone of Games displays game and streaming content that may include titles rated for mature audiences. The
               site is not directed at children under 13 (or the minimum age in your jurisdiction). We do not knowingly
               collect personal information from children. If you believe a child has provided personal data through a
               deployment you control, contact the site operator to have it removed.
            </p>
         </section>

         <section>
            <h2>8. International visitors</h2>
            <p>
               Third-party APIs and CDNs may process data in countries other than your own. By using the site, you
               acknowledge that such transfers may occur as part of normal web requests to those services.
            </p>
         </section>

         <section>
            <h2>9. Changes to this policy</h2>
            <p>
               We may update this Privacy Policy when features, integrations, or legal requirements change. The “Last
               updated” date at the top of this page will be revised when material changes are made. Continued use of the
               site after updates constitutes acceptance of the revised policy.
            </p>
         </section>

         <section>
            <h2>10. Contact</h2>
            <p>
               For privacy-related questions about this project, please reach out through the{" "}
               <Link to="/contact">Contact</Link> page or open an issue on the{" "}
               <a href="https://github.com/group14-aaa/zone-of-games" target="_blank" rel="noopener noreferrer">
                  GitHub repository
               </a>
               .
            </p>
         </section>
      </LegalDocumentLayout>
   );
};

export default PrivacyPolicy;
