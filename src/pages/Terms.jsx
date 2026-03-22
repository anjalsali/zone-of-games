import { Link } from "react-router-dom";
import LegalDocumentLayout from "../components/LegalDocumentLayout";

const Terms = () => {
   const lastUpdated = new Date().toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      year: "numeric",
   });

   return (
      <LegalDocumentLayout
         title="Terms & Conditions"
         lastUpdatedLabel={`Last updated: ${lastUpdated}`}
         intro="These Terms & Conditions govern your use of Zone of Games, a web application for discovering video games and related live streams. By accessing or using the site, you agree to these terms. If you do not agree, please do not use the service."
      >
         <section>
            <h2>1. The service</h2>
            <p>
               Zone of Games provides a user interface to browse game catalogs, view game details, explore top-rated
               titles, and discover Twitch streams associated with games. Content such as game names, images,
               descriptions, ratings, and stream listings is supplied by third-party APIs and embeds; we do not claim
               ownership of that third-party content.
            </p>
         </section>

         <section>
            <h2>2. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
               <li>Use the site in any way that violates applicable laws or regulations.</li>
               <li>Attempt to scrape, overload, or abuse our infrastructure or the APIs we rely on in a manner that violates those providers’ terms.</li>
               <li>Reverse engineer or circumvent technical measures except where permitted by law.</li>
               <li>Use automated means to access the site in a way that degrades service for others.</li>
            </ul>
         </section>

         <section>
            <h2>3. Intellectual property</h2>
            <p>
               The Zone of Games name, logo usage on this deployment, and the project’s source code are subject to the
               license published in the{" "}
               <a href="https://github.com/group14-aaa/zone-of-games" target="_blank" rel="noopener noreferrer">
                  repository
               </a>{" "}
               (MIT License unless otherwise stated there). Game artwork, stream thumbnails, trailers, and trademarks
               belong to their respective rights holders and are displayed for informational purposes only.
            </p>
         </section>

         <section>
            <h2>4. Third-party services</h2>
            <p>
               Your use of RAWG, Twitch, YouTube, and any other integrated services is also subject to their respective
               terms of use and policies. Features may change or stop working if those providers modify or discontinue
               their APIs. We are not responsible for third-party downtime, rate limits, or content removal.
            </p>
         </section>

         <section>
            <h2>5. Accuracy and availability</h2>
            <p>
               Game metadata, ratings, release information, and stream data are provided “as is” from external sources and
               may be incomplete, outdated, or incorrect. The site may be unavailable during maintenance or due to factors
               outside our control. We do not guarantee uninterrupted access or error-free operation.
            </p>
         </section>

         <section>
            <h2>6. Disclaimer of warranties</h2>
            <p>
               To the fullest extent permitted by law, Zone of Games is provided without warranties of any kind, whether
               express or implied, including but not limited to implied warranties of merchantability, fitness for a
               particular purpose, and non-infringement. Your use of the site is at your sole risk.
            </p>
         </section>

         <section>
            <h2>7. Limitation of liability</h2>
            <p>
               To the maximum extent permitted by applicable law, the contributors and operators of Zone of Games shall
               not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of
               profits or data, arising from your use of or inability to use the site or embedded third-party content.
            </p>
         </section>

         <section>
            <h2>8. Indemnity</h2>
            <p>
               You agree to indemnify and hold harmless the project contributors and hosting operators (as applicable)
               from any claims or damages arising from your misuse of the site or violation of these terms, to the extent
               permitted by law.
            </p>
         </section>

         <section>
            <h2>9. Changes to these terms</h2>
            <p>
               We may modify these Terms & Conditions at any time. We will update the “Last updated” date on this page
               when we do. Your continued use of the site after changes constitutes acceptance of the revised terms.
            </p>
         </section>

         <section>
            <h2>10. Governing law</h2>
            <p>
               These terms are provided for a global audience. If a dispute arises, the laws that apply may depend on where
               you live and where the site is operated. Where required, local mandatory consumer protections may apply
               regardless of this clause.
            </p>
         </section>

         <section>
            <h2>11. Contact</h2>
            <p>
               Questions about these terms can be sent via our{" "}
               <Link to="/contact">Contact</Link> page or through the project’s{" "}
               <a href="https://github.com/group14-aaa/zone-of-games" target="_blank" rel="noopener noreferrer">
                  GitHub
               </a>{" "}
               community.
            </p>
         </section>
      </LegalDocumentLayout>
   );
};

export default Terms;
