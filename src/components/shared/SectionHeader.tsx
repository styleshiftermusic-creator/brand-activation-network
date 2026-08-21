import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  badgeColor?: 'primary' | 'secondary';
}

export function SectionHeader({ badge, title, subtitle, badgeColor = 'primary' }: SectionHeaderProps) {
  const badgeColors = {
    primary: "text-[var(--brand-primary)]",
    secondary: "text-[var(--brand-secondary)]"
  };

  return (
    <div className="text-center mb-14">
      <span className={`text-xs font-mono uppercase tracking-[0.3em] ${badgeColors[badgeColor]} mb-4 block`}>
        {badge}
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="text-zinc-500 max-w-xl mx-auto font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
