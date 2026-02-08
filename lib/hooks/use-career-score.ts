'use client';

import { createContext, useContext } from 'react';
import type { CareerScore } from '@/types/score';

const ScoreContext = createContext<CareerScore | null>(null);

export const ScoreProvider = ScoreContext.Provider;

export function useCareerScore() {
  const score = useContext(ScoreContext);
  return score; // Can be null if not in provider
}
