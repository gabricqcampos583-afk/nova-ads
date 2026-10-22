import React from 'react';
import { Bolt, Mail, Phone, Lock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#02050e] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Columna 1: Branding y Descripción */}
        <div className="space-y-4 md:col-span-2">
          <a href="#inicio" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black">
              <Bolt className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              NOVA<span className="text-cyan-400">ADS</span>
            </span>
          </a>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed">
            Agencia publicitaria especializada en la creación de campañas de alto impacto, formatos 3D interactivos y estrategias de crecimiento acelerado para negocios en el ecosistema digital.
          </p>
        </div>

        {/* Columna 2: Navegación Rápida */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Navegación</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
            </li>
            <li>
              <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto & Acceso Admin */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Contacto & Admin</h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>contacto@novaads.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>+506 8888 8888</span>
            </li>
            <li className="pt-2">
              <a
                href="/admin"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400 text-xs text-gray-200 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Panel Privado /admin</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea Divisoria y Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>© 2026 Nova Ads Platform Inc. Todos los derechos reservados.</p>
        <p className="flex items-center space-x-1">
          <span>Diseñado para impulsar marcas excepcionales</span>
        </p>
      </div>
    </footer>
  );
}
