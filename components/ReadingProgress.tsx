import PostsClient from "./posts-client";

async function getPosts() {
  const res = await fetch(
    "https://sciencethoughts.com/wp-json/wp/v2/posts?_embed",
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return <PostsClient posts={posts} />;
}