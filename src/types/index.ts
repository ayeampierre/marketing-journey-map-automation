export type PricingTier = 'budget' | 'mid' | 'premium' | 'enterprise';
export type MarketReach = 'local' | 'national' | 'global' | 'niche';
export type DistributionChannel = 'direct_ecom' | 'b2b_sales' | 'app_store' | 'omnichannel';

export interface BusinessProfile {
  description: string;
  pricingTier: PricingTier;
  marketReach: MarketReach;
  distributionChannel: DistributionChannel;
  industryCategory?: string;
}

export interface PersonaDemographics {
  age: string;
  role: string;
  incomeLevel: string;
  location: string;
  educationTech: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  archetypeBadge: string;
  avatarColor: string;
  quote: string;
  demographics: PersonaDemographics;
  lifestyle: string[];
  purchaseOccasion: string;
  coreMotivations: string[];
  frustrations: string[];
  willingnessToPay: string;
  keyDecisionFactors: string[];
}

export type JourneyStageId = 'awareness' | 'consideration' | 'convert' | 'loyalty' | 'advocacy';

export type JourneyRowKey =
  | 'purchaseOccasion'
  | 'customerActivities'
  | 'customerGoals'
  | 'touchpoints'
  | 'painPoints'
  | 'businessGoals';

export interface JourneyStageData {
  stage: JourneyStageId;
  title: string;
  subtitle: string;
  purchaseOccasion: string;
  customerActivities: string[];
  customerGoals: string[];
  touchpoints: string[];
  painPoints: string[];
  businessGoals: string[];
  sentiment: 'neutral' | 'curious' | 'evaluating' | 'committed' | 'delighted' | 'advocate';
  sentimentScore: number; // 1-5 scale for visualization
  keyMetric: string;
  strategicOpportunity: string;
}

export interface CustomerJourneyMap {
  personaId: string;
  personaName: string;
  personaTitle: string;
  businessSummary: string;
  stages: Record<JourneyStageId, JourneyStageData>;
  generatedAt: string;
}

export type AppStep = 'business-input' | 'persona-selection' | 'journey-matrix';
