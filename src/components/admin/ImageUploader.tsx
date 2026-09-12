'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export default function ImageUploader({
  label = 'Image',
  value,
  onChange,
  helperText = 'PNG, JPG, WebP up to 5MB',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch {
      toast.error('Network error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>}

      {value ? (
        <div className="relative group w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <div className="h-44 w-full relative flex items-center justify-center bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-primary rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-blue-50/20"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
              <p className="text-sm font-medium text-gray-700">Uploading image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Click to upload <span className="text-gray-400 font-normal">or drag & drop</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{helperText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
