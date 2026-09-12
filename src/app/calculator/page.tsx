'use client';

import React, { useState } from 'react';
import {
  Calculator,
  Sun,
  Zap,
  IndianRupee,
  Leaf,
  Clock,
  BarChart3,
  ArrowRight,
  CheckCircle,
  X,
} from 'lucide-react';
import { calculateSolar, states, type CalculatorResult } from '@/lib/calculator';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/ui/ContactForm';

export default function CalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [rooftopArea, setRooftopArea] = useState('');
  const [state, setState] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monthlyBill || !state) return;

    const input = {
      monthlyBill: Number(monthlyBill),
      rooftopArea: Number(rooftopArea) || 0,
      state,
    };
    const calcResult = calculateSolar(input);
    setResult(calcResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setMonthlyBill('');
    setRooftopArea('');
    setState('');
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <Calculator className="w-4 h-4 text-accent-orange" />
            <span className="text-sm">Solar Savings Calculator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Calculate Your Solar Savings</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Find out how much you can save with solar energy. Enter your details below for an instant estimate.
          </p>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold font-heading text-dark mb-6">Enter Your Details</h2>
              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Electricity Bill (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                      placeholder="e.g. 5000"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      required
                      min="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Rooftop Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={rooftopArea}
                    onChange={(e) => setRooftopArea(e.target.value)}
                    placeholder="e.g. 500 (optional)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">≈ 100 sq ft per kW of solar</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  >
                    <option value="">Select your state</option>
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" size="lg" icon={Calculator} className="flex-1">
                    Calculate
                  </Button>
                  {showResult && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Results */}
            <div>
              {showResult && result ? (
                <div className="space-y-6 animate-slide-up">
                  <h2 className="text-2xl font-bold font-heading text-dark">Your Solar Estimate</h2>

                  {/* Main cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-5 shadow-md">
                      <Sun className="w-8 h-8 text-accent-orange mb-2" />
                      <p className="text-sm text-gray-500">System Size</p>
                      <p className="text-2xl font-bold text-dark">{result.systemSize} kW</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md">
                      <IndianRupee className="w-8 h-8 text-accent-green mb-2" />
                      <p className="text-sm text-gray-500">Estimated Cost</p>
                      <p className="text-2xl font-bold text-dark">
                        ₹{result.estimatedCost.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md">
                      <Zap className="w-8 h-8 text-primary mb-2" />
                      <p className="text-sm text-gray-500">Monthly Savings</p>
                      <p className="text-2xl font-bold text-accent-green">
                        ₹{result.monthlyBillSavings.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-md">
                      <Clock className="w-8 h-8 text-primary mb-2" />
                      <p className="text-sm text-gray-500">Payback Period</p>
                      <p className="text-2xl font-bold text-dark">{result.paybackPeriod} years</p>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="font-semibold text-dark mb-4">Detailed Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Monthly Consumption</span>
                        <span className="font-semibold">{result.unitsConsumed} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Annual Generation</span>
                        <span className="font-semibold">
                          {result.annualGeneration.toLocaleString('en-IN')} units
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Government Subsidy</span>
                        <span className="font-semibold text-accent-green">
                          ₹{result.subsidyAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rooftop Area Needed</span>
                        <span className="font-semibold">{result.rooftopAreaRequired} sq ft</span>
                      </div>
                      <hr className="border-gray-100" />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-accent-green" />
                          <span className="text-sm text-gray-600">CO₂ Offset</span>
                        </div>
                        <span className="font-bold text-accent-green">
                          {result.co2Offset} tonnes/year
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-primary/5 rounded-xl p-6 text-center border border-primary/10">
                    <p className="text-gray-800 font-semibold mb-1">
                      Ready to lock in this estimate?
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Submit your details to receive a formal quotation and subsidy feasibility check
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowQuoteModal(true)}
                      className="w-full py-3 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Request Quotation for {result.systemSize} kW System
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-md text-center">
                  <BarChart3 className="w-16 h-16 text-primary/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Your Results Will Appear Here
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Enter your monthly bill and state to get an instant solar savings estimate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Submission Modal */}
      {showQuoteModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-primary font-semibold">
                {result.systemSize} kW Solar System
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                ₹{result.monthlyBillSavings.toLocaleString('en-IN')}/mo Savings
              </span>
            </div>

            <h2 className="text-xl font-bold font-heading text-gray-900 mb-1">
              Get Your Official Quote
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Our engineering team will call you to verify roof dimensions and process subsidy approvals
            </p>

            <ContactForm
              compact
              sourcePage="Solar Calculator"
              systemSizeEstimate={`${result.systemSize} kW`}
              monthlyBill={`₹${monthlyBill}`}
              onSuccess={() => {
                setTimeout(() => setShowQuoteModal(false), 2000);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
