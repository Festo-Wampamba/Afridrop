'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

// Pricing Data (Estimates in UGX)
const SHAPES = [
  { id: 'rectangular', name: 'Rectangular', basePrice: 35000000, icon: 'rounded-sm' },
  { id: 'kidney', name: 'Kidney', basePrice: 38000000, icon: 'rounded-[100%_50%_100%_50%]' }, // CSS approx
  { id: 'freeform', name: 'Freeform', basePrice: 40000000, icon: 'rounded-[60%_40%_30%_70%/60%_30%_70%_40%]' },
  { id: 'lap', name: 'Lap Pool', basePrice: 32000000, icon: 'h-3 w-16 rounded-sm' },
];

const SIZES = [
  { id: 'small', name: 'Small', dim: "12' x 24'", description: 'Perfect for relaxation', price: 0 },
  { id: 'medium', name: 'Medium', dim: "16' x 32'", description: 'Great for families', price: 12000000 },
  { id: 'large', name: 'Large', dim: "20' x 40'", description: 'Entertainment ready', price: 28000000 },
];

const FEATURES = [
  { id: 'lighting', name: 'LED Lighting System', description: 'Color-changing underwater lights', price: 2500000 },
  { id: 'heater', name: 'Pool Heater', description: 'Extend your swimming season', price: 8500000 },
  { id: 'automation', name: 'Smart Automation', description: 'App-controlled pool management', price: 5800000 },
  { id: 'waterfall', name: 'Water Features', description: 'Waterfall or fountain', price: 4200000 },
];

export default function PoolConfigurator() {
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Calculations
  const baseTotal = selectedShape.basePrice;
  const sizeTotal = selectedSize.price;
  const featuresTotal = selectedFeatures.reduce((sum, id) => {
    const feature = FEATURES.find(f => f.id === id);
    return sum + (feature ? feature.price : 0);
  }, 0);
  const total = baseTotal + sizeTotal + featuresTotal;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <section className="py-20 bg-slate-50" id="configurator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00477A] mb-4">Design Your Dream Pool</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Use our interactive configurator to explore options and get real-time cost estimates for your custom pool.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Left Column: Options */}
          <div className="flex-1 space-y-12">
            
            {/* Shape Selection */}
            <div>
              <h3 className="text-lg font-bold text-[#00477A] mb-6">Pool Shape</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedShape(shape)}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 group ${
                      selectedShape.id === shape.id 
                      ? 'border-[#009FCE] bg-white shadow-md' 
                      : 'border-slate-200 bg-white hover:border-[#009FCE]/50'
                    }`}
                  >
                    <div className={`w-16 h-10 bg-[#002B4A] ${shape.icon} ${selectedShape.id === shape.id ? 'bg-[#009FCE]' : 'group-hover:bg-[#00477A]'} transition-colors`} />
                    <span className={`font-medium text-sm ${selectedShape.id === shape.id ? 'text-[#009FCE]' : 'text-slate-600'}`}>
                      {shape.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-bold text-[#00477A] mb-6">Pool Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      selectedSize.id === size.id 
                      ? 'border-[#009FCE] bg-white shadow-md' 
                      : 'border-slate-200 bg-white hover:border-[#009FCE]/50'
                    }`}
                  >
                    <div className={`text-lg font-bold mb-1 ${selectedSize.id === size.id ? 'text-[#009FCE]' : 'text-slate-800'}`}>
                      {size.name}
                    </div>
                    <div className="text-xs font-semibold text-slate-500 mb-2">{size.dim}</div>
                    <div className="text-xs text-slate-400">{size.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features Selection */}
            <div>
              <h3 className="text-lg font-bold text-[#00477A] mb-6">Features & Upgrades</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURES.map((feature) => (
                  <div 
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                      selectedFeatures.includes(feature.id)
                      ? 'border-[#009FCE] bg-blue-50/30' 
                      : 'border-slate-200 bg-white hover:border-[#009FCE]/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      selectedFeatures.includes(feature.id) ? 'bg-[#009FCE] border-[#009FCE]' : 'border-slate-300 bg-white'
                    }`}>
                      {selectedFeatures.includes(feature.id) && <Check size={14} className="text-white" />}
                    </div>
                    <div>
                      <div className="font-bold text-[#00477A] text-sm mb-1">{feature.name}</div>
                      <div className="text-xs text-slate-500 mb-2">{feature.description}</div>
                      <div className="text-xs font-semibold text-[#009FCE]">+{formatPrice(feature.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Calculations */}
          <div className="lg:w-[400px]">
            <div className="bg-[#002B4A] text-white p-8 rounded-2xl shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-8">Cost Estimate</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Base Pool ({selectedShape.name})</span>
                  <span className="font-medium">{formatPrice(baseTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Size Adjustment ({selectedSize.name})</span>
                  <span className="font-medium">{sizeTotal > 0 ? `+${formatPrice(sizeTotal)}` : '-'}</span>
                </div>
                 <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Features ({selectedFeatures.length})</span>
                  <span className="font-medium">{featuresTotal > 0 ? `+${formatPrice(featuresTotal)}` : '-'}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-slate-300 font-medium">Total Estimate</span>
                  <span className="text-2xl font-bold text-[#009FCE]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-xs text-slate-400">
                <p>* Estimate includes basic installation</p>
                <p>* Final cost may vary based on site conditions</p>
                <p>* Permits and inspections not included</p>
              </div>

              <a 
                href="/contact" 
                className="block w-full text-center bg-[#009FCE] hover:bg-[#007FA5] text-white py-4 rounded-xl font-bold transition-colors"
              >
                Get Detailed Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
