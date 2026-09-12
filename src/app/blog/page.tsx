'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Loader2, FileText } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { BlogPostItem } from '@/lib/db';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter published posts
          setPosts(data.filter((p: BlogPostItem) => p.published));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28">
      <section className="py-16 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Solar Energy Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Insights, tips, and news about solar energy, government subsidies, and technology in India
          </p>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading solar articles...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id || post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Image placeholder */}
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-accent-green/10 flex items-center justify-center relative overflow-hidden">
                      {post.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="w-8 h-8 text-primary/40 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {post.category}
                      </span>
                      <h2 className="text-lg font-bold font-heading text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.read_time || '5 min read'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-gray-600">No published articles yet</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
