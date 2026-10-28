import React from 'react';
import { X, Scroll, ShieldCheck, ExternalLink, AlertTriangle, BookCheck } from 'lucide-react';
import { Metadata, Source, ResearchGap } from '../types/lore';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: Metadata;
  sources: Source[];
  researchGaps: ResearchGap[];
}

export const SourcesModal: React.FC<SourcesModalProps> = ({
  isOpen,
  onClose,
  metadata,
  sources,
  researchGaps
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] rounded-2xl bg-card border border-gold-500/30 overflow-hidden shadow-2xl flex flex-col my-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-night">
          <div className="flex items-center gap-2.5">
            <Scroll className="w-5 h-5 text-gold-400" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory">
                Imperial Canon Policy & Citations
              </h3>
              <p className="text-xs text-parchment/60 font-sans">
                {metadata.project_title} · Schema v{metadata.schema_version}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-card border border-white/10 hover:border-gold-400 text-parchment/70 hover:text-ivory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Canon Policy */}
          <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-gold-400">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Strict Canon Policy</span>
            </div>
            <p className="text-sm font-sans text-parchment/90 leading-relaxed">
              {metadata.canon_policy}
            </p>
          </div>

          {/* Research Notes */}
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold">
              Archival Continuity Notes
            </h4>
            <p className="text-sm font-sans text-parchment/80 leading-relaxed">
              {metadata.research_notes}
            </p>
          </div>

          {/* Official Moonton Sources list */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-serif tracking-wider text-parchment/50 font-bold flex items-center gap-1.5">
              <BookCheck className="w-4 h-4 text-gold-400" />
              <span>Official Moonton Primary Sources ({sources.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sources.map((src) => (
                <div
                  key={src.source_id}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-ivory">{src.title}</span>
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300">
                      {src.reliability}
                    </span>
                  </div>
                  <p className="text-[11px] text-parchment/60 font-sans">
                    Type: {src.source_type.replace(/_/g, ' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Continuity & Research Gaps */}
          {researchGaps.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-xs uppercase font-serif tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Documented Continuity Gaps in Imperial Records</span>
              </h4>
              <div className="space-y-2">
                {researchGaps.map((gap) => (
                  <div
                    key={gap.gap_id}
                    className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs space-y-1"
                  >
                    <h5 className="font-serif font-bold text-amber-300">{gap.topic}</h5>
                    <p className="text-parchment/80 font-sans">{gap.details}</p>
                    <p className="text-[11px] text-parchment/50 font-serif italic pt-1">
                      Continuity Impact: {gap.impact_on_continuity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
