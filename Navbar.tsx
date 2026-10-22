import React, { useState } from 'react';
import { MessageCircle, Phone, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Marca */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                NOVA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">ADS</span>
              </span>
            </a>
          </div>

          {/* Menú de Navegación Principal (Escritorio) */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
            <a href="#nosotros" className="hover:text-cyan-400 transition-colors">Nosotros</a>
            <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
            <a href="#flujo" className="hover:text-cyan-400 transition-colors">Proceso</a>
          </div>

          {/* Números de Contacto y Botón de Acción (Escritorio) */}
          <div className="hidden xl:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-xs font-medium border-r border-white/10 pr-6">
              <a 
                href="https://wa.me/50670370786" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-gray-300 hover:text-cyan-400 transition-colors"
                title="Escribir por WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <span>+506 7037 0786</span>
              </a>

              <a 
                href="https://wa.me/50662994859" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-gray-300 hover:text-cyan-400 transition-colors"
                title="Llamar o escribir"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+506 6299 4859</span>
              </a>
            </div>

            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
            >
              SOLICITAR COTIZACIÓN
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030712] border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-gray-300">
            <a 
              href="#inicio" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Inicio
            </a>
            <a 
              href="#nosotros" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Nosotros
            </a>
            <a 
              href="#servicios" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Servicios
            </a>
            <a 
              href="#flujo" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors py-1"
            >
              Proceso
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Líneas directas:</div>
            <a 
              href="https://wa.me/50670370786" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-gray-200 hover:text-cyan-400"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>+506 7037 0786</span>
            </a>
            <a 
              href="https://wa.me/50662994859" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-gray-200 hover:text-cyan-400"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>+506 6299 4859</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold tracking-wide"
            >
              SOLICITAR COTIZACIÓN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
