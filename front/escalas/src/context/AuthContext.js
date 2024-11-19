import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    try {
      console.log('Enviando dados de login:', { login: username, password });
  
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }),
      });
  
      console.log('Resposta da API:', response);
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Usuário ou senha não reconhecidos.');
      }
  
      const data = await response.json();
      const userData = {
        login: username,
        role: data.role,
        token: data.token,
        idFuncionario: String(data.idFuncionario),
        funcionario: String(data.funcionario), 
      };
  
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
  
      return userData;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
