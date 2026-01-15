'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Usuários', href: '/users', icon: '👤' },
    { name: 'Posts', href: '/posts', icon: '📝' },
  ];

  return (
    <html lang="pt-br">
      <body className="bg-slate-50 flex h-screen overflow-hidden">
        <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
          <div className="p-6 text-xl font-bold border-b border-slate-800 tracking-tight">
            Admin <span className="text-blue-400">System</span>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
            v1.0.0 - Sobral/CE
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}