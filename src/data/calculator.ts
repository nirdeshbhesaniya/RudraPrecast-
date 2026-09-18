export type CalculatorConfig = {
  wallTypes: {
    id: string;
    name: string;
    ratePerSqFt: number;
  }[];
  installationRatePerSqFt: number;
  baseTransportCost: number;
  taxPercentage: number;
};

export const defaultCalculatorConfig: CalculatorConfig = {
  wallTypes: [
    { id: "standard", name: "Standard RCC Wall", ratePerSqFt: 65 },
    { id: "prestressed", name: "Pre-Stressed Heavy Duty Wall", ratePerSqFt: 85 },
    { id: "folding", name: "Folding Compound Wall", ratePerSqFt: 75 },
    { id: "premium", name: "Premium Textured Wall", ratePerSqFt: 110 }
  ],
  installationRatePerSqFt: 15,
  baseTransportCost: 2000,
  taxPercentage: 18,
};
