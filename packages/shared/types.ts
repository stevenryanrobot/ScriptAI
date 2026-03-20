// Shared types between frontend and backend
// These are re-exported from @/types/index.ts in the web app

export type AccountType =
  | 'KNOWLEDGE' | 'VLOG' | 'EMOTION' | 'COMEDY'
  | 'REVIEW' | 'TECH' | 'BEAUTY' | 'FITNESS'
  | 'FOOD' | 'OTHER';

export type NarrativeType = 'FOUR_ACT' | 'THREE_PART' | 'HOOK_CONTENT_CTA' | 'CUSTOM';

export type ScriptStatus = 'DRAFT' | 'COMPLETED' | 'ARCHIVED';

export type PlanType = 'FREE' | 'PRO' | 'TEAM';

export interface Shot {
  shotNumber: number;
  narration: string;
  visualDescription: string;
  subtitle: string;
  duration: number;
  bgmSuggestion: string;
  notes?: string;
}

export interface GenerateParams {
  templateId: string;
  narrativeType: NarrativeType;
  elements: string[];
  customPrompt?: string;
}
