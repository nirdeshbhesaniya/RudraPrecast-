import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig as defaultSiteConfig } from "../config/site";
import { products as defaultProducts } from "../data/products";
import { projects as defaultProjects, faqs as defaultFaqs, testimonials as defaultTestimonials } from "../data/content";
import { defaultCalculatorConfig } from "../data/calculator";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  location: string;
  product: string;
  length: string;
  details: string;
  createdAt: string;
};

type AppData = {
  siteConfig: typeof defaultSiteConfig;
  products: typeof defaultProducts;
  projects: typeof defaultProjects;
  faqs: typeof defaultFaqs;
  testimonials: typeof defaultTestimonials;
  calculatorConfig: typeof defaultCalculatorConfig;
  leads: Lead[];
};

const defaultData: AppData = {
  siteConfig: defaultSiteConfig,
  products: defaultProducts,
  projects: defaultProjects,
  faqs: defaultFaqs,
  testimonials: defaultTestimonials,
  calculatorConfig: defaultCalculatorConfig,
  leads: [],
};

type DataContextType = {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  saveData: (newData: AppData) => Promise<boolean>;
};

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("No data found");
        return res.json();
      })
      .then((dbData) => {
        // Merge fetched data with defaults to ensure all required fields exist
        setData({
          siteConfig: { ...defaultData.siteConfig, ...dbData.siteConfig },
          products: dbData.products || defaultData.products,
          projects: dbData.projects || defaultData.projects,
          faqs: dbData.faqs || defaultData.faqs,
          testimonials: dbData.testimonials || defaultData.testimonials,
          calculatorConfig: dbData.calculatorConfig || defaultData.calculatorConfig,
          leads: dbData.leads || defaultData.leads,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("Using default local data, fetch failed:", err);
        setLoading(false);
      });
  }, []);

  const saveData = async (newData: AppData) => {
    setData(newData); // Optimistic UI update
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      return res.ok;
    } catch (e) {
      console.error("Failed to save data to server", e);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="w-10 h-10 border-4 border-[#1A2A3A]/20 border-t-[#8B1E1E] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <DataContext.Provider value={{ data, setData, saveData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAppData must be used within a DataProvider");
  }
  return context;
}
