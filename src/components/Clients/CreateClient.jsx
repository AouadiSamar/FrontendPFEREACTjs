import React, { useState } from 'react';
import axios from '../Axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Grid, MenuItem, Select, InputLabel, FormControl, Typography
} from '@mui/material';
import './Clients.css';
import ClientImage from './85.png'; // Assurez-vous que le chemin est correct

const ClientCreate = () => {
  const [client, setClient] = useState({
    name: '',
    amount_total: '',
    amount_given: '',
    amount_remaining: '',
    status: '',
    email: '',
    address: '',
    phone: '',
    is_active: true,
    reminder_date: '',
    num_dossier: '',
    date_signature_pv: '',
    duree_garantie: '',
    date_signature_definitif: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value,
      amount_remaining: name === 'amount_given' || name === 'amount_total'
        ? (prevState.amount_total - prevState.amount_given).toFixed(2)
        : prevState.amount_remaining
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert reminder_date to UTC before sending to the backend
      const clientData = {
        ...client,
        reminder_date: client.reminder_date ? new Date(client.reminder_date).toISOString() : null
      };
      await axios.post('/api/v1/clients/create/', clientData);
      navigate('/Ho');
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img className="e"src={ClientImage} alt="Client Image"  />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className="h4" gutterBottom>Create Client</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={client.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount Total"
                  name="amount_total"
                  type="number"
                  value={client.amount_total}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount Given"
                  name="amount_given"
                  type="number"
                  value={client.amount_given}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount Remaining"
                  name="amount_remaining"
                  type="number"
                  value={client.amount_remaining}
                  fullWidth
                  disabled
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={client.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={client.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={client.address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={client.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reminder Date"
                  name="reminder_date"
                  type="datetime-local"
                  value={client.reminder_date}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Num Dossier"
                  name="num_dossier"
                  value={client.num_dossier}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Signature PV"
                  name="date_signature_pv"
                  type="date"
                  value={client.date_signature_pv}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Durée Garantie"
                  name="duree_garantie"
                  type="number"
                  value={client.duree_garantie}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Signature Définitif"
                  name="date_signature_definitif"
                  type="date"
                  value={client.date_signature_definitif}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientCreate;
