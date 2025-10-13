import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import { getBlogPost, generateBlogMetadata } from "@/lib/blogs";
import RichTextRenderer from "@/components/RichTextRenderer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ lang: Locale; slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const post = await getBlogPost(slug, lang);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return generateBlogMetadata(post, lang);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const baseUrl = lang === 'zh-TW' ? '' : '/en';
  const post = await getBlogPost(slug, lang);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    params.lang === 'zh-TW' ? 'zh-HK' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {post.featuredImage && (
        <div className="relative h-96 bg-gray-900">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b">
          <div className="flex items-center gap-4 text-gray-600">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
          <Link
            href={`${baseUrl}/blog`}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← {dict.blog.backToList}
          </Link>
        </div>

        {/* Rich Text Content */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <RichTextRenderer content={post.content} />
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            {params.lang === 'zh-TW' ? '準備策劃您的派對？' : 'Ready to Plan Your Party?'}
          </h3>
          <p className="mb-6">
            {params.lang === 'zh-TW'
              ? '了解更多關於 BoboParty，讓我們幫您打造難忘的派對體驗'
              : 'Learn more about BoboParty and let us create an unforgettable party experience for you'}
          </p>
          <Link
            href={`${baseUrl}/about`}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {params.lang === 'zh-TW' ? '了解更多' : 'Learn More'}
          </Link>
        </div>
      </article>
    </div>
  );
}
