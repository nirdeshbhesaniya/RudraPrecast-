import { useState } from "react";
import { Button } from "./Button";
import { Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "@/src/context/DataContext";

export function CostCalculator() {
  const { data: { calculatorConfig } } = useAppData();
  
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("6");
  
  // Set default type to first available or standard
  const initialType = calculatorConfig?.wallTypes?.[0]?.id || "standard";
  const [type, setType] = useState(initialType);
  
  type EstimateDetail = {
    area: number;
    materialCost: number;
    installCost: number;
    transportCost: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  
  const [estimateDetails, setEstimateDetails] = useState<EstimateDetail | null>(null);
  const navigate = useNavigate();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculatorConfig) return;
    
    const l = parseFloat(length);
    const h = parseFloat(height);
    
    if (isNaN(l) || isNaN(h)) return;

    const selectedType = calculatorConfig.wallTypes.find(t => t.id === type);
    const ratePerSqFt = selectedType ? selectedType.ratePerSqFt : 65;

    const area = l * h;
    const materialCost = area * ratePerSqFt;
    const installCost = area * calculatorConfig.installationRatePerSqFt;
    const transportCost = calculatorConfig.baseTransportCost;
    const subtotal = materialCost + installCost + transportCost;
    const tax = subtotal * (calculatorConfig.taxPercentage / 100);
    const total = subtotal + tax;

    setEstimateDetails({ area, materialCost, installCost, transportCost, subtotal, tax, total });
  };

  const handleProceedToContact = () => {
    if (!estimateDetails || !calculatorConfig) return;
    const selectedType = calculatorConfig.wallTypes.find(t => t.id === type);
    const typeName = selectedType ? selectedType.name : type;
    
    const message = `I used the Cost Calculator and got an estimate for a ${height}ft high ${typeName} spanning ${length} running feet.\n\nEstimate Breakdown:\n- Total Area: ${estimateDetails.area} sq.ft\n- Subtotal: ₹${estimateDetails.subtotal.toLocaleString('en-IN')}\n- Total Cost (incl. tax & transport): ₹${estimateDetails.total.toLocaleString('en-IN')}`;
    
    navigate(`/contact?subject=Detailed Quote Request&message=${encodeURIComponent(message)}`);
  };

  if (!calculatorConfig) return null;

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 md:p-8 border border-gray-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4C522]/10 rounded-bl-full -z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#1A2A3A] p-3 rounded-lg text-[#F4C522]">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="text-xl font-oswald font-bold text-[#1A2A3A]">Project Estimator</h3>
            <p className="text-sm text-gray-500">Get a detailed approximate quote</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Wall Length (Running Feet)</label>
              <input 
                type="number" 
                min="1"
                required
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="e.g. 500" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Height Above Ground</label>
              <select 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent transition-all appearance-none"
              >
                <option value="4">4 Feet</option>
                <option value="5">5 Feet</option>
                <option value="6">6 Feet</option>
                <option value="7">7 Feet</option>
                <option value="8">8 Feet</option>
                <option value="10">10 Feet</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Wall Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent transition-all appearance-none"
              >
                {calculatorConfig.wallTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.name} (₹{t.ratePerSqFt}/sq.ft)</option>
                ))}
              </select>
            </div>
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg rounded-xl">Calculate Estimate</Button>
        </form>

        {estimateDetails !== null && (
          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl text-left animate-in fade-in slide-in-from-bottom-4">
            <h4 className="font-bold text-[#1A2A3A] mb-4 border-b border-gray-200 pb-2">Estimated Quotation</h4>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Total Area ({length}ft × {height}ft)</span>
                <span className="font-medium">{estimateDetails.area.toLocaleString('en-IN')} sq.ft</span>
              </div>
              <div className="flex justify-between">
                <span>Material Cost</span>
                <span className="font-medium">₹{estimateDetails.materialCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Installation Cost</span>
                <span className="font-medium">₹{estimateDetails.installCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Transport (Base)</span>
                <span className="font-medium">₹{estimateDetails.transportCost.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2 mb-6">
              <div className="flex justify-between text-sm font-medium text-[#1A2A3A]">
                <span>Subtotal</span>
                <span>₹{estimateDetails.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Estimated Tax ({calculatorConfig.taxPercentage}%)</span>
                <span>₹{estimateDetails.tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#8B1E1E] mt-2">
                <span>Grand Total</span>
                <span>₹{estimateDetails.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Button 
              onClick={handleProceedToContact}
              className="w-full bg-[#1A2A3A] hover:bg-[#2A3F54]"
            >
              Request Exact Quote
            </Button>
            <p className="text-xs text-center text-gray-400 mt-3">
              *Actual transport costs may vary based on exact site location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
