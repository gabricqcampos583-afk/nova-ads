
import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Shield, Loader2, AlertCircle } from "lucide-react";

export function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanEmail = email.trim();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError("Correo o contraseña incorrectos.");
        } else if (authError.message.includes("Email not confirmed")) {
          setError("El correo no está confirmado en Supabase.");
        } else {
          setError(`Error: ${authError.message}`);
        }
        setLoading(false);
        return;
      }

      if (data?.session) {
        setLoading(false);
        onLoginSuccess();
      }
    } catch (err: any) {
      setError("Ocurrió un error inesperado de conexión.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 text-cyan-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Panel de Administración</h2>
          <p className="text-gray-400 text-sm">Nova Ads - Acceso Restringido</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center space-x-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              placeholder="nova-ads@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verificando...</span>
              </>
            ) : (
              <span>Ingresar al Panel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}