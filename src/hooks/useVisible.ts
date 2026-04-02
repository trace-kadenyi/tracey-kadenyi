import { useState, useEffect } from "react";

export function useVisible(
  ref: React.RefObject<HTMLDivElement | null>,
  threshold: number = 0.15,
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return visible;
}
