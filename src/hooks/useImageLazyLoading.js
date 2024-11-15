// Görsel lazy loading için custom hook
import { useState, useEffect } from "react";
export const useImageLazyLoading = (imageUrl) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const img = new Image();
      img.src = imageUrl;
  
      img.onload = () => {
        setLoaded(true);
      };
  
      img.onerror = () => {
        setError(true);
      };
    }, [imageUrl]);
  
    return { loaded, error };
  };
  