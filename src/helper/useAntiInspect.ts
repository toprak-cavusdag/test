import { useEffect } from "react";

const useAntiInspect = () => {
  useEffect(() => {
    
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const preventTouchHold = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchstart", preventTouchHold, { passive: false });
    document.addEventListener("touchmove", preventTouchHold, { passive: false });
    document.addEventListener("touchend", preventTouchHold, { passive: false });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", preventTouchHold);
      document.removeEventListener("touchmove", preventTouchHold);
      document.removeEventListener("touchend", preventTouchHold);
    };
  }, []);
};

export default useAntiInspect;