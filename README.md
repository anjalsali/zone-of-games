<div align="center">
<h1 align="center">
<img src="https://camo.githubusercontent.com/b69e8363f2480666b3c0a5a472a60137ed93aea1a8e83513c5b615d107a9423b/68747470733a2f2f696d672e69636f6e73382e636f6d2f3f73697a653d3531322669643d353534393426666f726d61743d706e67" width="100" />
<br>ZONE-OF-GAMES</h1>
<h3>◦ Unleash your gaming prowess in the Zone!</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat-square&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat-square&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat-square&logo=YAML&logoColor=white" alt="YAML" />
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=Vite&logoColor=white" alt="Vite" />

<img src="https://img.shields.io/badge/Swiper-6332F6.svg?style=flat-square&logo=Swiper&logoColor=white" alt="Swiper" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat-square&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/license/group14-aaa/zone-of-games?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/group14-aaa/zone-of-games?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/group14-aaa/zone-of-games?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/group14-aaa/zone-of-games?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#%EF%B8%8F-modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running Zone of Games](#-running-zone-of-games)
    - [🌐 Live Demo Zone of Games](#-live-demo-zone-of-games)
    - [📸 Screenshot Zone of Games](#-screenshot-zone-of-games)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview
This repository contains a web app named Zone of Games with components for game banners, streaming, navigation, and more. It leverages React, React Router, and APIs like Youtube, Twitch and Rawg to offer a dynamic and interactive gaming experience. The project showcases top-rated games, streams, and allows users to explore games by genre and platform. Key features include collapsible sections, theme support, lazy loading, and responsive design.

Zone of Games is a gaming-centric platform that caters to enthusiasts seeking a comprehensive gaming experience. The project's primary focus is on providing detailed information about specific games alongside live gaming streams sourced from Twitch, all conveniently accessible on a per-game basis.

![Logo Zone of Games](./public/assets/logo/logo-color.png?raw=true "logo-zone-of-games")
---

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The system follows a component-based architecture with clear separation of concerns between components and services, enhancing maintainability and scalability. The use of React components, context API for theming, lazy loading for routes, Axios for API calls, and a structured directory tree indicate a well-organized architectural design.                                                 |
| 🔗 | **Dependencies**   | The system relies on various dependencies like Axios, React Router, Tailwind CSS, ESLint, and more for functionality, styling, and code quality. Managing dependencies effectively and keeping them up to date is essential to ensure compatibility and security. Consider periodically reviewing and updating dependencies for maintainability.           |
| 🧩 | **Modularity**     | The project exhibits good modularity by organizing components, context, and services into separate directories, facilitating reusability and maintainability. Each component serves a specific function, enabling easier testing, debugging, and updates. Encouraging modularity enhances code readability and fosters a clean project structure.        |
| 🧪 | **Testing**        | The codebase lacks explicit information on testing strategies and tools. Incorporating unit tests, integration tests, or end-to-end testing using frameworks like Jest or React Testing Library could ensure code reliability, catch errors early, and promote robust application behavior. Testing documentation and practices should be enhanced for code quality assurance.      |
| ⚡️  | **Performance**    | The performance is optimized with lazy loading, efficient rendering of components, and API requests. Leveraging lazy loading for routes, optimized Axios requests, and responsive design techniques enhance the system's speed and resource efficiency. Regular performance monitoring and optimizations can further improve user experience.                                 |
| 🔐 | **Security**       | Security measures like environment variable handling for API keys and OAuth tokens are in services. Implementing secure practices like data validation, input sanitization, and HTTPS usage can fortify the system against vulnerabilities. Regular security audits, updates, and best practices can reinforce data protection and system integrity.  |
| 🔀 | **Version Control**| Version control is managed through GitHub with a workflow for build generation and deployment. Utilizing Git for versioning, feature branching, and CI/CD workflows ensures code collaboration, traceability, and deployment automation. Enhancements in commit conventions, branching strategies, and PR reviews can further streamline version control practices. |
| 🔌 | **Integrations**   | The system integrates with external APIs like RAWG, Twitch, and YouTube for fetching game and stream data, contributing to rich content display. Evaluating API usage for efficiency, rate limits, and error handling could optimize integrations. Exploring new integrations and monitoring API changes can enhance the system's functionality and adaptability.  |
| 📶 | **Scalability**    | The system has potential for scalability with dynamic content loading, theming support, and API data management.
---


## 📂 Repository Structure

```sh
└── zone-of-games/
    ├── .eslintrc.cjs
    ├── .github/
    │   └── workflows/
    │       └── publish.yml
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public/
    │   └── screenshots/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── CollapsibleSection.jsx
    │   │   ├── Footer.jsx
    │   │   ├── GameBanner.jsx
    │   │   ├── GamePageStreams.jsx
    │   │   ├── Header.jsx
    │   │   ├── LinksSidebar.jsx
    │   │   ├── Loading.jsx
    │   │   ├── MainContent.jsx
    │   │   ├── NavigationSidebar.jsx
    │   │   ├── PageLayout.jsx
    │   │   ├── RawgGamesByGenreAndPlatformId.jsx
    │   │   ├── RawgTopRatedGames.jsx
    │   │   ├── RoutesPath.jsx
    │   │   ├── TwitchTopGames.jsx
    │   │   └── TwitchTopStreams.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages/
    │   │   ├── 404.jsx
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── games/
    │   │   ├── Home.jsx
    │   │   └── streams/
    │   └── services/
    │       ├── rawgApi.jsx
    │       ├── twitchApi.jsx
    │       └── youtubeAPI.jsx
    ├── tailwind.config.js
    └── vite.config.js

```

---


## ⚙️ Modules

<details open><summary>Root</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                                          | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [.eslintrc.cjs](https://github.com/group14-aaa/zone-of-games/blob/main/.eslintrc.cjs)                                                        | The code in the `.eslintrc.cjs` file configures ESLint for the React project, specifying environment settings, extending recommended configurations, ignoring patterns, setting parser options, defining React version, adding plugins, and enforcing specific rules including exporting components only.                                                                                                                                                                                                                                            |
| [index.html](https://github.com/group14-aaa/zone-of-games/blob/main/index.html)                                                              | The code in the `index.html` file includes standard HTML structure with a Twitch embed script and references the main.jsx file for rendering the app. The title is set to Zone of Games, and icons are linked.                                                                                                                                                                                                                                                                                      |
| [package-lock.json](https://github.com/group14-aaa/zone-of-games/blob/main/package-lock.json)                                                | The code in the `package-lock.json` file contains metadata for package dependencies, specifying version information and package requirements for the project. It ensures consistent and reproducible installations when deploying the project by locking the versions of packages used. This helps maintain stability and avoids unexpected updates that could introduce errors into the project.                                                                                                                                                 |
| [package.json](https://github.com/group14-aaa/zone-of-games/blob/main/package.json)                                                          | The code defines dependencies like axios, react-router-dom, and tailwindcss. It includes scripts for development, building, and linting, utilizing Vite for fast builds, and ESLint for code quality. The project structure includes components, pages, and service files. Dependencies support features like font handling and video playback. Development tools like eslint, autoprefixer, and tailwindcss aid in maintaining code standards and styling.                                                                |
| [postcss.config.js](https://github.com/group14-aaa/zone-of-games/blob/main/postcss.config.js)                                                | The code in `postcss.config.js` exports PostCSS plugins Tailwind CSS and Autoprefixer for styling optimization in  the project.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [tailwind.config.js](https://github.com/group14-aaa/zone-of-games/blob/main/tailwind.config.js)                                              | The code defines the Tailwind CSS configuration, specifying dark mode, file paths for styles, theme settings for screens, colors, typography, and container padding, and adding a scrollbar plugin.                                                                                                                                                                                                                                                                                                                                               |
| [vite.config.js](https://github.com/group14-aaa/zone-of-games/blob/main/vite.config.js)                                                      | The code in `vite.config.js` sets up the Vite project with React, defining build configurations, serving static assets with cache control headers, and ensuring cookies use SameSite=None; Secure.                                                                                                                                                                                                                                                                                                                                                  |
| [publish.yml](https://github.com/group14-aaa/zone-of-games/blob/main/.github/workflows/publish.yml)                                          | The code defines the GitHub workflow named `Generate a build and push to another branch`. It triggers on pushes to the main branch, sets environment variables for YouTube, Rawg, and Twitch APIs, checks out code, installs dependencies, sets up environment variables, builds the code, and deploys to Hostinger using Git. The workflow ensures proper configuration and deployment of the project with secrets management and version control integration.                                                                                     |
| [App.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/App.jsx)                                                                | The code in `src/App.jsx` sets up the React app with theme support using Context API. It dynamically renders routes with lazy loading, applying a theme based on user preference that persists in localStorage. It leverages React Router for navigation and suspense for loading components asynchronously. The app structure includes a PageLayout component and routes specified in RoutesPath, enhancing performance and user experience.                                                                                                       |
| [index.css](https://github.com/group14-aaa/zone-of-games/blob/main/src/index.css)                                                            | The code defines CSS variables for light and dark themes with transition effects. It includes a keyframe animation for a pulse effect and a CSS class for an orange pulsing shadow. The variables control primary colors, text colors, and more, while the animation adds visual flair to elements with the specified class.                                                                                                                                                                                                                    |
| [main.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/main.jsx)                                                              | The code in `src/main.jsx` imports React and ReactDOM to render the `<App />` component in strict mode on the root element, along with styling from index.css. The App component serves as the main entry point for the React application housed within the zone-of-games directory structure, which includes various components, pages, context, and service files for a the web application.                                                                                                                                    |
| [CollapsibleSection.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/CollapsibleSection.jsx)                       | `CollapsibleSection.jsx` defines is a React component that creates a collapsible section with a title. Users can toggle the visibility of the content by clicking on the title. The component utilizes state management with `useState` to track the collapse state and render the appropriate icon (plus or minus) based on this state. It enhances user experience by allowing interactive collapsing and expanding of content within the UI.                                                                                                     |
| [Footer.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/Footer.jsx)                                               | The `Footer.jsx` component renders the website footer with dynamic theming based on light or dark mode. It displays the site logo, resource links (About, Contact), social media links (GitHub, Discord), and legal links (Privacy Policy, Terms & Conditions). The footer also includes a copyright notice, social media icons (Facebook, Discord, Twitter, GitHub), and handles theme switching using a `ThemeContext`. This component enhances user experience by providing essential navigation and information at the bottom of the webpage. |
| [GameBanner.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/GameBanner.jsx)                                       | The `GameBanner.jsx` component renders a slideshow using Swiper library for showcasing random games. It utilizes cube effect, autoplay, and pagination features with dynamic bullets. Each slide displays game information and an image linked to its details page. Overall, it enhances the user experience by presenting an interactive and visually appealing display of game banners.                                                                                                                                                       |
| [GamePageStreams.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/GamePageStreams.jsx)                             | `GamePageStreams.jsx` displays top live streams on Twitch for a specified game. It fetches game and stream data from Twitch API, renders stream thumbnails with player options, and handles stream selection for playback. The component dynamically updates with loading indicators and handles error cases gracefully.                                                                                                                                                                                                                         |
| [Header.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/Header.jsx)                                               | The `Header.jsx` component provides a navigation bar with search functionality, dynamic theme toggling, and mobile-responsive menu options. It fetches game data based on search queries, offers autocomplete suggestions, and routes users to selected games. Users can toggle between light and dark themes, accessing Home, About, and Contact pages with icon-driven navigation. The layout adjusts for mobile and desktop views, enhancing user experience through interactive elements and clean design.                   |
| [LinksSidebar.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/LinksSidebar.jsx)                                   | The `LinksSidebar.jsx` file within the `components` directory is a component that renders links to various pages: Top Games Streaming, Top 100 Streams, and Top Rated Games. Each link is styled with hover effects and leads to a different route using React Router. This component facilitates navigation within the web application.                                                                                                                                                                                             |
| [Loading.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/Loading.jsx)                                             | The code defines a functional component called `Loading` and is responsible for displaying a loading message centered on the screen. It utilizes flexbox for layout, with the text Loading.... styled using CSS classes. This component is exported for use within the application.                                                                                                                                                                                                                                                            |
| [MainContent.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/MainContent.jsx)                                     | The `MainContent` component in the zone-of-games project displays a GameBanner, RawgGamesByGenreAndPlatformId, and pagination controls. It dynamically renders games based on genre and platform, with buttons to navigate through pages of game content. Lazy loading of components optimizes performance, while a Loading component handles loading states.                                                                                                                                                                                     |
| [NavigationSidebar.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/NavigationSidebar.jsx)                         | The code defines the `Navigation Sidebar` component in the React application. It displays collapsible sections for Genres and Platforms, allowing users to select and interact with items from each list. Users can show more or less items within each section, with dynamic styling and interactive behaviors based on user selections. The component facilitates seamless navigation and interaction with genre and platform information in a visually appealing manner.                                                                           |
| [PageLayout.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/PageLayout.jsx)                                       | The code defines the `PageLayout` component in the web application. It imports Header and Footer components, sets a custom font, and structures the layout with the header, children content, and footer within a div container.                                                                                                                                                                                                                                                                                                            |
| [RawgGamesByGenreAndPlatformId.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/RawgGamesByGenreAndPlatformId.jsx) | The `RawgGamesByGenreAndPlatformId` component renders games based on genre and platform. It displays game information, including ratings, reviews, and suggestions. Users can click on games to view details. The component dynamically fetches and updates the game list using React's state and effect hooks. Each game card features an image, name, ratings, and counts. The UI offers a visually appealing and interactive experience for browsing and selecting games within specified genre and platform criteria.                                                                                                                                                          |
| [RawgTopRatedGames.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/RawgTopRatedGames.jsx)                         | `RawgTopRatedGames` component displays top-rated games with ratings, reviews, and suggestions counts, sorted by rating. Each game card includes game details, Metacritic rating, and icons for ratings, reviews, and suggestions. The component uses React Router for navigation and various React icons for visual elements.                                                                                                                                                                                                                     |
| [RoutesPath.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/RoutesPath.jsx)                                       | The code in `RoutesPath.jsx` imports React and lazy loads various pages for a dynamic routing setup. It defines routes for Home, About, Contact, Top Rated Games, Display Game Info, Top Games Streaming, Most Viewed Streams, Streams by Game, and an Error Page. Each route maps a path to its corresponding component for navigation within the application.                                                                                                                                                                                   |
| [TwitchTopGames.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/TwitchTopGames.jsx)                               | The `TwitchTopGames` component fetches and displays top games streaming on Twitch. It makes an API call to Twitch for the data, then renders game name and image links in a responsive grid layout. Each game box includes a clickable image linking to the respective stream page.                                                                                                                                                                                                                                                               |
| [TwitchTopStreams.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/components/TwitchTopStreams.jsx)                           | The code defines a React component, `TwitchTopStreams`, displaying the top 100 most viewed live streams on Twitch. It uses the Twitch API to fetch and display streams, allowing users to click on thumbnails to watch streams. Selected streams play in a ReactPlayer component, showing streamer details and viewer count. This dynamic interface enhances user interaction with Twitch content within a React application.                                                                                                |
| [ThemeContext.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/context/ThemeContext.jsx)                                      | The code defines a `ThemeContext` in the React application using createContext from React. This context allows sharing global theme-related data across components by providing a default value of null. Other components can access and update this shared theme data using useContext from React.                                                                                                                                                                                                                                                 |
| [404.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/404.jsx)                                                          | The code in `404.jsx` defines an ErrorPage component that displays a styled 404 error message when the page is unavailable. The component includes a heading with red text, a descriptive paragraph, and is centered vertically and horizontally on the page.                                                                                                                                                                                                                                                                                     |
| [About.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/About.jsx)                                                      | The code in `About.jsx` renders the About page of the Zone of Games platform. It displays a description of the project, its vision, and lists the technologies and APIs used. The page includes links to various technologies and APIs with images and descriptions, creating an interactive and informative experience for users exploring the platform.                                                                                                                                                                                         |
| [Contact.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/Contact.jsx)                                                  | The `Contact page` displays team members with profiles and social links, allowing visitors to contact the team through a form. Team profiles include images, names, GitHub, and LinkedIn links. The page features a Contact Us section with an email input, subject field, and message textarea, enabling users to send messages. Upon submission, a modal confirms successful contact.                                                                                                                                                           |
| [Home.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/Home.jsx)                                                        | The code defines the React component `Home` that displays games by genre and platform. It fetches game data, genre and platform lists from Rawg API, handles errors, selects random games, and allows navigation and pagination. The component renders a Navigation Sidebar with genre and platform selection options and a Main Content section displaying games and relevant information. It manages state for selected genre and platform, current page, displayed genres/platforms, and error handling.                                         |
| [DisplayGameInfo.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/games/DisplayGameInfo.jsx)                            | `DisplayGameInfo.jsx` fetches game data and trailer information, displays game details, trailer, description, links, developers, genres, tags, and platforms. It handles errors and allows toggling full description view. It utilizes React, React Router, APIs, icons, and components for a dynamic game info display with interactivity.                                                                                                                                                                                                      |
| [index.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/games/top/index.jsx)                                            | The code defines a React component, `TopRatedGames`, fetching top-rated games from the RAWG API and displaying them using LinksSidebar and RawgTopRatedGames components. It manages state with useState and fetches data with useEffect. The rendered layout includes a sidebar with LinksSidebar and main content with RawgTopRatedGames, with conditional rendering based on the fetched game list.                                                                                                                                             |
| [DisplayMostViewedStreams.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/streams/DisplayMostViewedStreams.jsx)        | The code defines a React component, `DisplayMostViewedStreams`, rendering LinksSidebar and TwitchTopStreams components in a grid layout. The component displays LinksSidebar in a sidebar and TwitchTopStreams in the main content area, with responsiveness for different screen sizes.                                                                                                                                                                                                                                                          |
| [DisplayStreamsByGame.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/stream/DisplayStreamsByGame.jsx)                | The code is a React functional component that displays the most viewed live streams on Twitch for a specific game. It fetches the top streams using the Twitch API and populates the component with the stream data. The component includes a grid layout, the game name, and thumbnail images for each stream. Clicking on a thumbnail starts playing the stream. The component also shows the streamer's username and the number of viewers. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [index.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/pages/streams/index.jsx)                                              | The code defines a React component for displaying top streaming games. It includes links to navigate between different streaming sections and utilizes the TwitchTopGames component to display the top games being streamed. The layout is responsive, with a grid structure divided into sections for navigation links and displaying streaming content.                                                                                                                                                                                       |
| [rawgApi.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/services/rawgApi.jsx)                                               | The code in `rawgApi.jsx` generates API requests to fetch game data from the Rawg API. It includes functions for fetching genre and platform lists, all games, game data by ID, games by genre and platform, games by platform, and searching for games. The requests are constructed using Axios with the base URL set to Rawg's API endpoint. The API key is included using `import.meta.env.VITE_RAWG_API_KEY`.                                                                                                                                |
| [twitchApi.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/services/twitchApi.jsx)                                           | The code in `twitchApi.jsx` sets up an Axios instance for Twitch API requests. It includes functions to get top games, streams, game ID, and streams by game ID. The instance is configured with the Twitch API base URL and required headers using client ID and OAuth token from environment variables. The functions utilize this instance to make Twitch API calls and are exported for use in the project.                                                                                                                                 |
| [youtubeAPI.jsx](https://github.com/group14-aaa/zone-of-games/blob/main/src/services/youtubeAPI.jsx)                                         | The code in `youtubeAPI.jsx` fetches game trailers using the YouTube Data API. It defines a function getGameTrailer, which searches for a game trailer based on the provided gameName. If found, it returns the trailer URL; otherwise, it throws an error. The function uses axios to make API requests, with params including the game name and YouTube API key. Any errors during the process are caught and rethrown with appropriate messages.                                                                                               |

</details>                                                                                     |


---

## 🚀 Getting Started


### 🔧 Installation

1. Clone the zone-of-games repository:
```sh
git clone https://github.com/group14-aaa/zone-of-games
```

2. Change to the project directory:
```sh
cd zone-of-games
```

3. Install the dependencies:
```sh
npm install
```

### 🤖 Running zone-of-games

```sh
npm run dev
```

### 🧪 Tests
```sh
N/A
```

---
### 🌐 Live Demo Zone of Games
- ► [Zone of Games Demo](https://zoneofgames.co.uk)
- ► [Demo Presentation Google Slides](https://rebrand.ly/zoguk)


### 📸 Screenshot Zone of Games
![Screenshot Zone of Games](./public/screenshots/zoneofgames_1.png?raw=true "zone-of-games")
![Screenshot Zone of Games](./public/screenshots/zoneofgames.co.uk_games_1.png "zone-of-games")
![Screenshot Zone of Games](./public/screenshots/zoneofgames.co.uk_streams_1.png "zone-of-games")
![Screenshot Zone of Games](./public/screenshots/zoneofgames.co.uk_streams_2.png "zone-of-games")

---


## 🛣 Project Roadmap

> - [ ] `ℹ️  Coming Soon`



---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/group14-aaa/zone-of-games/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/group14-aaa/zone-of-games/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/group14-aaa/zone-of-games/issues)**: Submit bugs found or log feature requests for GROUP14-AAA.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License


Copyright © 2024
- Mihai Pirvu ([@pmAdriaan](https://github.com/pmAdriaan/))
- Adam Riley ([@adampriley1](https://github.com/adampriley1/))
- Anjal Sali ([@anjalsali](https://github.com/anjalsali/))
- Chris Di Luca ([@Revan369](https://github.com/Revan369/))

This project is licensed under the `ℹ️ MIT-License`. See the [MIT License](https://github.com/group14-aaa/zone-of-games/blob/main/LICENSE) file for additional info.

[**Return**](#Top)

---

## 👏 Acknowledgments

- Pratikto Ariestyadi - Instructor
- Mahyar Mottaghi Zadeh - TA

[**Return**](#Top)

---
