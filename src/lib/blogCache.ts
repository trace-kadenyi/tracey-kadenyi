import type { Post } from "@/types";

let cachedPosts: Post[] | null = null;

export function getCachedPosts() {
  return cachedPosts;
}

export function setCachedPosts(posts: Post[]) {
  // Never cache an empty result, or one failure sticks for the whole visit.
  if (posts.length > 0) cachedPosts = posts;
}
