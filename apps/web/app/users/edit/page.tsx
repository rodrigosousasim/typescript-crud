import { Suspense } from 'react';
import EditUser from './EditUser';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 text-slate-500 font-medium">
        Carregando editor do usuário...
      </div>
    }>
      <EditUser />
    </Suspense>
  );
}
