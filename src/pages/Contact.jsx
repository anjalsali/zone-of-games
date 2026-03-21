import { useState } from "react";

// Icons
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Images
import anjalProfile from "../assets/images/anjal-profile-pic.jpg";
import adamProfile from "../assets/images/adam-profile-pic.png";
import mihaiProfile from "../assets/images/mihai-profile-pic.png";
import chrisProfile from "../assets/images/chris-profile-pic.png";

const inputClass =
   "w-full rounded-xl border border-borderTheme/60 bg-secondary/80 px-4 py-3 text-sm text-text shadow-inner placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

const Contact = () => {
   const profileLinks = [
      {
         name: "Anjal Sali",
         imgSrc: anjalProfile,
         linkedInLink: "https://www.linkedin.com/in/anjalsali/",
         gitHubLink: "https://github.com/anjalsali",
      },
      {
         name: "Adam Riley",
         imgSrc: adamProfile,
         linkedInLink: "https://www.linkedin.com/in/adampriley/",
         gitHubLink: "https://github.com/adampriley1",
      },
      {
         name: "Mihai Pirvu",
         imgSrc: mihaiProfile,
         linkedInLink: "https://www.linkedin.com/in/mihaidev/",
         gitHubLink: "https://github.com/pmAdriaan",
      },
      {
         name: "Chris Di Luca",
         imgSrc: chrisProfile,
         linkedInLink: "https://www.linkedin.com/",
         gitHubLink: "https://github.com/Revan369",
      },
   ];

   const initialState = {
      email: "",
      subject: "",
      message: "",
   };

   const [formData, setFormData] = useState(initialState);

   const [showThankYouModal, setShowThankYouModal] = useState(false);

   const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevFormData) => ({
         ...prevFormData,
         [id]: value,
      }));
   };

   const resetForm = () => {
      setFormData(initialState);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      setShowThankYouModal(true);
   };

   const handleCloseModal = () => {
      setShowThankYouModal(false);
      resetForm();
   };

   return (
      <>
         <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
            <div className="mb-12">
               <h2 className="mb-4 text-3xl font-black tracking-tight text-text sm:text-4xl">Our Team</h2>
               <p className="mx-auto max-w-3xl text-lg text-muted">
                  At Zone of Games, we believe the heart of our success lies within the collective spirit, talent, and dedication of our team. Our diverse group of professionals brings together a rich
                  tapestry of expertise, backgrounds, and perspectives, united by a common passion for excellence.
               </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
               {profileLinks.map((profile, index) => (
                  <div key={index} className="group relative zog-card overflow-hidden">
                     <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                           src={profile.imgSrc}
                           alt={`${profile.name} profile`}
                        />
                        <div className="zog-contact-card-overlay absolute inset-0 flex flex-col justify-end p-5 opacity-95 transition-opacity duration-300 group-hover:opacity-100">
                           <div className="mb-4 text-left text-xl font-bold text-white drop-shadow-sm">{profile.name}</div>
                           <div className="flex gap-4">
                              <a
                                 href={profile.gitHubLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="rounded-lg p-2 text-white/90 transition-transform hover:scale-110 hover:bg-white/10 hover:text-accent"
                                 aria-label={`${profile.name} on GitHub`}
                              >
                                 <FaGithub size={22} />
                              </a>
                              <a
                                 href={profile.linkedInLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="rounded-lg p-2 text-white/90 transition-transform hover:scale-110 hover:bg-white/10 hover:text-accent"
                                 aria-label={`${profile.name} on LinkedIn`}
                              >
                                 <FaLinkedin size={22} />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <section className="border-t border-borderTheme/30 bg-secondary/40 py-12 dark:bg-primary/20">
            <div className="zog-glass mx-auto max-w-lg rounded-3xl p-8 sm:p-10">
               <h2 className="mb-3 text-center text-3xl font-black text-text">Contact Us</h2>
               <p className="mb-8 text-center text-muted">
                  Got a technical issue? Want to send feedback about a beta feature? Need details about our Project? Let us know.
               </p>
               <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div>
                     <label htmlFor="email" className="mb-2 block text-sm font-semibold text-text">
                        Email
                     </label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Enter your email address"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-text">
                        Subject
                     </label>
                     <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="How can we help?"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="message" className="mb-2 block text-sm font-semibold text-text">
                        Your message
                     </label>
                     <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`${inputClass} resize-y`}
                        placeholder="Leave a comment…"
                        required
                     />
                  </div>
                  <button type="submit" className="zog-btn-primary w-full rounded-xl py-3.5 text-sm font-bold">
                     Send Message
                  </button>
               </form>
            </div>
            {showThankYouModal && (
               <div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 p-4 backdrop-blur-md"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="thank-you-title"
               >
                  <div className="zog-glass max-w-md rounded-3xl p-8 text-center shadow-glow">
                     <h3 id="thank-you-title" className="text-xl font-bold text-text">
                        Thank you for contacting us!
                     </h3>
                     <p className="mt-2 text-muted">We will get back to you shortly.</p>
                     <button
                        type="button"
                        onClick={handleCloseModal}
                        className="zog-btn-primary mt-6 rounded-xl px-8 py-2.5 text-sm font-semibold"
                     >
                        Close
                     </button>
                  </div>
               </div>
            )}
         </section>
      </>
   );
};

export default Contact;
