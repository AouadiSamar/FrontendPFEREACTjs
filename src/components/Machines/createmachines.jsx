import React, { useState } from 'react';
import axios from '../Axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Grid, Typography
} from '@mui/material';
import './Machines.css';
import MachineImage from './li.png'; // Assurez-vous que le chemin est correct

const MachineCreate = () => {
  const [machine, setMachine] = useState({
    nom_machine: '',
    nom_marchand: '',
    date_installation: '',
    date_intervention: '',
    date_mise_en_marche: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachine(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/machines/create/', machine);
      navigate('/Hom'); 
    } catch (error) {
      console.error('Erreur lors de la création de la machine:', error);
    }
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img className="e" src={MachineImage} alt="Machine Image" />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" className="h4" gutterBottom>Create Machine</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nom Machine"
                  name="nom_machine"
                  value={machine.nom_machine}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nom Marchand"
                  name="nom_marchand"
                  value={machine.nom_marchand}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date Installation"
                  name="date_installation"
                  type="date"
                  value={machine.date_installation}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date Intervention"
                  name="date_intervention"
                  type="date"
                  value={machine.date_intervention}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date Mise en Marche"
                  name="date_mise_en_marche"
                  type="date"
                  value={machine.date_mise_en_marche}
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

export default MachineCreate;
