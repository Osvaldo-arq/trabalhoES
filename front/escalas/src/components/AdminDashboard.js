import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Typography, MenuItem, Select, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import axios from 'axios';

function EditToolbar({ setRows, setRowModesModel }) {
  const handleAddClick = () => {
    const newRow = {
      id: "",
      nome: '',
      cpf: '',
      endereco: '',
      telefone: '',
      cargo: '',
      email: '',
      ativo: true,
      caminhoes: '',
      escalas: '',
      isNew: true
    };
    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'nome' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Novo Funcionário
      </Button>
    </GridToolbarContainer>
  );
}

function EscalaEditToolbar({ setEscalas, setEscalasRowModesModel }) {
  const handleAddEscalaClick = () => {
    const newRow = {
      id: "",
      descricao: '',
      horarioInicio: '',
      horarioFim: '',
      ativo: true,
      isNew: true
    };

    setEscalas((oldRows) => [...oldRows, newRow]);
    setEscalasRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'descricao' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddEscalaClick}>
        Nova escala
      </Button>
    </GridToolbarContainer>
  );
}

function CaminhaoEditToolbar({ setCaminhoes, setCaminhoesRowModesModel }) {
  const handleAddCaminhaoClick = () => {
    const newRow = {
      id: "",
      modelo: '',
      placa: '',
      capacidade: '',
      ativo: true,
      isNew: true
    };

    setCaminhoes((oldRows) => [...oldRows, newRow]);

    setCaminhoesRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'modelo' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddCaminhaoClick}>
        Novo Caminhão
      </Button>
    </GridToolbarContainer>
  );
};

function EntregasEditToolbar({ setEntregas, setEntregasRowModesModel }) {
  const handleAddEntregaClick = () => {
    const newRow = {
      id: "",
      descricao: '',
      dataEntrega: '',
      status: '',
      caminhoes: '',
      endereco:'',
      ativo: true,
      isNew: true,
    };

    setEntregas((oldRows) => [...oldRows, newRow]);

    setEntregasRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'descricao' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddEntregaClick}>
        Nova Entrega
      </Button>
    </GridToolbarContainer>
  );
}

