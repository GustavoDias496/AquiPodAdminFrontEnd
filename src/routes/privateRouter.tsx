import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    let user = false;
    const userAuth = (): string | null => {
        return sessionStorage.getItem('auth');
      };
      
      if(userAuth() === 'true'){
        user = true
      }
  

  return user ? children : <Navigate to={'/'} />;
}
