import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  const baseClasses = "bg-[var(--brand-surface)]/40 backdrop-blur-xl border border-[var(--brand-border)] shadow-2xl rounded-2xl";
  const hoverClasses = hover ? "hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-all" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`.trim()}>
      {children}
    </div>
  );
}
