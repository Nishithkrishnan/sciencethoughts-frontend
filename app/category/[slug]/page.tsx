async function getPostsByCategory(slug: string) {
  // First get category ID
  const catRes = await fetch(
    `https://sciencethoughts.com/wp-json/wp/v2/categories?slug=${slug}`
  );
  const catData = await catRes.json();

  if (!catData.length) return [];

  const catId = catData[0].id;

  // Fetch posts
  const res = await fetch(
    `https://sciencethoughts.com/wp-json/wp/v2/posts?categories=${catId}&_embed`
  );

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);

  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ marginBottom: "30px", textTransform: "uppercase" }}>
        {slug}
      </h1>

      {posts.map((post: any) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <a href={`/posts/${post.id}`}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </a>
        </div>
      ))}
    </main>
  );
}