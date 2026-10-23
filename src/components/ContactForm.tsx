import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactFormProps {
  selectedService?: string | null;
}

export default function ContactForm({ selectedService }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: selectedService || 'Publicidad para redes sociales',
    budget: '',
    description: ''
  });

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Petición principal con nombres de columna estándar
      let payload: any = {
        full_name: formData.fullName,
        business_name: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        description: formData.description,
        status: 'nuevo'
      };

      let { error: dbError } = await supabase.from('solicitudes').insert([payload]);

      // 2. Si falla por diferencia en nombres de columnas, intenta con versión alternativa
      if (dbError) {
        console.warn('Reintentando con nombres de columnas alternativos...');
        const altPayload = {
          nombre: formData.fullName,
          empresa: formData.businessName,
          email: formData.email,
          telefono: formData.phone,
          servicio: formData.service,
          presupuesto: formData.budget,
          mensaje: formData.description,
          estado: 'nuevo'
        };

        const { error: altError } = await supabase.from('solicitudes').insert([altPayload]);
        if (altError) {
          throw new Error(dbError.message || altError.message);
        }
      }

      setSuccess(true);
      setFormData({
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        service: 'Publicidad para redes sociales',
        budget: '',
        description: ''
      });
    } catch (err: any) {
      console.error('Error detallado:', err);
      setError(err?.message || 'Ocurrió un error al enviar la solicitud. Revisa el SQL de Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-[#030712] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Solicita tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">publicidad</span>
          </h2>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl relative">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white">¡Solicitud enviada con éxito!</h3>
              <p className="text-gray-300 max-w-md mx-auto">
                Hemos recibido tus datos correctamente. Nuestro equipo se pondrá en contacto contigo muy pronto.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-colors"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del negocio *</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. Tienda Nova"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Correo electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="juan@tudominio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono o WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="+506 8888 8888"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Servicio que necesita *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Publicidad para redes sociales">Publicidad para redes sociales</option>
                    <option value="Campañas de Google Ads">Campañas de Google Ads</option>
                    <option value="Diseño de anuncios publicitarios">Diseño de anuncios publicitarios</option>
                    <option value="Creación de contenido audiovisual">Creación de contenido audiovisual</option>
                    <option value="Estrategia de marketing digital">Estrategia de marketing digital</option>
                    <option value="Optimización y análisis de campañas">Optimización y análisis de campañas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Presupuesto aproximado (opcional)</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Ej. $500 - $1000 / mes"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción del proyecto *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
                  placeholder="Cuéntanos brevemente sobre tu negocio y tus objetivos..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando solicitud...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar solicitud</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
