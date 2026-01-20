import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Finance } from '../../pages/Finance';

export const DefaultLayout = () => {
  return (
    <div>
      <Header /> 
      <Finance/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};