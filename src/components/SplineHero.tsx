import Image from "next/image";

export function SplineHero() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <Image
          src="/dashboard_hero.png"
          alt="Neural Architecture"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
        />
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full z-0" />

      {/* Overlay Text */}
      <div className="relative z-20 pointer-events-none flex flex-col items-center justify-center text-center p-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
              Neural Architecture Active
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Welcome to the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-400">Network.</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-mono max-w-lg mx-auto">
              You are now viewing your active data feed. Complete your directives to unlock new assets.
          </p>
      </div>

      {/* Outer Glass Ring */}
      <div className="absolute inset-0 border-[2px] border-white/5 pointer-events-none rounded-3xl z-30 mix-blend-overlay" />
    </div>
  );
}
