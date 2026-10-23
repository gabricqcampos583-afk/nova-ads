import React from 'react';

export function Footer() {
  const phoneNumber = '+506 7037 0786';
  // Formato numérico limpio sin espacios ni símbolos para el enlace wa.me
  const whatsappUrl = 'https://wa.me/50670370786';

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Identidad de la empresa */}
        <div>
          <h3 className="text-xl font-bold text-white tracking-wider mb-2">
            NOVA <span className="text-cyan-400">ADS</span>
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Agencia de publicidad digital enfocada en escalar tu negocio con campañas de alto rendimiento.
          </p>
        </div>

        {/* Enlaces rápidos de navegación */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Navegación</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="hover:text-cyan-400 transition-colors"
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-cyan-400 transition-colors"
              >
                Nosotros
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-cyan-400 transition-colors"
              >
                Servicios
              </button>
            </li>
            <li>
              <button 
                onClick={() => document.getElementById('proceso')?.scrollIntoView({ behavior: 'smooth' })} 
                className="hover:text-cyan-400 transition-colors"
              >
                Proceso
              </button>
            </li>
          </ul>
        </div>

        {/* Datos de contacto con enlace directo a WhatsApp */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1.5"
              >
                📱 {phoneNumber}
              </a>
            </li>
            <li>
              <a 
                href="mailto:contacto@novaads.com" 
                className="hover:text-white transition-colors"
              >
                contacto@novaads.com
              </a>
            </li>
            <li className="text-slate-400">Costa Rica</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
        © 2026 Nova Ads. Todos los derechos reservados.
      </div>
    </footer>
  );
}