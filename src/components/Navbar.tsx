import React from 'react';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            N
          </div>
          <span className="text-xl font-bold tracking-wider text-white">
            NOVA <span className="text-cyan-400">ADS</span>
          </span>
        </div>

        {/* Menú de Navegación */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="hover:text-cyan-400 transition-colors"
          >
            Inicio
          </button>
          
          <button 
            onClick={() => scrollToSection('nosotros')} 
            className="hover:text-cyan-400 transition-colors"
          >
            Nosotros
          </button>

          <button 
            onClick={() => scrollToSection('servicios')} 
            className="hover:text-cyan-400 transition-colors"
          >
            Servicios
          </button>

          <button 
            onClick={() => scrollToSection('proceso')} 
            className="hover:text-cyan-400 transition-colors"
          >
            Proceso
          </button>
        </div>

        {/* Botón de Contacto */}
        <button 
          onClick={onOpenContact}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm"
        >
          Cotizar
        </button>
      </div>
    </nav>
  );
}
