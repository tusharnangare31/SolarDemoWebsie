'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Star, Check, User } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable, { Column } from '@/components/admin/DataTable';
import DeleteModal from '@/components/admin/DeleteModal';
import ImageUploader from '@/components/admin/ImageUploader';
import { TestimonialItem } from '@/lib/db';

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [systemType, setSystemType] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (res.ok) setTestimonials(data);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setLocation('');
    setSystemType('5 kW Residential');
    setRating(5);
    setMessage('');
    setPhoto('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setLocation(item.location);
    setSystemType(item.system_type);
    setRating(item.rating || 5);
    setMessage(item.message);
    setPhoto(item.photo || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      name,
      location,
      system_type: systemType,
      rating,
      message,
      photo,
    };

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch('/api/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (data?.demo) {
        toast.success('Demo Mode Activated: Review simulated!', { icon: '🔒' });
        setIsModalOpen(false);
      } else if (res.ok) {
        toast.success(editingItem ? 'Review updated!' : 'Review added!');
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        toast.error('Failed to save testimonial');
      }
    } catch {
      toast.error('Network error saving review');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/testimonials?id=${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (data?.demo) {
        toast.success('Demo Mode Activated: Delete simulated!', { icon: '🔒' });
        setDeleteTarget(null);
      } else if (res.ok) {
        toast.success('Testimonial removed');
        setDeleteTarget(null);
        fetchTestimonials();
      } else {
        toast.error('Failed to delete review');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const columns: Column<TestimonialItem>[] = [
    {
      header: 'Customer',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
            {item.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              item.name.charAt(0)
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-400">
              {item.location} • {item.system_type}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Rating',
      accessor: (item) => (
        <div className="flex items-center gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < item.rating ? 'fill-amber-500' : 'text-gray-300 fill-gray-200'
              }`}
            />
          ))}
        </div>
      ),
    },
    {
      header: 'Review Message',
      accessor: (item) => (
        <p className="text-xs text-gray-600 line-clamp-2 max-w-sm italic">
          &ldquo;{item.message}&rdquo;
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Customer Testimonials</h1>
          <p className="text-sm text-gray-500">
            Manage customer feedback and ratings displayed on the homepage
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow shadow-primary/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading reviews...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={testimonials}
          searchKey="name"
          searchPlaceholder="Search by customer name..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                title="Edit review"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">Enter customer feedback and ratings</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rakesh Agarwal"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    System Type
                  </label>
                  <input
                    type="text"
                    required
                    value={systemType}
                    onChange={(e) => setSystemType(e.target.value)}
                    placeholder="e.g. 10 kW Residential"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Rating ({rating} Stars)
                  </label>
                  <div className="flex items-center gap-1 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            s <= rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ImageUploader label="Customer Photo (Optional)" value={photo} onChange={setPhoto} />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Review Text
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share the customer's quote..."
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
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
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete review from "${deleteTarget?.name}"?`}
        message="This testimonial will be removed from your website carousel."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
