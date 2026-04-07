import type { Post } from "@/types";

let cachedPosts: Post[] | null = null;

export function getCachedPosts() {
  return cachedPosts;
}

export function setCachedPosts(posts: Post[]) {
  cachedPosts = posts;
}
