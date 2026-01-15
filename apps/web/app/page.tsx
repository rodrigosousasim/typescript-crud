'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface User {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, lastUser: '...' });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch<User[]>('/users');
        setStats({
          total: data.length,
          lastUser: data.at(-1)?.name ?? 'Nenhum'
        });
      } catch (err) {
        console.error("Falha ao carregar estatísticas do dashboard:", err);
      }
    };

    loadStats();
  }, []);

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Visão Geral</h1>
        <p className="text-slate-500">Bem-vindo ao centro de controle dos módulos.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total de Usuários</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">{stats.total}</span>
            <span className="text-green-500 text-sm font-medium">registrados</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Último Cadastro</div>
          <div className="mt-2 text-2xl font-bold text-slate-800 truncate">
            {stats.lastUser}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Módulos Online</div>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">USUÁRIOS</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-400 text-xs font-bold rounded">PRODUTOS (OFF)</span>
          </div>
        </div>
      </div>
    </div>
  );
}