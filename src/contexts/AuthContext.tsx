import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de autenticación
    const validUsers = [
      {
        id: '1',
        name: 'Administrador',
        email: 'admin@empresa.com',
        role: 'admin'
      },
      {
        id: '2',
        name: 'Supervisor Técnico',
        email: 'supervisor@empresa.com',
        role: 'supervisor'
      },
      {
        id: '3',
        name: 'Operador Metro',
        email: 'operador@empresa.com',
        role: 'operador'
      }
    ];

    // Buscar usuario válido
    const user = validUsers.find(u => u.email === email);
    
    if (user && password === 'admin123') {
      const userData: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 