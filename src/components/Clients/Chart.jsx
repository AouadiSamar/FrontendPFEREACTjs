import React, { useEffect, useState } from 'react';
import AxiosInstance from './Axios';
import { useParams } from 'react-router-dom';
import {
  Container, Grid, Typography, CircularProgress, Alert, Box, Button, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import SampleImage from './002.png';
import CommentSection from './Chart'; // Importmponent

const ClientDel = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openComments, setOpenComments] = useState(false); // State for handling comments popup

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/clients/${id}/`);
        setClient(response.data);
      } catch (error) {
        setError('Error fetching client details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (loading) return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Loading client details...</Typography>
      </Box>
    </Container>
  );

  if (error) return (
    <Container maxWidth="md">
      <Alert severity="error">
        {error}
        <Box mt={2}>
          <Typography variant="body2" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
            Retry
          </Typography>
        </Box>
      </Alert>
    </Container>
  );

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img src={SampleImage} alt="Sample" className="sample-image" />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Client Details
          </Typography>
          {client && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* Display client details */}
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body1"><strong>Name:</strong> {client.name}</Typography>
                  </Box>
                  {/* Other client details... */}
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenComments(true)} // Open comments popup
                >
                  View Comments
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>

      <Dialog open={openComments} onClose={() => setOpenComments(false)} fullWidth maxWidth="sm">
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <CommentSection clientId={id} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ClientDel;
