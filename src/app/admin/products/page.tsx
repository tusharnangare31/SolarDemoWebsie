'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable, { Column } from '@/components/admin/DataTable';
import DeleteModal from '@/components/admin/DeleteModal';
import ImageUploader from '@/components/admin/ImageUploader';
import { ProductItem } from '@/lib/db';

const categories = ['Solar Panels', 'Inverters', 'Batteries', 'Mounting Structures'];

export default function ProductsManagerPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [specsText, setSpecsText] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('0');
  const [isEnquireOnly, setIsEnquireOnly] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setCategory(categories[0]);
    setDescription('');
    setSpecsText('');
    setImage('');
    setPrice('0');
    setIsEnquireOnly(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ProductItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setDescription(item.description);
    setSpecsText((item.specs || []).join('\n'));
    setImage(item.image || '');
    setPrice(item.price ? item.price.toString() : '0');
    setIsEnquireOnly(item.is_enquire_only ?? true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const specs = specsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      name,
      category,
      description,
      specs,
      image,
      price: Number(price) || 0,
      is_enquire_only: isEnquireOnly,
    };

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingItem ? 'Product updated!' : 'Product created!');
        setIsModalOpen(false);
        fetchProducts();
      } else {
        toast.error('Failed to save product');
      }
    } catch {
      toast.error('Network error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/products?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product removed');
        setDeleteTarget(null);
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const columns: Column<ProductItem>[] = [
    {
      header: 'Product Name',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <ShoppingBag className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{item.name}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-primary font-medium">
              {item.category}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Key Specs',
      accessor: (item) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {item.specs?.slice(0, 3).map((spec, i) => (
            <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
              {spec}
            </span>
          ))}
          {(item.specs?.length || 0) > 3 && (
            <span className="text-[11px] text-gray-400">+{item.specs.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      header: 'Pricing',
      accessor: (item) => (
        <div>
          {item.price > 0 ? (
            <p className="font-bold text-gray-900 text-sm">₹{item.price.toLocaleString('en-IN')}</p>
          ) : (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
              Enquire for Price
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Products Catalog</h1>
          <p className="text-sm text-gray-500">
            Manage solar panels, inverters, batteries, and mounting structures
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow shadow-primary/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading catalog...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProducts}
          searchKey="name"
          searchPlaceholder="Search products by model..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                title="Edit product"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete product"
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
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">
              {editingItem ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">Enter equipment details, specs and photos</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Product Model / Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. MonoCrystalline 545W Panel"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key features and applications..."
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                />
              </div>

              <ImageUploader label="Product Image" value={image} onChange={setImage} />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Key Specifications (One per line)
                </label>
                <textarea
                  rows={4}
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  placeholder="545 Wp&#10;Mono PERC&#10;21.3% Efficiency&#10;25-Year Warranty"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Price (₹) - Optional
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div className="pt-5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEnquireOnly}
                      onChange={(e) => setIsEnquireOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-semibold text-gray-700">
                      Show &quot;Enquire Now&quot; button
                    </span>
                  </label>
                </div>
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
                  {saving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This product will be permanently removed from your website catalog."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
