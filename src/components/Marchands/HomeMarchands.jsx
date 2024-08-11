import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../Axios';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, CircularProgress, Alert, IconButton, TextField, InputAdornment 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Home.css';
import './M.css';

const MarchandHome = () => {
  const [marchands, setMarchands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMarchands = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/marchands/');
        setMarchands(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarchands();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/marchands/${id}/edit/`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/v1/marchands/delete/${id}/`);
      if (response.status === 204) { // 204 No Content for successful deletion
        setMarchands((prevMarchands) =>
          prevMarchands.filter((marchand) => marchand.id_marchand !== id)
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMarchands = marchands.filter(marchand =>
    marchand.nom_marchand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marchand.type_machine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="marchand-home-container">
      <div className="header-container">
        <TextField
          className="search-field"
          variant="outlined"
          placeholder="Search by name..."
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {/* Optional: Add a search icon here if needed */}
              </InputAdornment>
            ),
          }}
          style={{ padding: '5px', marginRight: '10px' }} // Consistent styling
        />
        <Button
          component={Link}
          to='/Create/'
          variant="contained"
          color="primary"
          className="add-user-button"
        >
          + Create Merchand
        </Button>
      </div>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom Marchand</TableCell>
              <TableCell>Type Machine</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Emplacement</TableCell>
              <TableCell>Date Entretien</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMarchands.map((marchand) => (
              <TableRow key={marchand.id_marchand}>
                <TableCell>
                  <Link to={`/marchands/${marchand.id_marchand}`} className="marchand-link">
                    {marchand.nom_marchand}
                  </Link>
                </TableCell>
                <TableCell>{marchand.type_machine}</TableCell>
                <TableCell>{marchand.quantite}</TableCell>
                <TableCell>{marchand.emplacement}</TableCell>
                <TableCell>{marchand.date_entretien}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(marchand.id_marchand)}
                    aria-label="edit"
                    className="icon-button edit-icon"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(marchand.id_marchand)}
                    aria-label="delete"
                    className="icon-button delete-icon"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MarchandHome;
