import PostsClient from "./PostsClient"; // or "@/components/PostsClient"

export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    // 1. Try to fetch the data
    const res = await fetch("https://sciencethoughts.com/wp-json/wp/v2/posts?_embed", { 
      next: { revalidate: 60 } 
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const posts = await res.json();
    
    // If posts is not an array (API error), throw error to trigger catch block
    if (!Array.isArray(posts)) {
      throw new Error("API did not return an array of posts");
    }

    return <PostsClient posts={posts} />;

  } catch (error) {
    console.error("Critical Fetch Error:", error);

    // 2. SAFETY NET: If the fetch fails, show the site with EMPTY posts 
    // instead of crashing the whole page with a "Server Error" screen.
    return <PostsClient posts={[]} />; 
  }
}
