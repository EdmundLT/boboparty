import Image from 'next/image'
import type { BlogContent } from '@/types'

type RichTextRendererProps = {
  content: BlogContent[]
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
            return (
              <HeadingTag
                key={index}
                className={`font-bold mt-8 mb-4 ${
                  block.level === 1
                    ? 'text-4xl'
                    : block.level === 2
                    ? 'text-3xl'
                    : 'text-2xl'
                }`}
              >
                {block.text}
              </HeadingTag>
            )

          case 'paragraph':
            return (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {block.text}
              </p>
            )

          case 'image':
            return (
              <figure key={index} className="my-8">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          case 'list':
            const ListTag = block.ordered ? 'ol' : 'ul'
            return (
              <ListTag
                key={index}
                className={`my-6 space-y-2 ${
                  block.ordered ? 'list-decimal' : 'list-disc'
                } list-inside text-gray-700`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ListTag>
            )

          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-8 pl-6 border-l-4 border-blue-500 italic"
              >
                <p className="text-xl text-gray-800 mb-2">{block.text}</p>
                {block.author && (
                  <cite className="text-sm text-gray-600 not-italic">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            )

          case 'divider':
            return (
              <hr key={index} className="my-8 border-t-2 border-gray-200" />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
