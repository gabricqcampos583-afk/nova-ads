import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, LogOut, Search, Trash2, Download, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsAuthenticated(true);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Error de acceso: ' + error.message);
    } else {
      setIsAuthenticated(true);
      fetchSolicitudes();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const fetchSolicitudes = async () => {
    setLoading(true);
    let query = supabase.from('solicitudes').select('*').order('created_at', { ascending: false });
    const { data, error } = await query;
    if (!error) {
      setSolicitudes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchSolicitudes();
  }, [isAuthenticated]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('solicitudes').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, status: newStatus } : s));
    }
  };

  const deleteSolicitud = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
      const { error } = await supabase.from('solicitudes').delete().eq('id', id);
      if (!error) {
        setSolicitudes(solicitudes.filter(s => s.id !== id));
      }
    }
  };

  const exportCSV = () => {
    const headers = ['ID,Fecha,Cliente,Negocio,Correo,Telefono,Servicio,Presupuesto,Estado,Descripcion\n'];
    const rows = solicitudes.map(s => 
      `"${s.id}","${s.created_at}","${s.full_name}","${s.business_name}","${s.email}","${s.phone}","${s.service}","${s.budget || ''}","${s.status}","${s.description.replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `solicitudes_nova_ads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSolicitudes = solicitudes.filter(s => {
    const matchesStatus = filterStatus === 'todos' || s.status === filterStatus;
    const matchesSearch = s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <Shield className="w-12 h-12 text-cyan-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Panel de Administración</h2>
            <p className="text-gray-400 text-sm">Ingresa con tu cuenta autorizada de Nova Ads</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Correo de administrador</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                placeholder="admin@tudominio.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/20"
            >
              {loading ? 'Verificando...' : 'Ingresar al Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">Panel de Control - Nova Ads</h1>
            <p className="text-gray-400 text-sm">Gestiona todas las solicitudes recibidas</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-sm font-semibold text-red-400 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, negocio o correo..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto">
            {['todos', 'nuevo', 'en_proceso', 'completado'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize ${
                  filterStatus === status ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-400'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
            <button onClick={fetchSolicitudes} className="p-2 rounded-xl bg-white/5 text-gray-400">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Cliente / Negocio</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Servicio</th>
                  <th className="p-4">Presupuesto</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredSolicitudes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400">
                      No se encontraron solicitudes.
                    </td>
                  </tr>
                ) : (
                  filteredSolicitudes.map(s => (
                    <tr key={s.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 text-gray-400 whitespace-nowrap">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{s.full_name}</div>
                        <div className="text-xs text-cyan-400">{s.business_name}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-300">{s.email}</div>
                        <div className="text-xs text-gray-400">{s.phone}</div>
                      </td>
                      <td className="p-4 text-gray-200">{s.service}</td>
                      <td className="p-4 text-gray-300">{s.budget || 'N/A'}</td>
                      <td className="p-4">
                        <select
                          value={s.status}
                          onChange={e => updateStatus(s.id, e.target.value)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#030712] border border-white/10 text-cyan-400"
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="en_proceso">En Proceso</option>
                          <option value="completado">Completado</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteSolicitud(s.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
