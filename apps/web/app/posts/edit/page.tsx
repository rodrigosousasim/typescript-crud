import { Suspense } from 'react';
import EditPost from './EditPost';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 text-slate-500 font-medium">
        Carregando editor do post...
      </div>
    }>
      <EditPost />
    </Suspense>
  );
}
