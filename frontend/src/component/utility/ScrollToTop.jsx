import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const navType = useNavigationType();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // Scroll only if pathname truly changed and it's a PUSH navigation
    if (location.pathname !== prevPath.current && navType === 'PUSH') {
      window.scrollTo(0, 0);
    }

    // Update previous pathname
    prevPath.current = location.pathname;
  }, [location.pathname, navType]);

  return null;
};

export default ScrollToTop;

