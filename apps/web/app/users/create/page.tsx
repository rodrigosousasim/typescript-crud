'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateUserPage() {
  const router = useRouter();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ 
    vid: '', 
    name: '', 
    email: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          vid: Number(form.vid), 
          name: form.name, 
          email: form.email 
        }),
      });

      if (res.ok) {
        router.push('/users');
        router.refresh();
      } else {
        const errorData = await res.json();
        const errorMessage = Array.isArray(errorData.message) 
          ? errorData.message.join(', ') 
          : errorData.message;
        
        alert(`Erro ao cadastrar: ${errorMessage || 'Verifique os dados'}`);
      }
    } catch (err) {
      alert("Falha na comunicação com o servidor.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-8">
        <Link href="/users" className="text-sm text-blue-600 hover:underline mb-2 inline-block">
          ← Voltar para a lista
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Novo Usuário</h1>
        <p className="text-slate-500">Preencha os campos abaixo para registrar um novo usuário no sistema.</p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Identificador Visual (VID)</label>
            <input 
              type="number" 
              placeholder="Ex: 1234" 
              required 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              value={form.vid} 
              onChange={e => setForm({...form, vid: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
            <input 
              type="text" 
              placeholder="Nome do usuário" 
              required 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label>
            <input 
              type="email" 
              placeholder="usuario@dominio.com" 
              required 
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={saving}
              className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:bg-slate-400"
            >
              {saving ? 'Cadastrando...' : 'Salvar Usuário'}
            </button>
            <button 
              type="button" 
              onClick={() => router.back()} 
              className="flex-1 border border-slate-300 py-3 rounded-lg font-medium hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}