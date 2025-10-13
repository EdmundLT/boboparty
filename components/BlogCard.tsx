import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/types'

type BlogCardProps = {
  post: BlogPost
  baseUrl: string
}

export default function BlogCard({ post, baseUrl }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('zh-HK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Link
      href={`${baseUrl}/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      <div className="p-6">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">{post.author}</span>
          <span className="text-gray-400">{formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}
