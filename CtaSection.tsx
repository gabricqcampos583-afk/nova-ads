import React from 'react';

export default function CtaSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 text-center px-4 border-y border-white/10">
      <h2 className="text-3xl font-black text-white mb-4">¿Listo para impulsar tu marca?</h2>
      <button onClick={onOpenContact} className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-extrabold">Comenzar ahora</button>
    </section>
  );
}
