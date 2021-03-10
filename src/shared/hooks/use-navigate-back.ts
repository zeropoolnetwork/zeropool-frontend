import { useEffect, useRef } from 'react';

// Intercepts browser's Navigate Back event
export const useNavigateBack = (callback: Function): void => {
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      window.addEventListener('popstate', function(event) {
        window.history.pushState(null, '', document.URL);
        callback();
      }, false);
    } else {
      // Fix browser history
      window.history.pushState(null, '', document.URL);
    }
  }, [callback]);
}