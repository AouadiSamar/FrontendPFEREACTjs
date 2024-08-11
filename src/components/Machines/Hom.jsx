import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Pour supprimer
import '../Home.css';
import './Hom.css'
const MachineHome = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/machines/');
        setMachines(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/machines/${id}/update`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/v1/machines/delete/${id}/`);
      if (response.status === 204) { // Assume 204 No Content for successful deletion
        setMachines((prevMachines) =>
          prevMachines.filter((machine) => machine.id_machine !== id)
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredMachines = machines.filter((machine) =>
    machine.nom_machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    machine.nom_marchand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="machine-home-container">
      <div className="header-container">
        <TextField
          label="Search Machines"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-field"
        />
        <Button
          component={Link}
          to="/machines/create"
          variant="contained"
          color="primary"
          className="add-machine-button"
        >
          + Create Machine
        </Button>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Machine Name</TableCell>
              <TableCell>Merchant Name</TableCell>
              <TableCell>Installation Date</TableCell>
              <TableCell>Intervention Date</TableCell>
              <TableCell>Launch Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMachines.map((machine) => (
              <TableRow key={machine.id_machine}>
                <TableCell>
                  <Link to={`/machines/${machine.id_machine}`} className="machine-link">{machine.nom_machine}</Link>
                </TableCell>
                <TableCell>{machine.nom_marchand}</TableCell>
                <TableCell>{machine.date_installation}</TableCell>
                <TableCell>{machine.date_intervention ? machine.date_intervention : 'N/A'}</TableCell>
                <TableCell>{machine.date_mise_en_marche}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(machine.id_machine)}
                    aria-label="edit"
                    className="icon-button edit-icon"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(machine.id_machine)}
                    aria-label="delete"
                    className="icon-button delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MachineHome;
