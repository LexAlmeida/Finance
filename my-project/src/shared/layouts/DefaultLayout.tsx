import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

export const DefaultLayout = () => {
  return (
    <div>
      <Header /> {/* O Header fica aqui */}
      
      <main>
        <Outlet /> {/* O 'Outlet' é onde o React vai encaixar a página filha (Home, etc) */}
      </main>
    </div>
  );
};