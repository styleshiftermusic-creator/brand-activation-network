import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-bg)] text-white relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[var(--brand-glow-primary)] rounded-full blur-[180px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[var(--brand-glow-secondary)] rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[-5%] w-[500px] h-[500px] bg-[var(--brand-glow-primary)] rounded-full blur-[150px]" />
      </div>
      {children}
    </div>
  );
}
