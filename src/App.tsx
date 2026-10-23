import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import { Footer } from './components/Footer';

// Interfaz de Solicitudes / Leads
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: 'Nuevo' | 'En Proceso' | 'Completado';
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [adminTab, setAdminTab] = useState<'overview' | 'leads'>('overview');

  // Estados de inicio de sesión para el Admin Panel
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Almacenamiento local persistente para las solicitudes de clientes
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('nova_ads_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        id: '1',
        name: 'Cliente Ejemplo',
        email: 'contacto@cliente.com',
        phone: '+506 8888-9999',
        service: 'Publicidad en Meta & Google Ads',
        message: 'Solicitud de campaña activa.',
        date: new Date().toLocaleDateString(),
        status: 'En Proceso'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nova_ads_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleOpenModal = (serviceName?: string) => {
    setSelectedService(serviceName || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  // Autenticación del formulario Admin
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim() !== '') {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Por favor ingresa la contraseña de administrador.');
    }
  };

  const handleSubmitLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newLead: Lead = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || 'No indicado',
      service: selectedService || 'Consulta General',
      message: formData.get('message') as string,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Nuevo'
    };

    setLeads([newLead, ...leads]);
    alert('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.');
    handleCloseModal();
  };

  const handleStatusChange = (id: string, newStatus: 'Nuevo' | 'En Proceso' | 'Completado') => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('¿Eliminar esta solicitud?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  // -------------------------------------------------------------------
  // PANEL DE ADMINISTRACIÓN ACCESIBLE SOLO VÍA URL (/admin)
  // -------------------------------------------------------------------
  if (currentPath === '/admin' || currentPath === '/login') {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xl mx-auto mb-3 shadow-lg shadow-cyan-500/20">
                N
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wider">
                NOVA <span className="text-cyan-400">ADS</span>
              </h2>
              <p className="text-slate-400 text-xs mt-1">Ingresa tu contraseña para acceder al panel</p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Contraseña de Administrador</label>
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
              >
                Acceder al Panel
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => navigateTo('/')} 
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                ← Volver al sitio principal
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => navigateTo('/')}
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                N
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                NOVA <span className="text-cyan-400">ADS</span>
              </span>
              <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-full font-medium">
                Admin Console
              </span>
            </div>

            <button 
              onClick={() => {
                setIsAdminAuthenticated(false);
                setAdminPassword('');
              }}
              className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3.5 py-2 rounded-xl transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-grow">
          <div className="flex border-b border-slate-800 mb-8 gap-2">
            <button
              onClick={() => setAdminTab('overview')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                adminTab === 'overview'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Vista General
            </button>
            <button
              onClick={() => setAdminTab('leads')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
                adminTab === 'leads'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Solicitudes</span>
              <span className="bg-cyan-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {leads.length}
              </span>
            </button>
          </div>

          {adminTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Total Solicitudes</p>
                  <p className="text-3xl font-bold text-white mt-2">{leads.length}</p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Nuevas</p>
                  <p className="text-3xl font-bold text-amber-400 mt-2">
                    {leads.filter(l => l.status === 'Nuevo').length}
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase">En Proceso</p>
                  <p className="text-3xl font-bold text-blue-400 mt-2">
                    {leads.filter(l => l.status === 'En Proceso').length}
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Completadas</p>
                  <p className="text-3xl font-bold text-emerald-400 mt-2">
                    {leads.filter(l => l.status === 'Completado').length}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Solicitudes Recientes</h3>
                <div className="space-y-3">
                  {leads.map(lead => (
                    <div key={lead.id} className="p-4 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <span className="font-semibold text-white">{lead.name}</span>
                        <p className="text-xs text-slate-400">{lead.message}</p>
                      </div>
                      <span className="text-xs text-cyan-400">{lead.service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {adminTab === 'leads' && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Lista Completa de Contactos</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-xs text-slate-400 uppercase">
                    <tr>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4">Servicio</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40">
                        <td className="px-6 py-4 font-semibold text-white">{lead.name}</td>
                        <td className="px-6 py-4 text-xs text-cyan-400">
                          <div>{lead.email}</div>
                          <div className="text-slate-400">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-xs">{lead.service}</td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                            className="bg-slate-950 border border-slate-800 text-xs p-1.5 rounded-lg text-white focus:outline-none"
                          >
                            <option value="Nuevo">Nuevo</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Completado">Completado</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // SITIO WEB PÚBLICO ORIGINAL INTACTO
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative">
      <Navbar onOpenContact={() => handleOpenModal()} />

      <main className="flex-grow">
        <Hero onOpenContact={() => handleOpenModal('Consulta General')} />

        <section id="nosotros" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900/80">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Sobre <span className="text-cyan-400">Nova Ads</span></h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Somos una agencia enfocada en impulsar negocios mediante campañas publicitarias de alto rendimiento en Meta y Google, combinadas con estrategias creativas y optimización continua de conversión.
            </p>
          </div>
        </section>

        <section id="servicios">
          <Services onSelectService={(service: string) => handleOpenModal(service)} />
        </section>

        <section id="proceso" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900/80">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Nuestro <span className="text-cyan-400">Proceso</span> de Trabajo</h2>
            <p className="text-slate-400 text-sm">Cómo impulsamos los resultados de tu marca paso a paso</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <span className="text-cyan-400 font-bold text-lg">01</span>
              <h3 className="font-bold text-white mt-2">Diagnóstico</h3>
              <p className="text-xs text-slate-400 mt-1">Análisis de tu mercado objetivo y competidores.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <span className="text-cyan-400 font-bold text-lg">02</span>
              <h3 className="font-bold text-white mt-2">Estrategia</h3>
              <p className="text-xs text-slate-400 mt-1">Diseño de contenidos, copies y embudo de ventas.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <span className="text-cyan-400 font-bold text-lg">03</span>
              <h3 className="font-bold text-white mt-2">Lanzamiento</h3>
              <p className="text-xs text-slate-400 mt-1">Puesta en marcha de campañas optimizadas.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <span className="text-cyan-400 font-bold text-lg">04</span>
              <h3 className="font-bold text-white mt-2">Escalamiento</h3>
              <p className="text-xs text-slate-400 mt-1">Optimización continua para maximizar el ROI.</p>
            </div>
          </div>
        </section>
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

            <form onSubmit={handleSubmitLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Nombre Completo</label>
                <input 
                  required 
                  name="name"
                  type="text" 
                  placeholder="Tu nombre" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Correo Electrónico</label>
                  <input 
                    required 
                    name="email"
                    type="email" 
                    placeholder="tu@email.com" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Teléfono / WhatsApp</label>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="+506 0000-0000" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Mensaje</label>
                <textarea 
                  required 
                  name="message"
                  rows={3} 
                  placeholder="¿En qué te podemos ayudar?" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
              >
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}