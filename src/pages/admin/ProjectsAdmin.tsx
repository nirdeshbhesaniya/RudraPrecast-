import { useState } from "react";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { Plus, Edit2, Trash2, Save } from "lucide-react";
import { ImageUpload } from "@/src/components/ui/ImageUpload";

type Project = {
  id: string;
  title: string;
  location: string;
  category: string;
  product: string;
  image: string;
  description: string;
};

export function ProjectsAdmin() {
  const { data, saveData } = useAppData();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleAddNew = () => {
    setCurrentProject({
      id: `pj${Date.now()}`,
      title: "",
      location: "",
      category: "",
      product: "",
      image: "",
      description: ""
    });
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const newProjects = data.projects.filter(p => p.id !== id);
    await saveData({ ...data, projects: newProjects });
  };

  const handleSave = async () => {
    if (!currentProject) return;
    setIsSaving(true);

    let newProjects;
    const exists = data.projects.some(p => p.id === currentProject.id);
    if (exists) {
      newProjects = data.projects.map(p => p.id === currentProject.id ? currentProject : p);
    } else {
      newProjects = [...data.projects, currentProject];
    }

    await saveData({ ...data, projects: newProjects });
    setIsSaving(false);
    setIsEditing(false);
  };

  if (isEditing && currentProject) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentProject.title ? `Edit: ${currentProject.title}` : "Add New Project"}
          </h2>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
              <Save size={18} /> {isSaving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input type="text" value={currentProject.title} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" value={currentProject.location} onChange={e => setCurrentProject({...currentProject, location: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" value={currentProject.category} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} placeholder="e.g. INDUSTRIAL, RESIDENTIAL" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Main Product Used</label>
              <input type="text" value={currentProject.product} onChange={e => setCurrentProject({...currentProject, product: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <ImageUpload value={currentProject.image} onChange={val => setCurrentProject({...currentProject, image: val})} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea rows={3} value={currentProject.description} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B1E1E] focus:border-[#8B1E1E]" />
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
          <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your portfolio of completed projects.</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus size={18} /> Add Project
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={project.image} alt={project.title} className="h-16 w-24 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{project.title}</div>
                  <div className="text-sm text-gray-500">{project.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(project)} className="text-[#1A2A3A] hover:text-[#2A3F54] mr-4 inline-block">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-900 inline-block">
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
