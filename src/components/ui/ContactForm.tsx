'use client';

import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './Button';
import FormField from './FormField';

interface ContactFormProps {
  compact?: boolean;
  title?: string;
  subtitle?: string;
  sourcePage?: string;
  systemSizeEstimate?: string;
  monthlyBill?: string;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
}

export default function ContactForm({
  compact = false,
  title,
  subtitle,
  sourcePage = 'Contact Page',
  systemSizeEstimate,
  monthlyBill,
  onSuccess,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_page: sourcePage,
          system_size_estimate: systemSizeEstimate,
          monthly_bill: monthlyBill,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Thank you! We've received your request and will call you within 24 hours.", {
          duration: 5000,
          style: { background: '#0056b3', color: '#fff' },
        });
        setFormData({ name: '', phone: '', email: '', location: '', message: '' });
        if (onSuccess) onSuccess();
      } else {
        toast.error(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      toast.error('Network error. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={compact ? '' : 'bg-white rounded-2xl shadow-lg p-6 md:p-8'}>
      {title && <h3 className="text-2xl font-bold font-heading text-dark mb-2">{title}</h3>}
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className={compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 gap-x-4'}>
          <FormField
            label="Full Name"
            name="name"
            placeholder="Your full name"
            required
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            required
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="your@email.com (optional)"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="City / Location"
            name="location"
            placeholder="e.g. Jaipur, Rajasthan"
            required
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
          />
        </div>
        {!compact && (
          <FormField
            label="Requirements / Roof Details"
            name="message"
            type="textarea"
            placeholder="e.g. 5kW rooftop system for 3BHK home with subsidy assistance..."
            value={formData.message}
            onChange={handleChange}
          />
        )}
        <Button
          type="submit"
          variant="primary"
          size={compact ? 'md' : 'lg'}
          icon={isSubmitting ? Loader2 : Send}
          className="w-full mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Enquiry...' : 'Get Free Quote'}
        </Button>
      </form>
    </div>
  );
}
