import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ToolBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate('/')}>Empresa Exemplo</Button>
          </Typography>
          {user ? (
            <>
              {(user.role === 'USER' || user.role === 'ADMIN') && (
                <Button color="inherit" onClick={() => navigate('/user-dashboard')}>Funcionário</Button>
              )}
              {user.role === 'ADMIN' && (
                <Button color="inherit" onClick={() => navigate('/admin-dashboard')}>Dados da Empresa</Button>
              )}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
