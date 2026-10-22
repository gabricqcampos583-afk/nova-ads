import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Workflow from './components/Workflow';
import CtaSection from './components/CtaSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import { Login } from './pages/Login';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      subscription.unsubscribe();
    };
  }, []);

  if (currentRoute === '/admin') {
    if (!session) {
      return <Login onLoginSuccess={() => setCurrentRoute('/admin')} />;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      <Navbar onOpenContact={() => console.log("Clic en el botón del Navbar")} />
      <main>
        <section id="inicio">
          <Hero onOpenContact={() => console.log("Abriendo formulario de contacto")} />
        </section>
        <section id="nosotros">
          <About />
        </section>
        <section id="servicios">
          <Services onSelectService={(servicio) => {
  setSelectedService(servicio);
  setIsModalOpen(true);
}} />
        </section>
        <section id="flujo">
          <Workflow />
        </section>
        <CtaSection />
        <section id="contacto">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}