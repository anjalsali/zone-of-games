const About = () => {
   const techLinks = [
      { href: "https://html.com/", title: "HTML - The Standard Markup Language for Documents", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/8/82/Devicon-html5-plain.svg" },
      {
         href: "https://www.w3.org/Style/CSS/",
         title: "CSS - The Language for Describing the Presentation of Web Pages",
         imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
      },
      {
         href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
         title: "JavaScript - MDN Web Docs",
         imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      },
      { href: "https://nodejs.org/", title: "Node.js - JavaScript runtime", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg" },

      { href: "https://vitejs.dev/", title: "Vite - Next Generation Frontend Tooling", imgSrc: "https://vitejs.dev/logo.svg" },

      { href: "https://reactjs.org/", title: "React - A JavaScript library for building user interfaces", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },

      {
         href: "https://tailwindcss.com/",
         title: "Tailwind CSS - A utility-first CSS framework for rapidly building custom designs",
         imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      },
      {
         href: "https://swiperjs.com",
         title: "Swiper.js - Modern Mobile Touch Slider",
         imgSrc: "https://swiperjs.com/images/swiper-logo.svg",
      },

      { href: "https://git-scm.com/", title: "Git - Distributed Version Control System", imgSrc: "https://git-scm.com/images/logos/downloads/Git-Logo-1788C.svg" },
      {
         href: "https://github.com/",
         title: "GitHub - Development Platform",
         imgSrc: "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png",
      },
      {
         href: "https://www.hostinger.com/",
         title: "Hostinger - Web Hosting Services",
         imgSrc: "https://upload.wikimedia.org/wikipedia/commons/8/82/Hostinger_logo.png",
      },
      {
         href: "https://www.adobe.com/products/photoshop.html",
         title: "Adobe Photoshop - Image Editing Software",
         imgSrc: "https://www.adobe.com/content/dam/acom/one-console/icons_rebrand/ps_appicon.svg",
      },
   ];

   const apiLinks = [
      { href: "https://rawg.io/", title: "RAWG API - Video Games Database", imgSrc: "https://rawg.io/assets/en/share-vk.png?v=4" },
      { href: "https://dev.twitch.tv/", title: "Twitch API - Developer Resources", imgSrc: "https://dev.twitch.tv/marketing-assets/images/TwitchDev.png" },
      {
         href: "https://developers.google.com/youtube/v3",
         title: "YouTube API - Video Hosting and Streaming",
         imgSrc: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      },
   ];

   return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6">
         <section className="zog-glass animate-fade-up mb-10 rounded-3xl p-8 sm:p-10">
            <h1 className="mb-4 text-3xl font-black tracking-tight text-text sm:text-4xl">Zone of Games</h1>
            <p className="text-lg leading-relaxed text-muted">
               Welcome to <strong className="text-text">Zone of Games</strong>, the ultimate platform for exploring and discovering video games across all platforms. We bring together a vast collection of games, alongside
               their live Twitch streams, to offer gamers a unique, interactive experience. Whether you&apos;re looking for the latest releases, or classic titles, Zone of Games is your one-stop
               destination.
            </p>
         </section>

         <section className="zog-glass mb-10 rounded-3xl p-8 sm:p-10">
            <h2 className="mb-4 text-2xl font-bold text-text sm:text-3xl">Our Vision</h2>
            <p className="text-lg leading-relaxed text-muted">
               Our vision is to revolutionise the way gamers discover and engage with video games. By integrating game details with live streaming content, we provide a comprehensive and immersive
               experience that goes beyond traditional game stores. Zone of Games is not just about purchasing games; it&apos;s about becoming part of a vibrant community that shares your passion for
               gaming.
            </p>
         </section>

         <div className="mb-12">
            <h2 className="zog-section-title">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-4">
               {techLinks.map((tech, index) => (
                  <a
                     key={index}
                     href={tech.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     title={tech.title}
                     className="zog-card-interactive flex h-28 w-[calc(50%-8px)] items-center justify-center p-4 sm:w-[calc(25%-12px)] md:h-32 md:w-[calc(20%-14px)]"
                  >
                     <img width={80} src={tech.imgSrc} alt={tech.title} className="mx-auto max-h-16 w-auto object-contain" />
                  </a>
               ))}
            </div>
         </div>

         <div>
            <h2 className="zog-section-title">APIs Used</h2>
            <div className="flex flex-wrap justify-center gap-6">
               {apiLinks.map((tech, index) => (
                  <a
                     key={index}
                     href={tech.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     title={tech.title}
                     className="group zog-card-interactive flex h-32 w-40 items-center justify-center p-4 sm:w-48"
                  >
                     <img width={100} src={tech.imgSrc} alt={tech.title} className="max-h-20 object-contain" />
                  </a>
               ))}
            </div>
         </div>
      </div>
   );
};

export default About;
