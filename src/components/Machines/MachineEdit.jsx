import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Grid,  Typography
} from '@mui/material';
import MachineImage from './li.png'; // Assurez-vous que le chemin est correct
import './Machines.css'
const MachineEdit = () => {
  const [machine, setMachine] = useState({
    nom_machine: '',
    nom_marchand: '',
    date_installation: '',
    date_intervention: '',
    date_mise_en_marche: '',
    num_dossier: '',
    date_signature_pv: '',
    duree_garantie: '',
    date_signature_definitif: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const response = await axios.get(`/api/v1/machines/${id}/`);
        setMachine(response.data);
      } catch (error) {
        console.error('Error fetching machine:', error);
      }
    };

    fetchMachine();
  }, [id]);

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
      await axios.patch(`/api/v1/machines/${id}/update/`, machine);
      navigate('/Hom'); // Redirige vers la liste des machines après mise à jour
    } catch (error) {
      console.error('Error updating machine:', error);
    }
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img src={MachineImage} className="f"alt="Machine Image" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4"className='h4' gutterBottom>Edit Machine</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nom Machine"
                  name="nom_machine"
                  value={machine.nom_machine}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nom Marchand"
                  name="nom_marchand"
                  value={machine.nom_marchand}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Intervention"
                  name="date_intervention"
                  type="date"
                  value={machine.date_intervention}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Mise en Marche"
                  name="date_mise_en_marche"
                  type="date"
                  value={machine.date_mise_en_marche}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Num Dossier"
                  name="num_dossier"
                  value={machine.num_dossier}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Signature PV"
                  name="date_signature_pv"
                  type="date"
                  value={machine.date_signature_pv}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Durée Garantie (mois)"
                  name="duree_garantie"
                  type="number"
                  value={machine.duree_garantie}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Signature Définitif"
                  name="date_signature_definitif"
                  type="date"
                  value={machine.date_signature_definitif}
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

export default MachineEdit;
