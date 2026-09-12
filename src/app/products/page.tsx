'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Zap, Battery, Sun, Wrench, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { ProductItem } from '@/lib/db';

const categories = ['All', 'Solar Panels', 'Inverters', 'Batteries', 'Mounting Structures'] as const;

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Solar Panels': Sun,
  Inverters: Zap,
  Batteries: Battery,
  'Mounting Structures': Wrench,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleEnquire = (product: ProductItem) => {
    setEnquiryModalProduct(product);
  };

  return (
    <div className="pt-28">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Products"
            subtitle="Premium solar equipment from the world's leading manufacturers"
          />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading solar catalog...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => {
                const Icon = categoryIcons[product.category] || Sun;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image placeholder */}
                      <div className="h-48 bg-gradient-to-br from-primary/5 to-accent-green/10 flex items-center justify-center relative overflow-hidden">
                        {product.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Icon className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-dark text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.specs?.map((spec) => (
                            <span
                              key={spec}
                              className="bg-gray-50 text-gray-700 text-xs px-2.5 py-1 rounded-md border border-gray-100"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      {product.price > 0 && (
                        <p className="text-sm font-bold text-gray-900 mb-2">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      )}
                      <Button
                        variant="primary"
                        size="sm"
                        icon={ShoppingBag}
                        className="w-full"
                        href="/contact"
                        onClick={() => {
                          toast.success(`Enquiry noted for ${product.name}!`);
                        }}
                      >
                        Enquire Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
