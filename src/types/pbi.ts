export type NavigationTab = 'overview' | 'showcase' | 'qa' | 'track' | 'calculator';

export interface QAItem {
  id: string;
  category: 'fundamentos' | 'dax' | 'infra' | 'governanca';
  categoryLabel: string;
  question: string;
  simpleConcept: string;
  businessExample: {
    title: string;
    scenario: string;
    practicalSolution: string;
    impact: string;
    daxFormula?: string;
  };
  tags: string[];
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  benchmark: string;
  daxLogic?: string;
}

export interface WaterfallItem {
  label: string;
  value: number;
  type: 'base' | 'negative' | 'positive' | 'total';
  description: string;
}

export interface LicenseTier {
  id: 'pro' | 'ppu' | 'fabric';
  name: string;
  badge: string;
  pricePerMonthUSD: number;
  pricingType: 'user' | 'capacity';
  description: string;
  bestFor: string;
  limits: string[];
  features: string[];
}
