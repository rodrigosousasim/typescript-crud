'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      if (!res.ok) throw new Error('Falha ao buscar posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir este post definitivamente?')) return;
    try {
      const res = await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p: any) => p.id !== id));
      }
    } catch (err) {
      alert('Erro na comunicação com o servidor');
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500">Carregando posts...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Posts Recentes</h2>
        <Link href="/posts/create" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
          + Novo Post
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Título</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Autor (VID)</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Tags</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post: any) => (
              <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{post.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-mono">{post.author_vid}</td>
                <td className="px-6 py-4">
                  {post.tags?.map((t: string) => (
                    <span key={t} className="inline-block bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded mr-1 uppercase font-bold">
                      {t}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link href={`/posts/edit?id=${post.id}`} className="text-blue-600 hover:underline text-sm font-semibold">Editar</Link>
                  <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline text-sm font-semibold">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}