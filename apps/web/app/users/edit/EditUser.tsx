'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function EditUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    vid: '',
    name: '',
    email: ''
  });

  /**
   * Carrega usuário pelo ID da query string
   */
  const fetchUser = useCallback(async () => {
    if (!id) {
      router.push('/users');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        cache: 'no-store'
      });

      if (!res.ok) throw new Error('Usuário não encontrado');

      const data = await res.json();

      setForm({
        vid: String(data.vid ?? ''),
        name: data.name ?? '',
        email: data.email ?? ''
      });
    } catch (error) {
      alert('Erro ao carregar usuário.');
      router.push('/users');
    } finally {
      setLoading(false);
    }
  }, [id, API_URL, router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /**
   * Atualiza usuário
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vid: Number(form.vid),
          name: form.name,
          email: form.email
        })
      });

      if (!res.ok) {
        const err = await res.json();
        const msg = Array.isArray(err.message)
          ? err.message.join(', ')
          : err.message;

        throw new Error(msg || 'Erro ao atualizar usuário');
      }

      router.push('/users');
    } catch (error: any) {
      alert(`Falha ao salvar: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500 font-medium">
        Carregando dados do usuário...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <header className="mb-8">
        <Link
          href="/users"
          className="text-sm text-blue-600 hover:underline mb-2 inline-block"
        >
          ← Voltar para a lista
        </Link>

        <h1 className="text-2xl font-bold text-slate-900">
          Editar Usuário
        </h1>

        <p className="text-slate-500 text-sm">
          ID do Registro:{' '}
          <span className="font-mono">{id}</span>
        </p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              VID
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              value={form.vid}
              onChange={e =>
                setForm({ ...form, vid: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.email}
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:bg-slate-400"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>

            <Link
              href="/users"
              className="px-6 py-3 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-all"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
