import { useState } from "react";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { Product } from "@/src/data/products";
import { ImageUpload } from "@/src/components/ui/ImageUpload";

export function ProductsAdmin() {
  const { data, saveData } = useAppData();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Form states specifically for complex objects
  const [applicationsText, setApplicationsText] = useState("");
  const [galleryText, setGalleryText] = useState("");
  const [keyBenefitsText, setKeyBenefitsText] = useState("");
  const [specsText, setSpecsText] = useState("");

  const handleAddNew = () => {
    setCurrentProduct({
      id: `p${Date.now()}`,
      slug: "",
      name: "",
      shortDescription: "",
      applications: [],
      image: "",
      gallery: [],
      overview: "",
      keyBenefits: [],
      specifications: {}
    });
    setApplicationsText("");
    setGalleryText("");
    setKeyBenefitsText("");
    setSpecsText("");
    setIsEditing(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setApplicationsText(product.applications.join(", "));
    setGalleryText(product.gallery.join("\n"));
    setKeyBenefitsText(product.keyBenefits.join("\n"));
    
    // Convert specs object to multiline text
    const specsString = Object.entries(product.specifications)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    setSpecsText(specsString);
    
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const newProducts = data.products.filter(p => p.id !== id);
    await saveData({ ...data, products: newProducts });
  };

  const handleSave = async () => {
    if (!currentProduct) return;
    setIsSaving(true);

    // Parse complex fields
    const applications = applicationsText.split(",").map(s => s.trim()).filter(Boolean);
    const gallery = galleryText.split("\n").map(s => s.trim()).filter(Boolean);
    const keyBenefits = keyBenefitsText.split("\n").map(s => s.trim()).filter(Boolean);
    
    const specifications: Record<string, string> = {};
    specsText.split("\n").forEach(line => {
      const idx = line.indexOf(':');
      if (idx > -1) {
        const key = line.substring(0, idx).trim();
        const val = line.substring(idx + 1).trim();
        if (key && val) specifications[key] = val;
      }
    });

    const updatedProduct = {
      ...currentProduct,
      applications,
      gallery,
      keyBenefits,
      specifications,
      featured: currentProduct.featured || false
    };

    let newProducts;
    const exists = data.products.some(p => p.id === currentProduct.id);
    if (exists) {
      newProducts = data.products.map(p => p.id === currentProduct.id ? updatedProduct : p);
    } else {
      newProducts = [...data.products, updatedProduct];
    }

    await saveData({ ...data, products: newProducts });
    setIsSaving(false);
    setIsEditing(false);
  };

  if (isEditing && currentProduct) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentProduct.name ? `Edit: ${currentProduct.name}` : "Add New Product"}
          </h2>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
              <Save size={18} /> {isSaving ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
              <input type="text" value={currentProduct.slug} onChange={e => setCurrentProduct({...currentProduct, slug: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <input type="text" value={currentProduct.shortDescription} onChange={e => setCurrentProduct({...currentProduct, shortDescription: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Main Image</label>
              <ImageUpload value={currentProduct.image} onChange={val => setCurrentProduct({...currentProduct, image: val})} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Overview</label>
              <textarea rows={3} value={currentProduct.overview} onChange={e => setCurrentProduct({...currentProduct, overview: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Applications (Comma separated)</label>
              <input type="text" value={applicationsText} onChange={e => setApplicationsText(e.target.value)} placeholder="Industrial, Residential, Commercial" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-gray-700">Gallery Image URLs (One per line)</label>
                <label className="cursor-pointer text-sm text-[#8B1E1E] hover:underline font-medium">
                  + Upload Images
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    Array.from(files).forEach(file => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const result = reader.result;
                        if (typeof result === 'string') {
                          setGalleryText(prev => prev ? `${prev}\n${result}` : result);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }} />
                </label>
              </div>
              <textarea rows={3} value={galleryText} onChange={e => setGalleryText(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Key Benefits (One per line)</label>
              <textarea rows={4} value={keyBenefitsText} onChange={e => setKeyBenefitsText(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Specifications (Key: Value - One per line)</label>
              <textarea rows={6} value={specsText} onChange={e => setSpecsText(e.target.value)} placeholder="Material: Reinforced Concrete&#10;Height: 4ft to 10ft" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={currentProduct.featured || false} onChange={e => setCurrentProduct({...currentProduct, featured: e.target.checked})} className="rounded text-[#8B1E1E] focus:ring-[#8B1E1E]" />
                <span className="text-sm font-medium text-gray-700">Featured Product on Home Page</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your precast product offerings.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="h-16 w-24 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{product.shortDescription}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(product)} className="text-[#1A2A3A] hover:text-[#2A3F54] mr-4 inline-block">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 inline-block">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
