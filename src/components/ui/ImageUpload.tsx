import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-1">
      {value ? (
        <div className="relative inline-block group">
          <img src={value} alt="Preview" className="h-40 w-auto object-cover rounded-md border border-gray-300" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-red-500 text-white rounded-full p-2 shadow hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#8B1E1E] hover:text-[#8B1E1E] cursor-pointer transition-colors"
        >
          <Upload size={28} className="mb-3 text-gray-400" />
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs mt-1 text-gray-400">Click to browse (Converts to Base64)</span>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
