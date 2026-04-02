// Post
export interface Post {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  content: string;
}

// FeaturedPost
export interface FeaturedPostProps {
  post: Post;
  visible: boolean;
}

// BlogPostCard
export interface BlogPostCardProps {
  post: Post;
  index: number;
  visible: boolean;
}