function UsersEditToolbar({ setUsers, setUsersRowModesModel }) {
  const handleUsersAddClick = () => {
    const newRow = {
      id: "",
      login: '',
      password: '',
      role: 'USER',
      funcionario: '',
      isNew: true,
    };

    setUsers((oldRows) => [...oldRows, newRow]);
    setUsersRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'login' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleUsersAddClick}>
        Novo Usuário
      </Button>
    </GridToolbarContainer>
  );
}
const AdminDashboard = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [caminhoes, setCaminhoes] = useState([]);
  const [caminhoesRowModesModel, setCaminhoesRowModesModel] = useState({});
  const [escalas, setEscalas] = useState([]);
  const [escalasRowModesModel, setEscalasRowModesModel] = useState({});
  const [entregas, setEntregas] = useState([]);
  const [entregasRowModesModel, setEntregasRowModesModel] = useState({});
  const [users, setUsers] = useState([]);
  const [usersRowModesModel, setUsersRowModesModel] = useState({});
  const token = user?.token;

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      window.location.href = '/login';
    } else {
      axios
        .get('http://localhost:8080/api/funcionarios', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          const funcionarios = response.data.map((funcionario) => ({
            id: funcionario.id,
            nome: funcionario.nome,
            cpf: funcionario.cpf,
            endereco: funcionario.endereco,
            telefone: funcionario.telefone,
            cargo: funcionario.cargo,
            email: funcionario.email,
            ativo: funcionario.ativo,
            caminhoes: funcionario.caminhoes?.id || '',
            escalas: funcionario.escalas?.id || '',
          }));
          setRows(funcionarios);
        })
        .catch((error) => console.error('Erro ao carregar dados dos funcionários:', error));

      axios
        .get('http://localhost:8080/api/caminhoes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          const caminhoesData = response.data.map((caminhao) => ({
            id: caminhao.id,
            modelo: caminhao.modelo,
            placa: caminhao.placa,
            capacidade: caminhao.capacidade,
            ativo: caminhao.ativo,
          }));
          setCaminhoes(caminhoesData);
        })
        .catch((error) => console.error('Erro ao carregar dados dos caminhões:', error));

      axios
        .get('http://localhost:8080/api/escalas', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          const escalasData = response.data.map((escalas) => ({
            id: escalas.id,
            caminhoes: escalas.caminhoes?.id || '',
            data: escalas.data,
            dataFim: escalas.dataFim,
            horario: escalas.horario,
            turno: escalas.turno,
          }));
          setEscalas(escalasData);
        })
        .catch((error) => console.error('Erro ao carregar dados das escalas:', error));
        axios
        .get('http://localhost:8080/api/entregas', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          const entregasData = response.data.map((entregas) => ({
            id: entregas.id,
            endereco: entregas.endereco,
            dataEntrega: entregas.dataEntrega,
            descricao: entregas.descricao,
            status: entregas.status,
            caminhoes: entregas.caminhoes?.id || '',
          }));
          setEntregas(entregasData);
        })
        .catch((error) => console.error('Erro ao carregar dados das entregas:', error));
        axios
        .get('http://localhost:8080/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data.map((user) => ({
            id: user.id,
            login: user.login,
            password: user.password,
            role: user.role,
            funcionario: user.funcionario?.id || '',
          }));
          setUsers(userData);
        })
        .catch((error) => console.error('Erro ao carregar dados dos usuários:', error));
    }
  }, [user, token]);

  const handleRowEditStop = (params, event) => {
    if (params.row.isNew) {
      const dataToSend = { ...params.row };
      delete dataToSend.id; 

      axios
        .post('http://localhost:8080/api/caminhoes/cadastrar', dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setCaminhoes((prevRows) => {
            return prevRows.filter((row) => !row.isNew).concat({ ...response.data, isNew: false });
          });
          
          setCaminhoesRowModesModel((prev) => ({
            ...prev,
            [response.data.id]: { mode: GridRowModes.View },
          }));
        })
        .catch((error) => {
          console.error('Erro ao salvar caminhão:', error);
        });
    } else {
      setCaminhoes((prevRows) =>
        prevRows.map((row) =>
          row.id === params.row.id ? { ...params.row, isNew: false } : row
        )
      );
    }

    setCaminhoesRowModesModel((prev) => ({
      ...prev,
      [params.row.id]: { mode: GridRowModes.View },
    }));
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleRowModesModelChange = (newModel) => {
    setRowModesModel(newModel);
  };

  const handleEditCaminhaoClick = (id) => () => {
    setCaminhoesRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleEditEscalasClick = (id) => () => {
    setEscalasRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };
  
  const handleEditEntregasClick = (id) => () => {
    setEntregasRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleEditUsersClick = (id) => () => {
    setUsersRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit }
    }));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleSaveCaminhaoClick = (id) => () => {
    setCaminhoesRowModesModel({
      ...caminhoesRowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  };

  const handleSaveEscalaClick = (id) => () => {
    setEscalasRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const handleSaveEntregasClick = (id) => () => {
    setEntregasRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const handleSaveUsersClick = (id) => () => {
    setUsersRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View }
    }));
  };

  const handleDeleteClick = (id) => () => {
    axios
      .delete(`http://localhost:8080/api/funcionarios/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => console.error('Erro ao excluir funcionário:', error));
  };

  const handleDeleteCaminhaoClick = (id) => () => {
    axios
      .delete(`http://localhost:8080/api/caminhoes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(() => {
        setCaminhoes(caminhoes.filter((caminhao) => caminhao.id !== id));
      })
      .catch((error) => console.error('Erro ao excluir caminhão:', error));
  };

  const handleDeleteEscalaClick = (id) => () => {
    axios.delete(`http://localhost:8080/api/escalas/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(() => {
      setEscalas((prevRows) => prevRows.filter((row) => row.id !== id));
    })
    .catch((error) => console.error('Erro ao excluir escala:', error));
  };

  const handleDeleteEntregasClick = (id) => () => {
    axios.delete(`http://localhost:8080/api/entregas/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(() => {
      setEscalas((prevRows) => prevRows.filter((row) => row.id !== id));
    })
    .catch((error) => console.error('Erro ao excluir escala:', error));
  };

  const handleDeleteUsersClick = (id) => () => {
    axios.delete(`http://localhost:8080/api/users/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(() => {
      axios.get('http://localhost:8080/api/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((response) => {
        const updatedUsers = response.data.map((user) => ({
          id: user.id,
          login: user.login,
          password: user.password,
          role: user.role,
          funcionario: user.funcionario?.id || '',
        }));
        setUsers(updatedUsers); 
      })
      .catch((error) => {
        console.error('Erro ao recarregar os usuários:', error);
      });
    })
    .catch((error) => {
      console.error('Erro ao excluir usuário:', error);
    });
  };
  
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleCancelCaminhaoClick = (id) => () => {
    setCaminhoesRowModesModel({
      ...caminhoesRowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  
    const editedRow = caminhoes.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setCaminhoes(caminhoes.filter((row) => row.id !== id));
    }
  };

  const handleCancelEscalaClick = (id) => () => {
    setEscalasRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
  
    const editedRow = escalas.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setEscalas(escalas.filter((row) => row.id !== id));
    }
  };

  const handleCancelEntregasClick = (id) => () => {
    setEntregasRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
  
    const editedRow = escalas.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setEscalas(escalas.filter((row) => row.id !== id));
    }
  };

  const handleCancelUsersClick = (id) => () => {
    setUsersRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    }));
  
    const editedRow = users.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setUsers(users.filter((row) => row.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setEntregas((prevEntregas) =>
      prevEntregas.map((entrega) =>
        entrega.id === id ? { ...entrega, status: newStatus } : entrega
      )
    );
  };

  const handleRoleChange = (id, value) => {
    setUsers((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, role: value } : row
      )
    );
  };
  
  
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
  
    if (newRow.caminhoes) {
      newRow.caminhoes = newRow.caminhoes.id || newRow.caminhoes; 
    }
  
    if (newRow.escalas) {
      newRow.escalas = newRow.escalas.id || newRow.escalas;
    }
  
    const dataToSend = { ...newRow };
    delete dataToSend.id; 
  
    if (newRow.isNew) {
      axios
        .post('http://localhost:8080/api/funcionarios/cadastrar', dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setRows((prevRows) =>
            prevRows
              .filter((row) => row.id !== newRow.id)
              .concat({ ...response.data, isNew: false })
          );

          axios
            .get('http://localhost:8080/api/funcionarios', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
            .then((response) => {
              const funcionarios = response.data.map((funcionario) => ({
                id: funcionario.id,
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                endereco: funcionario.endereco,
                telefone: funcionario.telefone,
                cargo: funcionario.cargo,
                email: funcionario.email,
                ativo: funcionario.ativo,
                caminhoes: funcionario.caminhoes?.id || '',
                escalas: funcionario.escalas?.id || '',
              }));
              setRows(funcionarios);
            })
            .catch((error) => console.error('Erro ao recarregar os dados dos funcionários:', error));
  
        })
        .catch((error) => {
          console.error('Erro ao salvar funcionário:', error);
        });
    } else {
      axios
        .put(`http://localhost:8080/api/funcionarios/${newRow.id}`, dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === newRow.id ? { ...newRow, isNew: false } : row
            )
          );
  
          axios
            .get('http://localhost:8080/api/funcionarios', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
            .then((response) => {
              const funcionarios = response.data.map((funcionario) => ({
                id: funcionario.id,
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                endereco: funcionario.endereco,
                telefone: funcionario.telefone,
                cargo: funcionario.cargo,
                email: funcionario.email,
                ativo: funcionario.ativo,
                caminhoes: funcionario.caminhoes?.id || '',
                escalas: funcionario.escalas?.id || '',
              }));
              setRows(funcionarios);
            })
            .catch((error) => console.error('Erro ao recarregar os dados dos funcionários:', error));
        })
        .catch((error) => {
          console.error('Erro ao atualizar funcionário:', error);
        });
    }
  
    return updatedRow;
  };
  
  const processCaminhoesRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false }; 
    const dataToSend = { ...newRow };
    delete dataToSend.id;
  
    if (newRow.isNew) {
      axios
        .post('http://localhost:8080/api/caminhoes/cadastrar', dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setCaminhoes((prevRows) =>
            prevRows
              .filter((row) => row.isNew !== true)
              .concat({ ...response.data, isNew: false })
          );
        })
        .catch((error) => {
          console.error('Erro ao salvar caminhão:', error);
        });
    } else {
      axios
        .put(`http://localhost:8080/api/caminhoes/${newRow.id}`, dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          setCaminhoes((prevRows) =>
            prevRows.map((row) =>
              row.id === newRow.id ? { ...newRow, isNew: false } : row
            )
          );
        })
        .catch((error) => {
          console.error('Erro ao atualizar caminhão:', error);
        });
    }
  
    return updatedRow;
  };

  const processEscalasRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
  
    if (newRow.caminhoes) {
      newRow.caminhoes = newRow.caminhoes.id || newRow.caminhoes;
    }
  
    if (newRow.escalas) {
      newRow.escalas = newRow.escalas.id || newRow.escalas; 
    }
  
    const dataToSend = { ...newRow };
    delete dataToSend.id; 
  
    if (newRow.isNew) {
      axios
        .post('http://localhost:8080/api/escalas/cadastrar', dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setEscalas((prevRows) =>
            prevRows
              .filter((row) => row.id !== newRow.id) 
              .concat({ ...response.data, isNew: false }) 
          );
  
          axios
            .get('http://localhost:8080/api/escalas', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
            .then((reloadResponse) => {
              const escalasData = reloadResponse.data.map((escalas) => ({
                id: escalas.id,
                caminhoes: escalas.caminhoes?.id || '',
                data: escalas.data,
                dataFim: escalas.dataFim,
                horario: escalas.horario,
                turno: escalas.turno,
              }));
              setEscalas(escalasData); 
            })
            .catch((reloadError) => {
              console.error('Erro ao recarregar os dados das escalas:', reloadError);
            });
  
        })
        .catch((error) => {
          console.error('Erro ao salvar escala:', error);
        });
    } else {
      axios
        .put(`http://localhost:8080/api/escalas/${newRow.id}`, dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          setEscalas((prevRows) =>
            prevRows.map((row) =>
              row.id === newRow.id ? { ...newRow, isNew: false } : row
            )
          );
  
          axios
            .get('http://localhost:8080/api/escalas', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
            .then((reloadResponse) => {
              const escalasData = reloadResponse.data.map((escalas) => ({
                id: escalas.id,
                caminhoes: escalas.caminhoes?.id || '',
                data: escalas.data,
                dataFim: escalas.dataFim,
                horario: escalas.horario,
                turno: escalas.turno,
              }));
              setEscalas(escalasData); 
            })
            .catch((reloadError) => {
              console.error('Erro ao recarregar os dados das escalas:', reloadError);
            });
        })
        .catch((error) => {
          console.error('Erro ao atualizar escala:', error);
        });
    }
  
    return updatedRow;
  };
  
  const processEntregasRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
  
    if (newRow.caminhoes) {
      updatedRow.caminhoes = newRow.caminhoes.id || newRow.caminhoes;
    }
  
    if (newRow.escalas) {
      updatedRow.escalas = newRow.escalas.id || newRow.escalas;
    }
  
    if (newRow.entregas) {
      updatedRow.entregas = newRow.entregas.id || newRow.entregas;
    }
  
    const dataToSend = { ...updatedRow };
    delete dataToSend.id;
  
    try {
      if (newRow.isNew) {
        const response = await axios.post(
          'http://localhost:8080/api/entregas/cadastrar',
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setEntregas((prevRows) =>
          prevRows
            .filter((row) => row.id !== newRow.id)
            .concat({ ...response.data, isNew: false })
        );
      } else {
        await axios.put(
          `http://localhost:8080/api/entregas/${newRow.id}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setEntregas((prevRows) =>
          prevRows.map((row) =>
            row.id === newRow.id ? { ...newRow, isNew: false } : row
          )
        );
      }
  
      const reloadResponse = await axios.get('http://localhost:8080/api/entregas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const entregasData = reloadResponse.data.map((entrega) => ({
        id: entrega.id,
        caminhoes: entrega.caminhoes?.id || '',
        status: entrega.status,
        dataEntrega: entrega.dataEntrega,
        endereco: entrega.endereco,
        descricao: entrega.descricao,
      }));
      setEntregas(entregasData);
  
    } catch (error) {
      console.error('Erro ao salvar/atualizar entregas:', error);
    }
  
    return updatedRow;
  };
  
  const processUsersRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
  
    if (newRow.funcionario) {
      updatedRow.funcionario = Number(newRow.funcionario.id) || newRow.funcionario;
    }
  
    const dataToSend = { ...updatedRow };
  
    try {
      let response;
      if (newRow.isNew) {
        delete dataToSend.id;
  
        response = await axios.post(
          'http://localhost:8080/api/users',
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setUsers((prevRows) =>
          prevRows.filter((row) => row.id !== newRow.id).concat({ ...response.data, isNew: false })
        );
      } else {
        response = await axios.put(
          `http://localhost:8080/api/users/${newRow.id}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setUsers((prevRows) =>
          prevRows.map((row) => (row.id === newRow.id ? { ...newRow, isNew: false } : row))
        );
      }

      const reloadResponse = await axios.get('http://localhost:8080/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const userData = reloadResponse.data.map((user) => ({
        id: user.id,
        login: user.login,
        password: user.password,
        role: user.role,
        funcionario: user.funcionario?.id || '',
      }));
      setUsers(userData);
  
    } catch (error) {
      console.error('Erro ao salvar/atualizar usuários:', error);
    }
  
    return updatedRow;
  };
  
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nome', flex: 1, headerName: 'Nome', width: 180, editable: true },
    { field: 'cpf', headerName: 'CPF', width: 180, editable: true },
    { field: 'endereco', flex: 1, headerName: 'Endereço', width: 200, editable: true },
    { field: 'telefone', headerName: 'Telefone', width: 180, editable: true },
    { field: 'cargo', headerName: 'Cargo', width: 180, editable: true },
    { field: 'email', headerName: 'E-mail', width: 200, editable: true },
    { field: 'caminhoes', headerName: 'Caminhões', width: 150, editable: true },
    { field: 'escalas', headerName: 'Escalas', width: 150, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(id)} />,
        ];
      },
    },
  ];

  const caminhaoColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'modelo', headerName: 'Modelo', flex: 1, width: 180, editable: true },
    { field: 'placa', headerName: 'Placa', flex: 1, width: 180, editable: true },
    { field: 'capacidade', headerName: 'capacidade', flex: 1, width: 100, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = caminhoesRowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveCaminhaoClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelCaminhaoClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditCaminhaoClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteCaminhaoClick(id)} />,
        ];
      },
    },
  ];

  const escalaColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { 
      field: 'data',
      headerName: 'data',
      width: 180,
      flex: 1,
      editable: true },
    {
      field: 'dataFim',
      headerName: 'Data Fim',
      width: 150,
      flex: 1,
      editable: true,
    },
    { field: 'horario', headerName: 'horario', flex: 1, width: 150, editable: true },
    { field: 'caminhoes', headerName: 'caminhoes', flex: 1, width: 100, editable: true },
    { field: 'turno', headerName: 'turno', flex: 1, width: 100, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = escalasRowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveEscalaClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelEscalaClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditEscalasClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteEscalaClick(id)} />,
        ];
      },
    },
  ];

  const entregasColumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'descricao', headerName: 'Descrição', flex: 1, width: 250, editable: true },
    { 
      field: 'dataEntrega', 
      headerName: 'Data de Entrega', 
      width: 180, 
      editable: true 
    },
    { field: 'endereco', headerName: 'Endereco', flex: 1, width: 150, editable: true },
    { field: 'caminhoes', headerName: 'Caminhão', width: 150, editable: true },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <FormControl fullWidth variant="outlined" sx={{ height: 40 }}>
          <Select
            labelId={`status-label-${params.row.id}`}
            value={params.row.status || ''}
            onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
            label="Status"
            sx={{ display: 'flex', alignItems: 'center', height: 40, marginTop: 0.7 }}
          >
            <MenuItem value="Pendente">Pendente</MenuItem>
            <MenuItem value="Entregue">Entregue</MenuItem>
            <MenuItem value="Cancelada">Cancelada</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = entregasRowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveEntregasClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelEntregasClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditEntregasClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteEntregasClick(id)} />,
        ];
      },
    },
  ];

  const usersColumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'login', headerName: 'Login', flex: 1, width: 250, editable: true },
    { field: 'password', headerName: 'Senha', flex: 1, width: 250, editable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
      renderCell: (params) => (
        <FormControl fullWidth variant="outlined" sx={{ height: 40 }}>
          <Select
            labelId={`role-label-${params.row.id}`}
            value={params.row.role || ''}
            onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
            label="Role"
            sx={{ display: 'flex', alignItems: 'center', height: 40, marginTop: 0.7 }}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    { field: 'funcionario', headerName: 'Funcionario', width: 150, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = usersRowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveUsersClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelUsersClick(id)} />,
          ];
        }
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditUsersClick(id)} />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteUsersClick(id)} />,
        ];
      },
    },
  ];
  

  return (
    <Box sx={{ marginBottom: 3, marginLeft: 'auto', marginRight: 'auto', paddingLeft: '50px', paddingRight: '50px', maxWidth: 'calc(100% - 100px)' }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Dados da Empresa
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
            Funcionário
        </Typography>
        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => {
              console.error('Erro ao processar atualização:', error);
            }}
            slots={{ toolbar: EditToolbar }}
            slotProps={{ toolbar: { setRows, setRowModesModel } }}
          />
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>Usuários</Typography>
        <DataGrid
          rows={users}
          columns={usersColumns}
          editMode="row"
          rowModesModel={usersRowModesModel}
          processRowUpdate={processUsersRowUpdate}
          onRowModesModelChange={setUsersRowModesModel}
          slots={{ toolbar: UsersEditToolbar }}
          slotProps={{ toolbar: { setUsers, setUsersRowModesModel } }}
        />
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Caminhões
          </Typography>
          <DataGrid
            rows={caminhoes}
            columns={caminhaoColumns}
            editMode="row"
            rowModesModel={caminhoesRowModesModel}
            onRowModesModelChange={setCaminhoesRowModesModel}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processCaminhoesRowUpdate}
            onProcessRowUpdateError={(error) => {
              console.error('Erro ao processar atualização:', error);
            }}
            slots={{ toolbar: CaminhaoEditToolbar }} 
            slotProps={{ toolbar: { setCaminhoes, setCaminhoesRowModesModel } }}
          />
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>Escalas</Typography>
        <DataGrid
            rows={escalas}
            columns={escalaColumns}
            editMode="row"
            rowModesModel={escalasRowModesModel}
            processRowUpdate={processEscalasRowUpdate}
            onRowModesModelChange={setEscalasRowModesModel}
            slots={{ toolbar: EscalaEditToolbar }}
            slotProps={{ toolbar: { setEscalas, setEscalasRowModesModel } }}
          />
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h5" gutterBottom>Entregas</Typography>
        <DataGrid
            rows={entregas}
            columns={entregasColumns} 
            editMode="row"
            rowModesModel={entregasRowModesModel}
            processRowUpdate={processEntregasRowUpdate}
            onRowModesModelChange={setEntregasRowModesModel}
            slots={{ toolbar: EntregasEditToolbar }}
            slotProps={{ toolbar: { setEntregas, setEntregasRowModesModel } }}
          />
      </Box>
    </Box>
  );
};

export default AdminDashboard;