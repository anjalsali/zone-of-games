import { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { BrowseSidebarProvider } from "./context/BrowseSidebarContext";
import '@fontsource/montserrat';

// Components
import PageLayout from "./components/PageLayout";
import routes from "./components/RoutesPath";
import Loading from "./components/Loading";

const App = () => {
   const [theme, setTheme] = useState(() =>
      localStorage.getItem("theme") || "dark");

   const getThemeClassName = () => `${theme} page-shell`;

   // Update document root class when theme changes
   useEffect(() => {
      document.documentElement.className = theme;
   }, [theme]);

   return (
      <Router>
         <ThemeContext.Provider value={{ theme, setTheme }}>
            <BrowseSidebarProvider>
               <Routes>
                  {routes.map(({ path, component: Component }) => (
                     <Route
                        key={path}
                        path={path}
                        element={
                           <div className={getThemeClassName()}>
                              <PageLayout>
                                 <Suspense fallback={<Loading />}>
                                    <Component />
                                 </Suspense>
                              </PageLayout>
                           </div>
                        }
                     />
                  ))}
               </Routes>
            </BrowseSidebarProvider>
         </ThemeContext.Provider>
      </Router>
   );
}

export default App;
