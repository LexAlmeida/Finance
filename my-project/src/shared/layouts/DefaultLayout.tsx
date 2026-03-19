import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Finance } from '../../pages/Finance';
import { useState } from 'react';
import { Box } from '@mui/material';

export const DefaultLayout = () => {
  const [atualizarLista, ] = useState<() => void>(() => {});
  return (
    <div>
      <Header carregarTransacoes={atualizarLista} /> 
      <Box sx={{ maxWidth: { xs: "95%", md: "80%" }, mx: "auto" }}>
        <Finance/>
      </Box>
      <main>
        <Outlet />
      </main>
    </div>
  );
};