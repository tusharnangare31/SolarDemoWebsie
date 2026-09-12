import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const db = await getDb();
    const post = db.blog_posts.find((p) => p.slug === slug);
    if (!post) return { title: 'Post Not Found' };
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await getDb();
  const post = db.blog_posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const otherPosts = db.blog_posts.filter((p) => p.slug !== slug && p.published).slice(0, 2);

  return (
    <div className="pt-28">
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-dark mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {post.author || 'SunTech Solar Team'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(post.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {post.read_time || '5 min read'}
              </span>
            </div>
          </div>

          {/* Featured image */}
          <div className="h-64 md:h-96 bg-gradient-to-br from-primary/10 to-accent-green/10 rounded-2xl mb-10 flex items-center justify-center overflow-hidden border border-gray-100">
            {post.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-primary/30">
                <FileText className="w-16 h-16 mx-auto mb-2" />
                <p className="text-sm font-semibold">SunTech Solar Engineering Insights</p>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-dark prose-a:text-primary hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-light border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-heading text-dark mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.id || p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-all group border border-gray-100"
                >
                  <span className="text-xs text-primary font-semibold">{p.category}</span>
                  <h3 className="font-semibold text-dark mt-2 group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
