import { useEffect, useState } from "react";

const REFERENCE_WIDTH = 1920;
const MOBILE_THRESHOLD = 990;

export const useMobile = () => {
  //a rerender occurs when scaleFactor or isMobile changes
  const [scaleFactor, setScaleFactor] = useState(
    window.innerWidth / REFERENCE_WIDTH
  );
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_THRESHOLD
  );

  //listen to resize event to update the values
  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(window.innerWidth / REFERENCE_WIDTH);
      if (window.innerWidth <= MOBILE_THRESHOLD) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    scaleFactor,
    isMobile,
  };
};
