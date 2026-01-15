'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function EditPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    content: '',
    author_vid: '',
    tags: ''
  });

  /**
   * Carrega o post pelo ID vindo da query string (?id=)
   */
  const fetchPost = useCallback(async () => {
    if (!id) {
      router.push('/posts');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        cache: 'no-store'
      });

      if (!res.ok) throw new Error('Post não encontrado');

      const data = await res.json();

      setForm({
        title: data.title ?? '',
        content: data.content ?? '',
        author_vid: String(data.author_vid ?? ''),
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : ''
      });
    } catch (error) {
      alert('Erro ao carregar o post. Ele pode não existir.');
      router.push('/posts');
    } finally {
      setLoading(false);
    }
  }, [id, API_URL, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  /**
   * Atualiza o post
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          author_vid: Number(form.author_vid),
          tags: form.tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
        })
      });

      if (!res.ok) {
        const err = await res.json();
        const msg = Array.isArray(err.message)
          ? err.message.join(', ')
          : err.message;

        throw new Error(msg || 'Erro ao atualizar');
      }

      router.push('/posts');
    } catch (error: any) {
      alert(`Falha ao salvar alterações: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Estados de carregamento
   */
  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500 font-medium">
        Recuperando conteúdo do post...
      </div>
    );
  }

  /**
   * UI
   */
  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-8">
        <Link
          href="/posts"
          className="text-sm text-blue-600 hover:underline mb-2 inline-block"
        >
          ← Voltar para a lista de posts
        </Link>

        <h1 className="text-2xl font-bold text-slate-900">
          Editar Post
        </h1>

        <p className="text-slate-500 text-sm">
          ID do Registro: <span className="font-mono">{id}</span>
        </p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                VID do Autor
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                value={form.author_vid}
                onChange={e =>
                  setForm({ ...form, author_vid: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                placeholder="ex: tech, nestjs, prisma"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.tags}
                onChange={e =>
                  setForm({ ...form, tags: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Título
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.title}
              onChange={e =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Conteúdo do Post
            </label>
            <textarea
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-48 resize-none"
              value={form.content}
              onChange={e =>
                setForm({ ...form, content: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all disabled:bg-slate-400"
            >
              {saving ? 'Salvando Alterações...' : 'Salvar Post'}
            </button>

            <Link
              href="/posts"
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
