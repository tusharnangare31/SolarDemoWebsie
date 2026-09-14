'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Leaf, ShieldCheck, Users, Sparkles } from 'lucide-react';
import { SiteSettings } from '@/lib/db';

const slidesData = [
  {
    image: '/images/slide-1.png',
    kicker: 'CLEAN ENERGY FOR A BRIGHTER TOMORROW',
    title: 'Power Your Future',
    titleHighlight: 'with Solar Energy',
    subtitle:
      'We provide reliable and affordable solar solutions for homes, businesses and a cleaner planet.',
  },
  {
    image: '/images/slide-2.png',
    kicker: 'MNRE CERTIFIED SOLAR EPC EXPERTS',
    title: 'Expert Solar EPC',
    titleHighlight: '& 25-Year Warranty',
    subtitle:
      'End-to-end solar engineering, Tier-1 panels, and government subsidy processing.',
  },
  {
    image: '/images/slide-3.png',
    kicker: 'SAVE UP TO 90% ON POWER BILLS',
    title: 'Smart Rooftop Solar',
    titleHighlight: 'for Modern Living',
    subtitle:
      'Generate your own clean electricity, reduce carbon footprint, and hedge energy costs.',
  },
];

// Cloned boundary slides for continuous forward infinite looping
const extendedSlides = [
  slidesData[slidesData.length - 1], // Index 0: clone of slide 3
  ...slidesData,                     // Indices 1, 2, 3: slides 1, 2, 3
  slidesData[0],                     // Index 4: clone of slide 1
];

export default function Hero() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.company_name) setSettings(data);
      })
      .catch(() => {});
  }, []);

  // Restore transition capability after instantaneous boundary reset
  useEffect(() => {
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= extendedSlides.length - 1) {
      // Reached the clone of slide 1 -> jump to real slide 1 without animation
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached the clone of slide 3 -> jump to real slide 3 without animation
      setIsTransitioning(false);
      setCurrentIndex(slidesData.length);
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleManualSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, 5500);
    }
  };

  // Active slide index for text & indicator dots (0, 1, or 2)
  const activeDotIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
  const current = slidesData[activeDotIndex];

  return (
    <div className="relative">
      {/* Hero Section with Fixed Rigid Height to prevent any UI resizing */}
      <section className="relative h-[560px] sm:h-[600px] lg:h-[640px] flex items-center overflow-hidden pt-20 lg:pt-24 group">
        
        {/* Sliding Background Images: Infinite Continuous Forward Loop */}
        <div
          className={`absolute inset-0 flex ${
            isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={idx}
              className="w-full h-full shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            />
          ))}
        </div>

        {/* Left and Right Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center border border-slate-200/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center border border-slate-200/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Container - Locked height prevents any vertical jumping */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-2xl lg:max-w-xl h-[330px] flex flex-col justify-center">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-green-700 uppercase bg-green-50/90 border border-green-200/80 px-3.5 py-1 rounded-full">
                {current.kicker}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 leading-[1.18] mb-4 tracking-tight min-h-[72px] sm:min-h-[96px] lg:min-h-[115px] flex flex-col justify-center">
              <span>{current.title}</span>
              <span className="text-green-600">{current.titleHighlight}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-7 max-w-lg font-normal min-h-[48px]">
              {current.subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <span>Get a Free Quote</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-slate-800 font-semibold text-base px-7 py-3 rounded-xl border border-slate-300/80 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-xs"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeDotIndex === idx ? 'w-8 bg-green-600' : 'w-2.5 bg-slate-400/60 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4-Feature Value Bar Floating Overlap - Shadow completely removed */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x sm:divide-slate-100">
            {/* Feature 1 */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:pr-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">Save Money</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Lower your electricity bills</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">Clean Energy</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Reduce your carbon footprint</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">Reliable System</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Long-lasting performance</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:pl-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">Expert Support</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">From planning to installation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
