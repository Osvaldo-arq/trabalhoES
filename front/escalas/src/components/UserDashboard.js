import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const UserDashboard = () => {
  const [funcionario, setFuncionario] = useState(null);
  const [entregas, setEntregas] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const idFuncionario = user?.idFuncionario;
  const token = user?.token;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  useEffect(() => {
    if (idFuncionario && token) {
      axios.get(`http://localhost:8080/api/funcionarios/${idFuncionario}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          setFuncionario(response.data); 
          setLoading(false); 
        })
        .catch(err => {
          setError('Erro ao carregar os dados do funcionário.');
          setLoading(false);
        });

      if (funcionario?.caminhoes?.id) {
        axios.get(`http://localhost:8080/api/entregas/caminhao/${funcionario.caminhoes.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(response => {
          setEntregas(response.data);
        })
        .catch(err => {
          setError('Erro ao carregar as entregas.');
        });
      }
    }
  }, [idFuncionario, token, funcionario?.caminhoes?.id]);

  const handleStatusChange = (idEntrega, novoStatus) => {
    const updatedEntregas = entregas.map(entrega => 
      entrega.id === idEntrega ? { ...entrega, status: novoStatus } : entrega
    );
    setEntregas(updatedEntregas);
  
    axios.put(`http://localhost:8080/api/entregas/${idEntrega}`, { status: novoStatus }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log('Status atualizado com sucesso');
      })
      .catch(err => {
        console.error('Erro ao atualizar o status', err);
        setError('Erro ao atualizar o status.');
      });
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const headerStyle = {
    backgroundColor: '#1976d2',
    color: 'white',         
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: 3, marginLeft: 'auto', marginRight: 'auto', paddingLeft: '50px', paddingRight: '50px', maxWidth: 'calc(100% - 100px)' }}>
        <Typography variant="h4" gutterBottom align="center">
        Funcionário
        </Typography>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={headerStyle}>Nome</TableCell>
              <TableCell align="center" sx={headerStyle}>CPF</TableCell>
              <TableCell align="center" sx={headerStyle}>Endereço</TableCell>
              <TableCell align="center" sx={headerStyle}>Telefone</TableCell>
              <TableCell align="center" sx={headerStyle}>Cargo</TableCell>
              <TableCell align="center" sx={headerStyle}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{funcionario.nome}</TableCell>
              <TableCell align="center">{funcionario.cpf}</TableCell>
              <TableCell align="center">{funcionario.endereco}</TableCell>
              <TableCell align="center">{funcionario.telefone}</TableCell>
              <TableCell align="center">{funcionario.cargo}</TableCell>
              <TableCell align="center">{funcionario.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {funcionario?.caminhoes && (
        <TableContainer component={Paper} sx={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: '50px', paddingRight: '50px', maxWidth: 'calc(100% - 100px)' }}>
          <Typography variant="h4" gutterBottom align="center">
           Caminhão
          </Typography>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={headerStyle}>ID Caminhão</TableCell>
                <TableCell align="center" sx={headerStyle}>Placa do Caminhão</TableCell>
                <TableCell align="center" sx={headerStyle}>Modelo do Caminhão</TableCell>
                <TableCell align="center" sx={headerStyle}>Capacidade do Caminhão</TableCell>
                <TableCell align="center" sx={headerStyle}>Status do Caminhão</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{funcionario.caminhoes.id}</TableCell>
                <TableCell align="center">{funcionario.caminhoes.placa}</TableCell>
                <TableCell align="center">{funcionario.caminhoes.modelo}</TableCell>
                <TableCell align="center">{funcionario.caminhoes.capacidade}</TableCell>
                <TableCell align="center">{funcionario.caminhoes.disponivel ? 'Disponível' : 'Indisponível'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {funcionario?.escalas && (
        <TableContainer component={Paper} sx={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: '50px', paddingRight: '50px', maxWidth: 'calc(100% - 100px)' }}>
          <Typography variant="h4" gutterBottom align="center">
            Escalas
          </Typography>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={headerStyle}>ID Escala</TableCell>
                <TableCell align="center" sx={headerStyle}>Data Início</TableCell>
                <TableCell align="center" sx={headerStyle}>Data Fim</TableCell>
                <TableCell align="center" sx={headerStyle}>Turno</TableCell>
                <TableCell align="center" sx={headerStyle}>Horario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{funcionario.escalas.id}</TableCell>
                <TableCell align="center">{formatDate(funcionario.escalas.data)}</TableCell>
                <TableCell align="center">{formatDate(funcionario.escalas.dataFim)}</TableCell>
                <TableCell align="center">{funcionario.escalas.turno}</TableCell>
                <TableCell align="center">{funcionario.escalas.horario}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {entregas.length > 0 && (
        <TableContainer component={Paper} sx={{ marginLeft: 'auto', marginRight: 'auto', paddingLeft: '50px', paddingRight: '50px', maxWidth: 'calc(100% - 100px)' }}>
          <Typography variant="h4" gutterBottom align="center">
            Entregas
          </Typography>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={headerStyle}>ID Entrega</TableCell>
                <TableCell align="center" sx={headerStyle}>Data Entrega</TableCell>
                <TableCell align="center" sx={headerStyle}>Endereço</TableCell>
                <TableCell align="center" sx={headerStyle}>Descrição</TableCell>
                <TableCell align="center" sx={headerStyle}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entregas.map((entrega) => (
                <TableRow key={entrega.id}>
                  <TableCell align="center">{entrega.id}</TableCell>
                  <TableCell align="center">{formatDate(entrega.dataEntrega)}</TableCell>
                  <TableCell align="center">{entrega.endereco}</TableCell>
                  <TableCell align="center">{entrega.descricao}</TableCell>
                  <TableCell align="center">
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={entrega.status}
                        onChange={(e) => handleStatusChange(entrega.id, e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="Pendente">Pendente</MenuItem>
                        <MenuItem value="Entregue">Entregue</MenuItem>
                        <MenuItem value="Cancelada">Cancelada</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserDashboard;
