'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePostPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', author_vid: '', tags: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          author_vid: Number(form.author_vid),
          tags: form.tags.split(',').map(t => t.trim()).filter(t => t !== '')
        }),
      });
      if (res.ok) router.push('/posts');
      else alert('Erro ao criar post. Verifique se o VID do autor existe.');
    } catch (err) {
      alert('Falha na rede');
    } finally { setSaving(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Criar Novo Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <input type="number" placeholder="VID do Autor" required className="w-full p-3 border rounded-lg" value={form.author_vid} onChange={e => setForm({...form, author_vid: e.target.value})} />
        <input type="text" placeholder="Título do Post" required className="w-full p-3 border rounded-lg" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <textarea placeholder="Conteúdo do post..." required className="w-full p-3 border rounded-lg h-40" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
        <input type="text" placeholder="Tags (separadas por vírgula)" className="w-full p-3 border rounded-lg" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
        <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-slate-400">
          {saving ? 'Publicando...' : 'Publicar Post'}
        </button>
      </form>
    </div>
  );
}