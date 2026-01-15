'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const loadUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error('Falha ao buscar usuários');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(users.filter((user: any) => user.id !== id));
      } else {
        alert('Erro ao excluir usuário no servidor.');
      }
    } catch (err) {
      alert('Falha na comunicação com a API.');
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500">Carregando lista de usuários...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Usuários Ativos</h2>
        <Link href="/users/create" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
          + Novo Usuário
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">VID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Nome</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-slate-400">Nenhum usuário cadastrado.</td>
              </tr>
            ) : (
              users.map((user: any) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">{user.vid}</td>
                  <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/users/edit?id=${user.id}`} className="text-blue-600 hover:underline text-sm font-semibold">
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(user.id)} // Aciona a lógica de exclusão
                      className="text-red-600 hover:underline text-sm font-semibold"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}