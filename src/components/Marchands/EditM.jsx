import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, Container, Grid, Typography
} from '@mui/material';
import MarchandImage from './helo.png'; // Assurez-vous que le chemin est correct

const MarchandEdit = () => {
  const [marchand, setMarchand] = useState({
    nom_marchand: '',
    type_machine: '',
    quantite: '',
    emplacement: '',
    date_entretien: '',
    email: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarchand = async () => {
      try {
        const response = await axios.get(`/api/v1/marchands/${id}/`);
        setMarchand(response.data);
      } catch (error) {
        console.error('Error fetching marchand:', error);
      }
    };

    fetchMarchand();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarchand(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/v1/marchands/${id}/update/`, marchand);
      navigate('/HomeMarchands'); // Redirige vers la liste des marchands après mise à jour
    } catch (error) {
      console.error('Error updating marchand:', error);
    }
  };
  
  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img src={MarchandImage} className="f" alt="Marchand Image" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className='h4' gutterBottom>Edit Merchand</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nom Marchand"
                  name="nom_marchand"
                  value={marchand.nom_marchand}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Type Machine"
                  name="type_machine"
                  value={marchand.type_machine}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Quantité"
                  name="quantite"
                  type="number"
                  value={marchand.quantite}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Emplacement"
                  name="emplacement"
                  value={marchand.emplacement}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Entretien"
                  name="date_entretien"
                  type="date"
                  value={marchand.date_entretien}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={marchand.email}
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

export default MarchandEdit;
