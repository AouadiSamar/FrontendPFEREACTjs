import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Grid, MenuItem, Select, InputLabel, FormControl, Typography
} from '@mui/material';
import './Clients.css';
import ClientImage from './85.png'; // Assurez-vous que le chemin est correct

const ClientEdit = () => {
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`/api/v1/clients/${id}/`);
        setClient(response.data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    fetchClient();
  }, [id]);

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
      await axios.patch(`/api/v1/clients/${id}/update/`, client);
      navigate('/Ho');
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
        <img className="e"src={ClientImage} alt="Client Image"  />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className="h4" gutterBottom>Edit Client</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Existing fields */}
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
              {/* New fields */}
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
                  label="Durée Garantie (mois)"
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
                  Update
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

export default ClientEdit;
