import { pageMetadata } from '@/lib/seo';
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blogs";
import BlogCard from "@/components/BlogCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return pageMetadata(lang, "/blog", dict.blog.title, dict.blog.subtitle);
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === 'zh-TW' ? '' : '/en';
  const posts = await getBlogPosts(lang);

  return (
    <div className="min-h-screen bg-[#f7f2e9]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-12 max-w-3xl border-b border-[#173f5f]/15 pb-10">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">
            <span className="h-px w-8 bg-[#ef6f61]" />
            01 / Party ideas
          </p>
          <h1 className="text-5xl font-black tracking-[-0.06em] text-[#173f5f] sm:text-6xl">{dict.blog.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#66717b]">{dict.blog.subtitle}</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} baseUrl={baseUrl} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-[#173f5f]/20 bg-white/60 py-16 text-center">
            <p className="text-lg font-semibold text-[#66717b]">{dict.blog.noPosts}</p>
          </div>
        )}
      </div>
    </div>
  );
}
