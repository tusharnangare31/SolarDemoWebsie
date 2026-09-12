'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  value,
  onChange,
  options,
}: FormFieldProps) {
  const baseInputStyles =
    'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-dark placeholder-gray-400';
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '';

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          rows={4}
          className={`${baseInputStyles} ${errorStyles} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseInputStyles} ${errorStyles}`}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseInputStyles} ${errorStyles}`}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
