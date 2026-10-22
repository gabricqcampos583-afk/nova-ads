import React from 'react';
import { Share2, Target, Palette, Video, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const servicesList = [
  { icon: Share2, title: "Publicidad para redes sociales", description: "Campañas altamente segmentadas en Meta, Instagram y TikTok para conectar con tu audiencia." },
  { icon: Target, title: "Campañas de Google Ads", description: "Posiciónate en el momento exacto en que tus clientes buscan tus servicios." },
  { icon: Palette, title: "Diseño de anuncios publicitarios", description: "Creativos visuales y banners optimizados para captar la atención de inmediato." },
  { icon: Video, title: "Creación de contenido audiovisual", description: "Videos dinámicos diseñados para maximizar conversiones e interacción." },
  { icon: TrendingUp, title: "Estrategia de marketing digital", description: "Planes a la medida para estructurar el crecimiento publicitario de tu empresa." },
  { icon: BarChart3, title: "Optimización y análisis de campañas", description: "Monitoreo constante para mejorar el rendimiento y el retorno de inversión." }
];

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="servicios" className="py-24 bg-[#050b18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Soluciones digitales para <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">hacer crecer tu marca</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
                <button
                  onClick={() => onSelectService?.(service.title)}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Solicitar servicio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
