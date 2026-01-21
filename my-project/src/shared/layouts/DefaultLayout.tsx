import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Finance } from '../../pages/Finance';
import { useState } from 'react';

export const DefaultLayout = () => {
  const [atualizarLista, setAtualizarLista] = useState<() => void>(() => {});
  return (
    <div>
      <Header carregarTransacoes={atualizarLista} /> 
      <Finance setCarregarTransacoes={setAtualizarLista} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};