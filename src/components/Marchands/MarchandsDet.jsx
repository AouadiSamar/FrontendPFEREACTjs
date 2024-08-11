import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../Axios';
import {
  Container, Grid, Typography, CircularProgress, Alert, Box
} from '@mui/material';
import {
  Store as MerchantIcon,
  Description as TypeIcon,
  LocationOn as LocationIcon,
  DateRange as DateIcon,
  Info as QuantityIcon
} from '@mui/icons-material';
import MerchantImage from './helo.png'; // Update with your merchant image path
import './M.css';

const DetailsMarchands = () => {
  const { id } = useParams();
  const [marchand, setMarchand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarchandDetails = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/marchands/${id}/`);
        setMarchand(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des détails du marchand');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarchandDetails();
  }, [id]);

  if (loading) return (
    <Container className="marchand-detail-container" maxWidth="md">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Chargement des détails du marchand...</Typography>
      </Box>
    </Container>
  );

  if (error) return (
    <Container className="marchand-detail-container" maxWidth="md">
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
    <Container className="marchand-detail-container" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img className="merchant-image" src={MerchantImage} alt="Merchant" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box mt={4}> {/* Add margin top to create space */}
            <Typography className="h4" variant="h4" style={{ marginBottom: '20px' }}>
            Merchand Details            </Typography>
          </Box>
          {marchand ? (
            <Box>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <MerchantIcon style={{ marginRight: '8px', color: '#000' }} />
                <strong>Nom Marchand:</strong> {marchand.nom_marchand}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <TypeIcon style={{ marginRight: '8px', color: '#000' }} />
                <strong>Type Machine:</strong> {marchand.type_machine}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <QuantityIcon style={{ marginRight: '8px', color: '#000' }} />
                <strong>Quantité:</strong> {marchand.quantite}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <LocationIcon style={{ marginRight: '8px', color: '#000' }} />
                <strong>Emplacement:</strong> {marchand.emplacement}
              </Typography>
              <Typography variant="body1" gutterBottom display="flex" alignItems="center">
                <DateIcon style={{ marginRight: '8px', color: '#000' }} />
                <strong>Date Entretien:</strong> {marchand.date_entretien ? new Date(marchand.date_entretien).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">Marchand non trouvé.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsMarchands;
