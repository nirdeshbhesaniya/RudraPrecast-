import { useState } from "react";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { Save } from "lucide-react";

export function Dashboard() {
  const { data, saveData } = useAppData();
  const [formData, setFormData] = useState(data.siteConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveData({ ...data, siteConfig: formData });
    setIsSaving(false);
    alert("Configuration saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Configuration</h2>
          <p className="text-sm text-gray-500 mt-1">Manage global website settings like contact info and social links.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-8">
        
        {/* General Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">General Information</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData({
                  ...formData, 
                  contact: {...formData.contact, email: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input
                type="text"
                value={formData.contact.whatsapp}
                onChange={(e) => setFormData({
                  ...formData, 
                  contact: {...formData.contact, whatsapp: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Working Hours</label>
              <input
                type="text"
                value={formData.contact.workingHours}
                onChange={(e) => setFormData({
                  ...formData, 
                  contact: {...formData.contact, workingHours: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E] sm:text-sm"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
