import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import HolographicPrism3D from './HolographicPrism3D';

interface HeroProps {
  onOpenContact: (service?: string) => void;
  onExploreServices: () => void;
}

export default function Hero({ onOpenContact, onExploreServices }: HeroProps) {
  return (
    <section id="inicio" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>TU MARCA MERECE DESTACAR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Publicidad digital que <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">impulsa tu negocio</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
            En Nova Ads transformamos tus ideas en campañas publicitarias creativas que conectan con tu audiencia, fortalecen tu marca y te ayudan a alcanzar tus objetivos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => onOpenContact?.()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Quiero impulsar mi negocio</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExploreServices}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Descubrir servicios
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Creatividad estratégica</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Publicidad personalizada</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Seguimiento de resultados</span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <HolographicPrism3D />
        </div>
      </div>
    </section>
  );
}
