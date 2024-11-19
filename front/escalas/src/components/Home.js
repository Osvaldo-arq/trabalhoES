import React, { useEffect, useState } from 'react';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        console.log("Usuário recuperado:", storedUser);
        setUserData(storedUser);  // Isso irá armazenar os dados completos, incluindo idFuncionario
    }
}, []);

  return (
    <div>
        <h2>Página Inicial</h2>
        {userData ? (
            <div>
                <p><strong>Token:</strong> {userData.token}</p>
                <p><strong>Role:</strong> {userData.role}</p>
                <p><strong>ID Funcionário:</strong> {userData.idFuncionario}</p> {/* Exibe o idFuncionario */}
            </div>
        ) : (
            <p>Carregando dados do usuário...</p>
        )}
    </div>
  );
};

export default Home;
