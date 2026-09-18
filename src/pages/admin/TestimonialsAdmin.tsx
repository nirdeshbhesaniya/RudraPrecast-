import { useState } from "react";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { Plus, Edit2, Trash2, Save, Star } from "lucide-react";
import { ImageUpload } from "@/src/components/ui/ImageUpload";
import { Testimonial } from "@/src/data/content";

export function TestimonialsAdmin() {
  const { data, saveData } = useAppData();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);

  const handleAddNew = () => {
    setCurrentTestimonial({
      id: `t${Date.now()}`,
      author: "",
      company: "",
      review: "",
      rating: 5,
      image: ""
    });
    setIsEditing(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const newTestimonials = data.testimonials.filter(t => t.id !== id);
    await saveData({ ...data, testimonials: newTestimonials });
  };

  const handleSave = async () => {
    if (!currentTestimonial) return;
    setIsSaving(true);

    let newTestimonials;
    const exists = data.testimonials.some(t => t.id === currentTestimonial.id);
    if (exists) {
      newTestimonials = data.testimonials.map(t => t.id === currentTestimonial.id ? currentTestimonial : t);
    } else {
      newTestimonials = [...data.testimonials, currentTestimonial];
    }

    await saveData({ ...data, testimonials: newTestimonials });
    setIsSaving(false);
    setIsEditing(false);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => {
              if (interactive && currentTestimonial) {
                setCurrentTestimonial({ ...currentTestimonial, rating: star });
              }
            }}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} 
                       ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          >
            <Star size={24} className={star <= rating ? 'fill-yellow-400' : ''} />
          </button>
        ))}
      </div>
    );
  };

  if (isEditing && currentTestimonial) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentTestimonial.author ? `Edit Testimonial: ${currentTestimonial.author}` : "Add New Testimonial"}
          </h2>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
              <Save size={18} /> {isSaving ? "Saving..." : "Save Testimonial"}
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Author Name</label>
              <input type="text" value={currentTestimonial.author} onChange={e => setCurrentTestimonial({...currentTestimonial, author: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company / Designation</label>
              <input type="text" value={currentTestimonial.company} onChange={e => setCurrentTestimonial({...currentTestimonial, company: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              {renderStars(currentTestimonial.rating, true)}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Review</label>
              <textarea rows={4} value={currentTestimonial.review} onChange={e => setCurrentTestimonial({...currentTestimonial, review: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Author Image (Optional)</label>
              <ImageUpload value={currentTestimonial.image} onChange={val => setCurrentTestimonial({...currentTestimonial, image: val})} label="Upload Avatar" />
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
          <h2 className="text-2xl font-bold text-gray-900">Testimonials Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage customer reviews and ratings.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus size={18} /> Add Testimonial
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.testimonials?.map((testimonial) => (
              <tr key={testimonial.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {testimonial.image ? (
                        <img className="h-10 w-10 rounded-full object-cover" src={testimonial.image} alt="" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-white font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">{testimonial.review}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStars(testimonial.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(testimonial)} className="text-[#1A2A3A] hover:text-[#2A3F54] mr-4 inline-block">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(testimonial.id)} className="text-red-600 hover:text-red-900 inline-block">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {(!data.testimonials || data.testimonials.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No testimonials found. Click "Add Testimonial" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
