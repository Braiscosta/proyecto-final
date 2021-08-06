import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollControl = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // document.body.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollControl;
