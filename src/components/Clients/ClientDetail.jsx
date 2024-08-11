import React, { useEffect, useState } from 'react';
import AxiosInstance from '../Axios'; // Adjust the import path as needed
import { useParams } from 'react-router-dom';
import {
  Container, Grid, Typography, CircularProgress, Alert, Box, Button,
  IconButton, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

import CommentSection from './CommentSection';


import PhoneIcon from '@mui/icons-material/Phone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FolderIcon from '@mui/icons-material/Folder';
import TodayIcon from '@mui/icons-material/Today';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import './det.css'; // Ensure the path is correct
import SampleImage from './85.png'; // Import the image


const ClientDetail = () => {
  const { id } = useParams(); // Fetch client ID from the route parameters
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigningFile, setAssigningDocument] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [deletingDocument, setDeletingDocument] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to hold image URL

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/clients/${id}/`);
        setClient(response.data);
        const docsResponse = await AxiosInstance.get(`/api/v1/clients/${id}/documents/`);
        setDocuments(docsResponse.data);
      } catch (error) {
        setError('Error fetching client details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  const handleAssignFile = async () => {
    setAssigningDocument(true);
    try {
      await AxiosInstance.post(`/api/v1/clients/${id}/documents/assign/`, { clientId: id });
      alert('Document assigned successfully!');
    } catch (error) {
      alert('Error assigning document');
      console.error(error);
    } finally {
      setAssigningDocument(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await AxiosInstance.post(`/api/v1/clients/${id}/upload-file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
      const docsResponse = await AxiosInstance.get(`/api/v1/clients/${id}/documents/`);
      setDocuments(docsResponse.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploadingFile(false);
      setSelectedFile(null);
    }
  };

  const handleFileView = async (fileId) => {
    if (!fileId) {
      console.error('File ID is undefined');
      return;
    }

    try {
      const response = await AxiosInstance.get(`/api/v1/clients/${id}/files/${fileId}/`);
      const imageUrl = response.data.file; // URL from the response
      setImageUrl(imageUrl); // Save URL to state for displaying
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const handleFileDelete = async (fileId) => {
    setDeletingDocument(fileId);
    try {
      await AxiosInstance.delete(`/api/v1/clients/${id}/documents/${fileId}/`);
      alert('File deleted successfully!');
      setDocuments(documents.filter(doc => doc.id !== fileId));
    } catch (error) {
      alert('Error deleting file');
      console.error(error);
    } finally {
      setDeletingDocument(null);
    }
  };

  if (loading) return (
    <Container className="client-detail-container" maxWidth="md">
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" ml={2}>Loading client details...</Typography>
      </Box>
    </Container>
  );

  if (error) return (
    <Container className="client-detail-container" maxWidth="md">
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
    <Container className="client-detail-container" maxWidth="md">
      <Grid container spacing={2}>
      <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <img src={SampleImage} alt="Sample" className="sample-image" /> {/* Add the image here */}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className='h4' gutterBottom>
            Client Details
          </Typography>
          {client ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* Client details */}
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body1" color="textSecondary" mr={1}>
                      <strong>Name:</strong>
                    </Typography>
                    <Typography variant="body1">{client.name}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <EmailIcon color="action" />
                    <Typography variant="body1" ml={1}>{client.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <HomeIcon color="action" />
                    <Typography variant="body1" ml={1}>{client.address}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <PhoneIcon color="action" />
                    <Typography variant="body1" ml={1}>{client.phone}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <FolderIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Num Dossier:</strong> {client.num_dossier}
                    </Typography>
                  </Box>
                 
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Financial details */}
                  <Box display="flex" alignItems="center" mb={1}>
                    <MonetizationOnIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Amount Total:</strong> {client.amount_total}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <MonetizationOnIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Amount Given:</strong> {client.amount_given}
                    </Typography>
                  </Box>   
                 
                  <Box display="flex" alignItems="center" mb={1}>
                    <MonetizationOnIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Status:</strong> {client.status}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <TodayIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Reminder Date:</strong> {client.reminder_date ? new Date(client.reminder_date).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <TodayIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Date Signature PV:</strong> {client.date_signature_pv ? new Date(client.date_signature_pv).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <TodayIcon color="action" />
                    <Typography variant="body1" ml={1}>
                      <strong>Durée Garantie:</strong> {client.duree_garantie} mois
                    </Typography>
                  </Box>
               
                </Grid>
              </Grid>
              <Box mt={3}>
                <Typography className="h4"variant="h6" gutterBottom>Documents</Typography>
                <List>
                  {documents.map((document) => (
                    <ListItem key={document.id}>
                      <ListItemText primary={document.filename} />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end"
                          className='my-ic'

                          aria-label="view"
                          onClick={() => handleFileView(document.id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          edge="end"

                          aria-label="download"
                          href={document.file}
                          download={document.filename}
                        >
                        <DownloadIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          className='my-io'
                          aria-label="delete"
                          onClick={() => handleFileDelete(document.id)}
                          disabled={deletingDocument === document.id}
                        >
                        <DeleteIcon />
                        </IconButton>

                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Box mt={2}>
                  <input
                    accept="application/pdf,image/*"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="contained" component="span" startIcon={<UploadFileIcon />} disabled={uploadingFile}>
                      Select File
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFileUpload}
                    disabled={uploadingFile}
                    style={{ marginLeft: '10px' }}
                  >
                    {uploadingFile ? 'Uploading...' : 'Upload File'}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAssignFile}
                    disabled={assigningFile}
                    style={{ marginLeft: '10px' }}
                  >
                    {assigningFile ? 'Assigning...' : 'Assign File'}
                  </Button>
                </Box>
              </Box>
              <CommentSection clientId={id} />

              {imageUrl && (
                <Box mt={3} display="flex" justifyContent="center">
                  <img src={imageUrl} alt="Document" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="body1">Client not found.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientDetail;


