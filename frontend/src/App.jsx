import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Routers from "./routers/Routers";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Save scroll position before navigating
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scrollPos-${location.pathname}`, window.scrollY);
    };

    // Restore scroll position after navigating
    const restoreScrollPosition = () => {
      const savedScrollPos = sessionStorage.getItem(`scrollPos-${location.pathname}`);
      if (savedScrollPos) {
        window.scrollTo(0, parseInt(savedScrollPos, 10));
      } else {
        window.scrollTo(0, 0); // Default to top if no saved position
      }
    };

    // Save current scroll position before unload
    window.addEventListener('beforeunload', saveScrollPosition);

    // Restore scroll position on location change
    restoreScrollPosition();

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location.pathname]);

  return (
    <Routers />
  );
}

export default App;