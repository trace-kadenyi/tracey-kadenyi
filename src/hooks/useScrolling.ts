let isScrolling = false;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

export function setScrolling(value: boolean) {
  isScrolling = value;
}

export function getScrolling() {
  return isScrolling;
}

export function startScrolling() {
  isScrolling = true;
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 1000); // clear after scroll should be done
}
