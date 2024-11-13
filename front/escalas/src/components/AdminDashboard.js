import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Typography } from '@mui/material';
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
        Add Employee
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
        Add Schedule
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
        Add Truck
      </Button>
    </GridToolbarContainer>
  );
};

function EntregaEditToolbar({ setEntregas, setEntregasRowModesModel }) {
  const handleAddEntregaClick = () => {
    const newRow = {
      id: "",
      descricao: '',
      dataEntrega: '',
      status: '',
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
        Adicionar Entrega
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
  
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
  
    // Verificando e extraindo o ID do caminhão (caso o campo seja um objeto)
    if (newRow.caminhoes) {
      newRow.caminhoes = newRow.caminhoes.id || newRow.caminhoes;  // Extraindo apenas o id
    }
  
    // Verificando e extraindo o ID da escala (caso o campo seja um objeto)
    if (newRow.escalas) {
      newRow.escalas = newRow.escalas.id || newRow.escalas;  // Extraindo apenas o id
    }
  
    const dataToSend = { ...newRow };
    delete dataToSend.id;  // Remove o id temporário
  
    // Se a linha é nova, realiza o cadastro
    if (newRow.isNew) {
      axios
        .post('http://localhost:8080/api/funcionarios/cadastrar', dataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // Atualiza a tabela com a linha salva e remove a linha de adição
          setRows((prevRows) =>
            prevRows
              .filter((row) => row.id !== newRow.id) // Remove a linha de cadastro
              .concat({ ...response.data, isNew: false }) // Adiciona a linha com os dados retornados
          );
  
          // Recarregar os dados após salvar
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
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nome', headerName: 'Nome', width: 180, editable: true },
    { field: 'cpf', headerName: 'CPF', width: 180, editable: true },
    { field: 'endereco', headerName: 'Endereço', width: 200, editable: true },
    { field: 'telefone', headerName: 'Telefone', width: 180, editable: true },
    { field: 'cargo', headerName: 'Cargo', width: 180, editable: true },
    { field: 'email', headerName: 'E-mail', width: 200, editable: true },
    { field: 'ativo', headerName: 'Ativo', width: 100, editable: true },
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
    { field: 'modelo', headerName: 'Modelo', width: 180, editable: true },
    { field: 'placa', headerName: 'Placa', width: 180, editable: true },
    { field: 'capacidade', headerName: 'capacidade', width: 100, editable: true },
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
    { field: 'data', headerName: 'data', width: 180, editable: true },
    { field: 'dataFim', headerName: 'dataFim', width: 150, editable: true },
    { field: 'horario', headerName: 'horario', width: 150, editable: true },
    { field: 'caminhoes', headerName: 'caminhoes', width: 100, editable: true },
    { field: 'turno', headerName: 'turno', width: 100, editable: true },
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

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
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
            columns={escalaColumns} // Defina uma array `escalaColumns` com as colunas específicas das escalas
            editMode="row"
            rowModesModel={escalasRowModesModel}
            processRowUpdate={processEscalasRowUpdate}
            onRowModesModelChange={setEscalasRowModesModel}
            slots={{ toolbar: EscalaEditToolbar }}
            slotProps={{ toolbar: { setEscalas, setEscalasRowModesModel } }}
          />
      </Box>
    </Box>
  );
};

export default AdminDashboard;