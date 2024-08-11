import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import {
  Container, Grid, Typography, CircularProgress, Alert, Box
} from '@mui/material';
import {
  Settings as MachineIcon,
  Store as MerchantIcon,
  Event as DateIcon,
  Build as InterventionIcon,
  PlayArrow as StartIcon
} from '@mui/icons-material';
import MachineImage from './li.png';
import './Machines.css';

const DetailsMachines = () => {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/machines/${id}/`);
        setMachine(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des détails de la machine');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMachineDetails();
  }, [id]);

  if (loading) return (
    <Container className="client-detail-container" maxWidth="md">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Chargement des détails de la machine...</Typography>
      </Box>
    </Container>
  );

  if (error) return (
    <Container className="machine-detail-container" maxWidth="md">
      <Alert severity="error">
        {error}
        <Box mt={2}>
          <Typography variant="body2" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
            Réessayer
          </Typography>
        </Box>
      </Alert>
    </Container>
  );

  return (
    <Container className="machine-detail-container" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img className="e" src={MachineImage} alt="Machine Image" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className="h4" variant="h4" style={{  marginBottom: '20px' }}>
            Détails de la Machine
          </Typography>
          {machine ? (
            <Box>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <MachineIcon style={{ marginRight: '8px', color: '#black' }} />
                <strong>Nom Machine:</strong> {machine.nom_machine}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <MerchantIcon style={{ marginRight: '8px', color: '#black' }} />
                <strong>Nom Marchand:</strong> {machine.nom_marchand}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <DateIcon style={{ marginRight: '8px', color: '#black' }} />
                <strong>Date Installation:</strong> {machine.date_installation ? new Date(machine.date_installation).toLocaleDateString() : 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <InterventionIcon style={{ marginRight: '8px', color: '#black' }} />
                <strong>Date Intervention:</strong> {machine.date_intervention ? new Date(machine.date_intervention).toLocaleDateString() : 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <StartIcon style={{ marginRight: '8px', color: 'black' }} />
                <strong>Date Mise en Marche:</strong> {machine.date_mise_en_marche ? new Date(machine.date_mise_en_marche).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">Machine non trouvée.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsMachines;
