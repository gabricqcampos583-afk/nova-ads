import React from 'react';

export default function Workflow() {
  return (
    <section className="py-20 bg-[#050b18] text-center px-4">
      <h2 className="text-3xl font-black text-white mb-12">Cómo trabajamos</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {['01. Conocemos tu negocio', '02. Diseño estratégico', '03. Creación & Despliegue', '04. Análisis & Optimización'].map((step, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold">{step}</div>
        ))}
      </div>
    </section>
  );
}
