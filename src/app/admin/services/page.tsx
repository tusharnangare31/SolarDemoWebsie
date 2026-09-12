'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Wrench, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable, { Column } from '@/components/admin/DataTable';
import DeleteModal from '@/components/admin/DeleteModal';
import ImageUploader from '@/components/admin/ImageUploader';
import { ServiceItem } from '@/lib/db';

export default function ServicesManagerPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Home');
  const [image, setImage] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      if (res.ok) setServices(data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setIcon('Home');
    setImage('');
    setFeaturesText('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description);
    setIcon(item.icon || 'Home');
    setImage(item.image || '');
    setFeaturesText((item.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      icon,
      image,
      features,
    };

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch('/api/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (data?.demo) {
        toast.success('Demo Mode Activated: Service simulated!', { icon: '🔒' });
        setIsModalOpen(false);
      } else if (res.ok) {
        toast.success(editingItem ? 'Service updated!' : 'Service created!');
        setIsModalOpen(false);
        fetchServices();
      } else {
        toast.error('Failed to save service');
      }
    } catch {
      toast.error('Network error saving service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/services?id=${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (data?.demo) {
        toast.success('Demo Mode Activated: Delete simulated!', { icon: '🔒' });
        setDeleteTarget(null);
      } else if (res.ok) {
        toast.success('Service deleted');
        setDeleteTarget(null);
        fetchServices();
      } else {
        toast.error('Failed to delete service');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const columns: Column<ServiceItem>[] = [
    {
      header: 'Service Title',
      accessor: (item) => (
        <div>
          <p className="font-semibold text-gray-900">{item.title}</p>
          <p className="text-xs text-gray-400 font-mono">/services/{item.slug}</p>
        </div>
      ),
    },
    {
      header: 'Description',
      accessor: (item) => (
        <p className="text-xs text-gray-600 line-clamp-2 max-w-md">{item.description}</p>
      ),
    },
    {
      header: 'Features',
      accessor: (item) => (
        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-primary font-medium">
          {item.features?.length || 0} features
        </span>
      ),
    },
    {
      header: 'Icon',
      accessor: (item) => (
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
          {item.icon}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Services Manager</h1>
          <p className="text-sm text-gray-500">
            Create and edit solar service packages displayed on the public site
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow shadow-primary/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading services...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={services}
          searchKey="title"
          searchPlaceholder="Search services..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                title="Edit service"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">
              {editingItem ? 'Edit Service' : 'Create New Service'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">Enter service specifications and key benefits</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Residential Solar"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. residential"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of the solar service..."
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Icon Name
                  </label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="Home">Home (Residential)</option>
                    <option value="Building2">Building2 (Commercial)</option>
                    <option value="Factory">Factory (Industrial)</option>
                    <option value="Zap">Zap (Hybrid/Power)</option>
                    <option value="Wrench">Wrench (Maintenance)</option>
                    <option value="Sun">Sun (Solar)</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                label="Cover Image (Optional)"
                value={image}
                onChange={setImage}
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Bullet Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Rooftop solar panel installation&#10;Net metering setup assistance&#10;25-year performance warranty"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
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
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.title}"?`}
        message="This service will be removed from your public website and service overview sections."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
