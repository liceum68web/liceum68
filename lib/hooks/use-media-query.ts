"use client";

import { useState, useEffect } from "react";

export const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const documentChangeHandler = () => setIsMatch(mediaQueryList.matches);

    // Initial check
    documentChangeHandler();

    // Listen for changes
    mediaQueryList.addEventListener("change", documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]);

  return { isMatch };
};
