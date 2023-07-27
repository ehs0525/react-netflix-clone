import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const eventListener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;

      handler();
    };

    document.addEventListener("mousedown", eventListener);
    document.addEventListener("touchstart", eventListener);

    return () => {
      document.removeEventListener("mousedown", eventListener);
      document.removeEventListener("touchstart", eventListener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
