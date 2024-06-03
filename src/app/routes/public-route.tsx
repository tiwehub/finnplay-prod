import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '@/store/store';

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  console.log('PublicRoute: isAuthenticated =', isAuthenticated);

  return isAuthenticated ? <Navigate to="/games" /> : <Outlet />;
};

export default PublicRoute;
