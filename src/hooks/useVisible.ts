import { useState, useEffect } from "react";

export function useVisible(
  ref: React.RefObject<HTMLDivElement | null>,
  threshold: number = 0.15,
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold },
    );

    obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold, ref]);

  return visible;
}
