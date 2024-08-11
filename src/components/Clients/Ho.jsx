import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, IconButton, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Pour activer
import CancelIcon from '@mui/icons-material/Cancel'; // Pour désactiver
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Ho.css'; // Assurez-vous que le chemin est correct

const Ho = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/clients/');
        setClients(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/clients/${id}/edit`;
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      const response = await AxiosInstance.patch(`/api/v1/clients/${id}/toggle_active/`, {
        is_active: !isActive,
      });
      if (response.status === 200) {
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === id ? { ...client, is_active: !isActive } : client
          )
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="ho-container">
      <div className="header-container">
        <TextField
          className="search-field"
          variant="outlined"
          placeholder="Search clients..."
          value={filter}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          component={Link}
          to="/clients/create"
          variant="contained"
          color="primary"
          className="mui-button-root"
        >
          + Create Client
        </Button>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount Total</TableCell>
              <TableCell>Amount Remaining</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Reminder Date</TableCell>
              <TableCell>Time Until Reminder</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => {
              const reminderDate = client.reminder_date ? new Date(client.reminder_date) : null;
              const timeUntilReminder = reminderDate ? Math.max((reminderDate - new Date()) / 60000, 0) : 'N/A';

              return (
                <TableRow key={client.id}>
                  <TableCell>
                    <Link to={`/clients/${client.id}`} className="client-link">{client.name}</Link>
                  </TableCell>
                  <TableCell>{client.amount_total}</TableCell>
                  <TableCell>{client.amount_remaining}</TableCell>
                  <TableCell>{client.status}</TableCell>
                  <TableCell>{client.is_active ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{client.reminder_date ? new Date(client.reminder_date).toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{typeof timeUntilReminder === 'number' ? `${Math.ceil(timeUntilReminder)} minutes` : 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(client.id)}
                      aria-label="edit"
                      className="icon-button edit-icon"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleToggleActive(client.id, client.is_active)}
                      aria-label={client.is_active ? 'Deactivate' : 'Activate'}
                      className={`icon-button ${client.is_active ? 'deactivate-icon' : 'activate-icon'}`}
                    >
                      {client.is_active ? <CancelIcon /> : <CheckCircleIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Ho;
