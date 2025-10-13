import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import { getBlogPosts } from "@/lib/blogs";
import BlogCard from "@/components/BlogCard";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = lang === 'zh-TW' ? '' : '/en';
  const posts = await getBlogPosts(lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{dict.blog.title}</h1>
          <p className="text-xl text-gray-600">{dict.blog.subtitle}</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} baseUrl={baseUrl} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{dict.blog.noPosts}</p>
          </div>
        )}
      </div>
    </div>
  );
}
