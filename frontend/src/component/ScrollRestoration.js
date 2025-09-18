// src/components/ScrollRestoration.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const pathname = location.pathname;

    // Restore scroll position if it exists
    if (scrollPositions.current[pathname] !== undefined) {
      window.scrollTo(0, scrollPositions.current[pathname]);
    }

    const handleScroll = () => {
      scrollPositions.current[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return null;
};

export default ScrollRestoration;
