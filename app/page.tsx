// app/page.tsx (Server Component)
import PostsClient from "./PostsClient";

export default async function Home() {
  // Fetching from your WordPress API
  const res = await fetch("https://sciencethoughts.com/wp-json/wp/v2/posts?_embed");
  const posts = await res.json();

  return <PostsClient posts={posts} />;
}