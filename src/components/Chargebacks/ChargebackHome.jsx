import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, IconButton, TextField, InputAdornment, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../Axios';
import myEditIcon from '../eee.png';
import myDeactivateIcon from '../rt.png';
import myReactivateIcon from './icon7.png';
import './ChargebackHome.css';

const DocumentsHome = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/chargebacks/');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error retrieving documents:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleActiveStatus = async (document) => {
    const newStatus = !document.is_active;
    try {
      const response = await axios.patch(`http://localhost:8000/api/v1/chargebacks/${chargeback.id}/ac_des/`, {
        is_active: newStatus
      });
      if (response.status === 200) {
        const updatedDocuments = documents.map(cb => {
          if (cb.id === document.id) {
            return { ...cb, is_active: newStatus };
          }
          return cb;
        });
        setDocuments(updatedDocuments);
      } else {
        console.error('Failed to toggle active status:', response);
        alert('Failed to toggle active status. Please try again.');
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to toggle active status. Please try again.');
    }
  };
  const filteredDocuments = documents.filter(document =>
    document.authorization_number?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="ho-container">
      <div className="title-and-button-container">
        <h2 className="page-title">Documents</h2>
        <TextField
          variant="outlined"
          placeholder="Search by Auth Num"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginRight: 20 }}
        />
        <button className='addche' onClick={() => navigate('/chargebacks/create/')}>
          + Add document
        </button>
      </div>

      {loading ? (
        <p></p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Authorization Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((document) => (
              <tr key={document.id}>
                <td>
                  <Link to={`/chargebacks/${document.id}`}>{document.id}</Link>
                </td>
                <td>{document.authorization_number}</td>
                <td>{document.amount}</td>
                <td style={{ color: document.is_active ? 'black' : 'red' }}>
                  {document.status} {document.is_active ? '' : '(Deactivated)'}
                </td>
                <td>{new Date(document.creation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td>
                  <Box className="icon-container">
                    <IconButton component={Link} to={`/chargebacks/${document.id}/edit`} className="edit-button">
                      <img src={myEditIcon} alt="Edit" />
                    </IconButton>
                    {document.is_active ? (
                      <IconButton onClick={() => handleToggleActiveStatus(document)} className="deactivate-button">
                        <img src={myDeactivateIcon} alt="Deactivate" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleToggleActiveStatus(document)} className="reactivate-button">
                        <img src={myReactivateIcon} alt="Reactivate" />
                      </IconButton>
                    )}
                    
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
    </div>
  );
};

export default DocumentsHome;
