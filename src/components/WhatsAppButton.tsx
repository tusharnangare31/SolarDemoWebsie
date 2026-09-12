'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [phone, setPhone] = useState('919876543210');

  useEffect(() => {
    // Fetch dynamic WhatsApp phone from settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.whatsapp_number) {
          setPhone(data.whatsapp_number.replace(/\D/g, ''));
        }
      })
      .catch(() => {});

    const timer = setTimeout(() => setIsVisible(true), 2000);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = `https://wa.me/${phone}?text=Hi%2C%20I%27m%20interested%20in%20solar%20installation.%20Please%20share%20details.`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-xl p-4 w-64 animate-fade-in border border-gray-100">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-700 font-medium">Need help? Chat with us on WhatsApp!</p>
          <p className="text-xs text-gray-500 mt-1">We typically reply within 5 minutes</p>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-gentle"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
