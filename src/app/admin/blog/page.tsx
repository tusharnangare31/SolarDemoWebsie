'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, FileText, Check, Calendar, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable, { Column } from '@/components/admin/DataTable';
import DeleteModal from '@/components/admin/DeleteModal';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { BlogPostItem } from '@/lib/db';

const categories = ['Solar Benefits', 'Government Schemes', 'Maintenance', 'Technology', 'Industry News'];

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPostItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPostItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('SunTech Solar Team');
  const [published, setPublished] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (res.ok) setPosts(data);
    } catch {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('<h2>Article Heading</h2>\n<p>Write your article text here...</p>');
    setCategory(categories[0]);
    setCoverImage('');
    setAuthor('SunTech Solar Team');
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: BlogPostItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setCategory(item.category);
    setCoverImage(item.cover_image || '');
    setAuthor(item.author || 'SunTech Solar Team');
    setPublished(item.published ?? true);
    setIsModalOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingItem) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      category,
      cover_image: coverImage,
      author,
      published,
    };

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch('/api/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingItem ? 'Post updated!' : 'Post published!');
        setIsModalOpen(false);
        fetchPosts();
      } else {
        toast.error('Failed to save post');
      }
    } catch {
      toast.error('Network error saving post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Post deleted');
        setDeleteTarget(null);
        fetchPosts();
      } else {
        toast.error('Failed to delete post');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const togglePublish = async (post: BlogPostItem) => {
    try {
      const res = await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, published: !post.published }),
      });
      if (res.ok) {
        toast.success(`Post marked as ${!post.published ? 'Published' : 'Draft'}`);
        fetchPosts();
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const columns: Column<BlogPostItem>[] = [
    {
      header: 'Article Title',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
            {item.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <FileText className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
            <p className="text-xs text-gray-400 font-mono">/blog/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (item) => (
        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
          {item.category}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: (item) => (
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(item.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (item) => (
        <button
          onClick={() => togglePublish(item)}
          className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
            item.published
              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Click to toggle status"
        >
          {item.published ? 'Published' : 'Draft'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Blog Manager</h1>
          <p className="text-sm text-gray-500">
            Write, edit, and publish solar educational guides & company news
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow shadow-primary/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading articles...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={posts}
          searchKey="title"
          searchPlaceholder="Search articles..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <a
                href={`/blog/${item.slug}`}
                target="_blank"
                className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                title="View live post"
              >
                <Eye className="w-4 h-4" />
              </a>
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                title="Edit post"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}

      {/* Modal / Full Post Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">
              {editingItem ? 'Edit Blog Article' : 'Write New Article'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Compose rich article content with formatting, images, and categories
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Post Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Complete Guide to Solar Subsidies in India"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. complete-guide-solar-subsidies"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief preview text shown on cards and in search previews..."
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <ImageUploader label="Cover Header Image" value={coverImage} onChange={setCoverImage} />

              {/* Rich Text Editor */}
              <RichTextEditor
                label="Article Body (Rich Text Editor)"
                value={content}
                onChange={setContent}
              />

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    Publish immediately to live site
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow transition-colors flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.title}"?`}
        message="This blog article will be permanently removed from your website."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
