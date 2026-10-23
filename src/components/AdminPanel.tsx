import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import { Footer } from './components/Footer';

// Importamos TU componente Admin original:
import AdminPanel from './components/AdminPanel'; 

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenModal = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  // Si la ruta es /admin o /login, muestra TU AdminPanel original
  if (currentPath === '/admin' || currentPath === '/login') {
    return <AdminPanel />;
  }

  // Vista pública normal
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenContact={() => handleOpenModal()} />

      <main className="flex-grow">
        <Hero onOpenContact={() => handleOpenModal('Consulta General')} />
        <Services onSelectService={(service: string) => handleOpenModal(service)} />
      </main>

      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-2"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">Contáctanos</h3>
            <p className="text-slate-400 text-sm mb-6">
              {selectedService 
                ? `Solicitando cotización para: ${selectedService}` 
                : 'Ponte en contacto con el equipo de Nova Ads.'}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado con éxito!'); handleCloseModal(); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Nombre</label>
                <input required type="text" placeholder="Tu nombre" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Correo Electrónico</label>
                <input required type="email" placeholder="tu@email.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Mensaje</label>
                <textarea required rows={3} placeholder="¿En qué te podemos ayudar?" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg transition-colors">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
