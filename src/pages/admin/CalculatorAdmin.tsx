import { useState } from "react";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { Save, Plus, Trash2 } from "lucide-react";

export function CalculatorAdmin() {
  const { data, saveData } = useAppData();
  const [config, setConfig] = useState(data.calculatorConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveData({ ...data, calculatorConfig: config });
    setIsSaving(false);
    alert("Calculator settings saved successfully!");
  };

  const handleAddWallType = () => {
    setConfig(prev => ({
      ...prev,
      wallTypes: [...prev.wallTypes, { id: `type-${Date.now()}`, name: "New Wall Type", ratePerSqFt: 50 }]
    }));
  };

  const handleUpdateWallType = (index: number, field: string, value: string | number) => {
    const updated = [...config.wallTypes];
    updated[index] = { ...updated[index], [field]: value };
    setConfig(prev => ({ ...prev, wallTypes: updated }));
  };

  const handleRemoveWallType = (index: number) => {
    if (config.wallTypes.length <= 1) return alert("You must have at least one wall type.");
    const updated = config.wallTypes.filter((_, i) => i !== index);
    setConfig(prev => ({ ...prev, wallTypes: updated }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quotation Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage rates and parameters for the exact quote calculator.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
          <Save size={18} /> {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <div className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Global Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Installation Rate (₹/sq.ft)</label>
              <input 
                type="number" 
                value={config.installationRatePerSqFt} 
                onChange={e => setConfig({...config, installationRatePerSqFt: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Base Transport Fee (₹)</label>
              <input 
                type="number" 
                value={config.baseTransportCost} 
                onChange={e => setConfig({...config, baseTransportCost: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax Percentage (%)</label>
              <input 
                type="number" 
                value={config.taxPercentage} 
                onChange={e => setConfig({...config, taxPercentage: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between border-b pb-2 mb-6">
            <h3 className="text-lg font-bold text-gray-900">Wall Types & Base Rates</h3>
            <Button variant="outline" size="sm" onClick={handleAddWallType} className="flex items-center gap-2">
              <Plus size={16} /> Add Type
            </Button>
          </div>
          
          <div className="space-y-4">
            {config.wallTypes.map((type, index) => (
              <div key={type.id} className="flex items-end gap-4 p-4 border border-gray-100 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Type ID (No spaces)</label>
                  <input 
                    type="text" 
                    value={type.id} 
                    onChange={e => handleUpdateWallType(index, "id", e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" 
                  />
                </div>
                <div className="flex-[2]">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={type.name} 
                    onChange={e => handleUpdateWallType(index, "name", e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Rate (₹/sq.ft)</label>
                  <input 
                    type="number" 
                    value={type.ratePerSqFt} 
                    onChange={e => handleUpdateWallType(index, "ratePerSqFt", parseFloat(e.target.value) || 0)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" 
                  />
                </div>
                <button 
                  onClick={() => handleRemoveWallType(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Remove"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
