'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Briefcase, Check, MapPin, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable, { Column } from '@/components/admin/DataTable';
import DeleteModal from '@/components/admin/DeleteModal';
import ImageUploader from '@/components/admin/ImageUploader';
import { ProjectItem } from '@/lib/db';

const types = ['Residential', 'Commercial', 'Industrial'] as const;

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [capacityKw, setCapacityKw] = useState('');
  const [type, setType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [clientType, setClientType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (res.ok) setProjects(data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setLocation('');
    setCapacityKw('');
    setType('Residential');
    setClientType('');
    setDescription('');
    setImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: ProjectItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setLocation(item.location);
    setCapacityKw(item.capacity_kw);
    setType(item.type);
    setClientType(item.client_type);
    setDescription(item.description);
    setImage(item.image || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      title,
      location,
      capacity_kw: capacityKw.includes('kW') || capacityKw.includes('MW') ? capacityKw : `${capacityKw} kW`,
      type,
      client_type: clientType,
      description,
      image,
    };

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingItem ? 'Project updated!' : 'Project created!');
        setIsModalOpen(false);
        fetchProjects();
      } else {
        toast.error('Failed to save project');
      }
    } catch {
      toast.error('Network error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/projects?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Project deleted');
        setDeleteTarget(null);
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const filteredProjects =
    selectedType === 'All' ? projects : projects.filter((p) => p.type === selectedType);

  const columns: Column<ProjectItem>[] = [
    {
      header: 'Project Title',
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <Briefcase className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {item.location}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Capacity',
      accessor: (item) => (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-primary">
          <Zap className="w-3 h-3" /> {item.capacity_kw}
        </span>
      ),
    },
    {
      header: 'Sector',
      accessor: (item) => (
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            item.type === 'Residential'
              ? 'bg-emerald-50 text-emerald-700'
              : item.type === 'Commercial'
              ? 'bg-blue-50 text-primary'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {item.type}
        </span>
      ),
    },
    {
      header: 'Client Type',
      accessor: (item) => (
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
          {item.client_type}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Projects Portfolio</h1>
          <p className="text-sm text-gray-500">
            Showcase completed residential, commercial, and industrial installations
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow shadow-primary/20 hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedType('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            selectedType === 'All'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All ({projects.length})
        </button>
        {types.map((t) => {
          const count = projects.filter((p) => p.type === t).length;
          return (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedType === t
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading projects...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProjects}
          searchKey="title"
          searchPlaceholder="Search projects by name..."
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                title="Edit project"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete project"
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
              {editingItem ? 'Edit Project' : 'Add New Project'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">Enter project details and capacity metrics</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. GreenTech Office Complex Rooftop"
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Sector / Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value as 'Residential' | 'Commercial' | 'Industrial')
                    }
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    {types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Capacity (e.g. 150 kW or 1 MW)
                  </label>
                  <input
                    type="text"
                    required
                    value={capacityKw}
                    onChange={(e) => setCapacityKw(e.target.value)}
                    placeholder="e.g. 50 kW"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Location (City, State)
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

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Client Type
                  </label>
                  <input
                    type="text"
                    required
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    placeholder="e.g. Corporate Office, Villa"
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              <ImageUploader label="Project Photo" value={image} onChange={setImage} />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Brief Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of system design, net metering, and installation..."
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
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete "${deleteTarget?.title}"?`}
        message="This project will be permanently removed from your portfolio gallery."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
