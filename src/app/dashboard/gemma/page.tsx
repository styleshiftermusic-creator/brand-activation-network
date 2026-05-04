import React from 'react';
import type { Metadata } from 'next';
import { GemmaLabClient } from '@/components/dashboard/GemmaLabClient';

export const metadata: Metadata = {
  title: 'AI Lab | Gemma 4 Execution Engine',
  description: 'Experiment with advanced Mixture of Experts (MoE) reasoning using Gemma 4.',
};

export default function GemmaLabPage() {
  return <GemmaLabClient />;
}
