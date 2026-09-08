"use client";

import { useState, useMemo, useEffect } from "react";
import rawCreditUnions from "@/data/credit-unions.json";
import {
  Search,
  X,
  ExternalLink,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  ChevronRight,
  Building2,
  CheckCircle2,
  Info,
} from "lucide-react";

export interface CreditUnion {
  id: number;
  name: string;
  creditBureau?: string | null;
  creditPull?: string | null;
  joinAnywhere?: boolean;
  chexSystems?: string | null;
  plocRate?: number | null;
  lowestCardRate?: number | null;
  rewardsCardRate?: number | null;
  rewardsChecking?: string | null;
  eligibility?: string | null;
  hpReuse?: boolean | null;
  hpDuration?: string | null;
  dataNotes?: string | null;
  url?: string | null;
  promoText?: string | null;
  promoLink?: string | null;
  promoExpiration?: string | null;
}

const CREDIT_UNIONS = rawCreditUnions as CreditUnion[];

interface CreditUnionsDirectoryProps {
  compact?: boolean;
}

export function CreditUnionsDirectory({ compact = false }: CreditUnionsDirectoryProps) {
  // State
  const [search, setSearch] = useState("");
  const [creditPull, setCreditPull] = useState<string>("all");
  const [creditBureau, setCreditBureau] = useState<string>("all");
  const [joinAnywhere, setJoinAnywhere] = useState(false);
  const [hpReuse, setHpReuse] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "plocRate" | "creditPull">("name");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [selectedCU, setSelectedCU] = useState<CreditUnion | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ban_cu_favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("ban_cu_favorites", JSON.stringify(next));
      } catch {
        // Ignore localStorage errors
      }
      return next;
    });
  };

  // Toggle compare item
  const toggleCompare = (id: number) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setCreditPull("all");
    setCreditBureau("all");
    setJoinAnywhere(false);
    setHpReuse(false);
    setFavoritesOnly(false);
    setSortBy("name");
  };

  // Filter and sort
  const filteredCUs = useMemo(() => {
    const q = search.toLowerCase().trim();

    const filtered = CREDIT_UNIONS.filter((cu) => {
      if (favoritesOnly && !favorites.includes(cu.id)) return false;
      if (creditPull !== "all" && cu.creditPull !== creditPull) return false;
      if (creditBureau !== "all" && cu.creditBureau !== creditBureau) return false;
      if (joinAnywhere && !cu.joinAnywhere) return false;
      if (hpReuse && !cu.hpReuse) return false;

      if (q) {
        const matchName = cu.name?.toLowerCase().includes(q);
        const matchElig = cu.eligibility?.toLowerCase().includes(q);
        const matchNotes = cu.dataNotes?.toLowerCase().includes(q);
        const matchBureau = cu.creditBureau?.toLowerCase().includes(q);
        if (!matchName && !matchElig && !matchNotes && !matchBureau) return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }
      if (sortBy === "plocRate") {
        if (a.plocRate == null && b.plocRate == null) return 0;
        if (a.plocRate == null) return 1;
        if (b.plocRate == null) return -1;
        return a.plocRate - b.plocRate;
      }
      if (sortBy === "creditPull") {
        return (a.creditPull || "").localeCompare(b.creditPull || "");
      }
      return 0;
    });
  }, [search, creditPull, creditBureau, joinAnywhere, hpReuse, favoritesOnly, sortBy, favorites]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = CREDIT_UNIONS.length;
    const soft = CREDIT_UNIONS.filter((c) => c.creditPull === "Soft").length;
    const anywhere = CREDIT_UNIONS.filter((c) => c.joinAnywhere).length;
    const withRates = CREDIT_UNIONS.filter((c) => typeof c.plocRate === "number");
    const avgRate = withRates.length
      ? (withRates.reduce((acc, c) => acc + (c.plocRate || 0), 0) / withRates.length).toFixed(1)
      : "0";

    return { total, soft, anywhere, avgRate };
  }, []);

  const comparedCUs = useMemo(
    () => CREDIT_UNIONS.filter((c) => compareList.includes(c.id)),
    [compareList]
  );

  return (
    <div className="w-full flex flex-col gap-6 text-zinc-300">
      {/* ─── STATS BANNER ─── */}
      {!compact && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              {stats.total}
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Total CUs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-secondary-light)] font-heading tracking-tight">
              {stats.soft}
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Soft Pull Options</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-primary-light)] font-heading tracking-tight">
              {stats.anywhere}
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Join Anywhere</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading tracking-tight">
              {stats.avgRate}%
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-1">Avg PLOC Rate</div>
          </div>
        </div>
      )}

      {/* ─── SEARCH & FILTER CONTROLS ─── */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-5">
        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, eligibility requirement, bureau, or strategy notes..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[var(--brand-secondary-light)]/50 focus:ring-2 focus:ring-[var(--brand-secondary)]/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Pull Type Chips */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
              <span className="text-[10px] font-mono text-zinc-500 uppercase px-2">Pull</span>
              {(["all", "Soft", "Hard", "No Credit"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setCreditPull(type)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    creditPull === type
                      ? "bg-[var(--brand-secondary)] text-black font-semibold shadow-[0_0_15px_-3px_var(--brand-glow-secondary)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {type === "all" ? "All" : type}
                </button>
              ))}
            </div>

            {/* Bureau Chips */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
              <span className="text-[10px] font-mono text-zinc-500 uppercase px-2">Bureau</span>
              {(["all", "Experian", "Equifax", "TransUnion"] as const).map((bureau) => (
                <button
                  key={bureau}
                  onClick={() => setCreditBureau(bureau)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    creditBureau === bureau
                      ? "bg-[var(--brand-primary)] text-white font-semibold shadow-[0_0_15px_-3px_var(--brand-glow-primary)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {bureau === "all" ? "All" : bureau}
                </button>
              ))}
            </div>

            {/* Toggle Badges */}
            <button
              onClick={() => setJoinAnywhere(!joinAnywhere)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                joinAnywhere
                  ? "bg-[var(--brand-secondary)]/15 border-[var(--brand-secondary)]/50 text-[var(--brand-secondary-light)] shadow-[0_0_15px_-3px_var(--brand-glow-secondary)]"
                  : "bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Join Anywhere
            </button>

            <button
              onClick={() => setHpReuse(!hpReuse)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                hpReuse
                  ? "bg-[var(--brand-primary)]/15 border-[var(--brand-primary)]/50 text-[var(--brand-primary-light)] shadow-[0_0_15px_-3px_var(--brand-glow-primary)]"
                  : "bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              HP Reuse
            </button>

            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                favoritesOnly
                  ? "bg-amber-400/15 border-amber-400/50 text-amber-300 shadow-[0_0_15px_-3px_rgba(251,191,36,0.3)]"
                  : "bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              Favorites ({favorites.length})
            </button>
          </div>

          {/* Sort & Results Count */}
          <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto text-xs">
            <span className="font-mono text-zinc-500 whitespace-nowrap">
              <strong className="text-white">{filteredCUs.length}</strong> of {stats.total} found
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "plocRate" | "creditPull")}
                className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-zinc-300 text-xs font-mono focus:outline-none focus:border-white/30"
              >
                <option value="name">Name (A–Z)</option>
                <option value="plocRate">Lowest PLOC Rate</option>
                <option value="creditPull">Pull Type</option>
              </select>

              {(search || creditPull !== "all" || creditBureau !== "all" || joinAnywhere || hpReuse || favoritesOnly) && (
                <button
                  onClick={handleClearFilters}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── CREDIT UNION CARD GRID ─── */}
      {filteredCUs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center gap-3">
          <Building2 className="w-10 h-10 text-zinc-600" />
          <div className="text-lg font-bold text-white font-heading">No Credit Unions Match Filters</div>
          <p className="text-sm text-zinc-500 max-w-sm">
            Try adjusting your search criteria, toggling off specific filters, or clearing all filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCUs.map((cu) => {
            const isFav = favorites.includes(cu.id);
            const isCompared = compareList.includes(cu.id);

            return (
              <div
                key={cu.id}
                className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-4 group relative backdrop-blur-xl"
              >
                {/* Header: Title + Badges */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      onClick={() => setSelectedCU(cu)}
                      className="font-bold text-base text-white hover:text-[var(--brand-secondary-light)] transition-colors cursor-pointer leading-snug line-clamp-2 font-heading"
                    >
                      {cu.name}
                    </h3>
                    <button
                      onClick={(e) => toggleFavorite(cu.id, e)}
                      className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                        isFav ? "text-amber-400 bg-amber-400/10" : "text-zinc-600 hover:text-zinc-300"
                      }`}
                      title={isFav ? "Remove Favorite" : "Add Favorite"}
                    >
                      <Star className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Pull Type Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-semibold tracking-wider ${
                        cu.creditPull === "Soft"
                          ? "bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary-light)] border border-[var(--brand-secondary)]/30"
                          : cu.creditPull === "Hard"
                          ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          : "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                      }`}
                    >
                      {cu.creditPull || "Unknown"} Pull
                    </span>

                    {/* Bureau Badge */}
                    {cu.creditBureau && cu.creditBureau !== "Unknown" && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10">
                        {cu.creditBureau}
                      </span>
                    )}

                    {/* Join Anywhere Badge */}
                    {cu.joinAnywhere && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-[var(--brand-primary-light)] bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Join Anywhere
                      </span>
                    )}
                  </div>

                  {/* Eligibility Preview */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mt-1" title={cu.eligibility || ""}>
                    {cu.eligibility || "Standard membership eligibility requirements apply."}
                  </p>
                </div>

                {/* Rates & Intel Row */}
                <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">PLOC Rate</span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                      {cu.plocRate ? `${cu.plocRate}%` : "N/A"}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Card Rate</span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                      {cu.lowestCardRate ? `${cu.lowestCardRate}%` : "N/A"}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">HP Reuse</span>
                    <span
                      className={`text-xs font-bold font-mono mt-0.5 block ${
                        cu.hpReuse ? "text-[var(--brand-secondary-light)]" : "text-zinc-500"
                      }`}
                    >
                      {cu.hpReuse ? "Yes" : cu.hpReuse === false ? "No" : "Unk"}
                    </span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => setSelectedCU(cu)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3 text-zinc-500" />
                  </button>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => toggleCompare(cu.id)}
                        className="rounded border-zinc-700 bg-black/40 text-[var(--brand-secondary)] focus:ring-0 focus:ring-offset-0"
                      />
                      <span>Compare</span>
                    </label>

                    {cu.url && (
                      <a
                        href={cu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all"
                        title="Visit Credit Union Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── FLOATING COMPARE TRAY ─── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-4 text-xs font-mono animate-fade-in">
          <span className="text-zinc-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--brand-secondary-light)]" />
            <span>
              <strong className="text-white">{compareList.length}</strong> CUs selected
            </span>
          </span>

          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2 rounded-xl bg-[var(--brand-secondary)] text-black font-semibold uppercase tracking-wider shadow-[0_0_20px_-3px_var(--brand-glow-secondary)] hover:opacity-90 transition-all"
          >
            Compare Now
          </button>

          <button
            onClick={() => setCompareList([])}
            className="text-zinc-500 hover:text-zinc-300 underline underline-offset-4"
          >
            Clear
          </button>
        </div>
      )}

      {/* ─── DETAIL MODAL ─── */}
      {selectedCU && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCU(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[var(--brand-surface)] border border-white/15 p-6 md:p-8 flex flex-col gap-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative animate-fade-in text-zinc-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-semibold tracking-wider ${
                      selectedCU.creditPull === "Soft"
                        ? "bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary-light)] border border-[var(--brand-secondary)]/30"
                        : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {selectedCU.creditPull || "Unknown"} Pull
                  </span>
                  {selectedCU.creditBureau && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10">
                      {selectedCU.creditBureau}
                    </span>
                  )}
                  {selectedCU.joinAnywhere && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono text-[var(--brand-primary-light)] bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30">
                      Join Anywhere
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">{selectedCU.name}</h2>
                {selectedCU.url && (
                  <a
                    href={selectedCU.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[var(--brand-secondary-light)] hover:underline flex items-center gap-1.5 mt-1.5"
                  >
                    <span>{selectedCU.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedCU(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rates Overview Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">PLOC Interest Rate</span>
                <span className="text-lg font-extrabold text-white font-heading mt-1 block">
                  {selectedCU.plocRate ? `${selectedCU.plocRate}%` : "N/A"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Lowest Card Rate</span>
                <span className="text-lg font-extrabold text-white font-heading mt-1 block">
                  {selectedCU.lowestCardRate ? `${selectedCU.lowestCardRate}%` : "N/A"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Hard Pull Reuse</span>
                <span
                  className={`text-lg font-extrabold font-heading mt-1 block ${
                    selectedCU.hpReuse ? "text-[var(--brand-secondary-light)]" : "text-zinc-500"
                  }`}
                >
                  {selectedCU.hpReuse ? "Supported" : "Not Supported"}
                </span>
                {selectedCU.hpDuration && (
                  <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block">{selectedCU.hpDuration}</span>
                )}
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--brand-secondary-light)]" /> Membership Eligibility
              </h4>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {selectedCU.eligibility || "No specific qualification notes recorded."}
              </div>
            </div>

            {/* Underwriting Notes */}
            {selectedCU.dataNotes && (
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Strategic Intel &amp; Notes
                </h4>
                <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                  {selectedCU.dataNotes}
                </div>
              </div>
            )}

            {/* Rewards Checking */}
            {selectedCU.rewardsChecking && (
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-mono uppercase text-[var(--brand-primary-light)] tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Rewards Checking Benefits
                </h4>
                <div className="p-4 rounded-2xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20 text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                  {selectedCU.rewardsChecking}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => toggleFavorite(selectedCU.id)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono flex items-center gap-2 hover:bg-white/5"
              >
                <Star
                  className={`w-4 h-4 ${favorites.includes(selectedCU.id) ? "text-amber-400 fill-current" : ""}`}
                />
                <span>{favorites.includes(selectedCU.id) ? "Saved to Favorites" : "Add to Favorites"}</span>
              </button>

              {selectedCU.url && (
                <a
                  href={selectedCU.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[var(--brand-secondary)] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:opacity-90 shadow-[0_0_20px_-3px_var(--brand-glow-secondary)]"
                >
                  <span>Visit Institution</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── COMPARE MODAL ─── */}
      {isCompareOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsCompareOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[var(--brand-surface)] border border-white/15 p-6 md:p-8 flex flex-col gap-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative animate-fade-in text-zinc-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white font-heading">Side-by-Side Comparison</h2>
                <p className="text-xs font-mono text-zinc-500 mt-1">Comparing {comparedCUs.length} institutions</p>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-3 text-zinc-500 font-mono uppercase">Feature</th>
                    {comparedCUs.map((cu) => (
                      <th key={cu.id} className="p-3 text-white font-heading font-bold text-sm min-w-[180px]">
                        {cu.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr>
                    <td className="p-3 text-zinc-500">Credit Pull</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3 font-semibold text-white">
                        {cu.creditPull || "Unk"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-zinc-500">Bureau</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3 text-zinc-300">
                        {cu.creditBureau || "Unk"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-zinc-500">PLOC Rate</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3 text-amber-300 font-bold">
                        {cu.plocRate ? `${cu.plocRate}%` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-zinc-500">Card Rate</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3 text-white">
                        {cu.lowestCardRate ? `${cu.lowestCardRate}%` : "N/A"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-zinc-500">HP Reuse</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3 text-white">
                        {cu.hpReuse ? `Yes (${cu.hpDuration || "duration unk"})` : "No"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-zinc-500">Join Anywhere</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3 text-white">
                        {cu.joinAnywhere ? "Yes" : "No"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-zinc-500">Official Site</td>
                    {comparedCUs.map((cu) => (
                      <td key={cu.id} className="p-3">
                        {cu.url ? (
                          <a
                            href={cu.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--brand-secondary-light)] hover:underline flex items-center gap-1"
                          >
                            <span>Visit</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
