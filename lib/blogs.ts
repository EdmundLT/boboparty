import { BlogPost } from '@/types'
import type { Locale } from '@/i18n.config'

// List of available blog post slugs - add new posts here
const BLOG_POST_SLUGS = [
  'party-balloon-guide',
  'birthday-party-ideas',
  'simple-party-tips',
]

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const lang = locale === 'zh-TW' ? 'zh-TW' : 'en'
  const posts: BlogPost[] = []

  for (const slug of BLOG_POST_SLUGS) {
    try {
      const post = await getBlogPost(slug, locale)
      if (post) {
        posts.push(post)
      }
    } catch (error) {
      console.error(`Error loading blog post ${slug}:`, error)
    }
  }

  // Sort by published date, newest first
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPost(slug: string, locale: Locale): Promise<BlogPost | null> {
  const lang = locale === 'zh-TW' ? 'zh-TW' : 'en'

  try {
    const post = await import(`@/data/blogs/${lang}/${slug}.json`)
    return post.default
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    return null
  }
}

export function generateBlogMetadata(post: BlogPost, locale: Locale) {
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.join(', '),
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}
