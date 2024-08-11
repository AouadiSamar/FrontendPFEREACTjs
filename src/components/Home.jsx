import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, TextField, InputAdornment, Container, Paper, Typography, Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios'; // Assuming this is your Axios instance configuration
import './Home.css'; // Ensure this path is correct

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await AxiosInstance.get('/api/v1/users/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="home-container">
      <div className="header-container">
        <Typography variant="h4" gutterBottom>Admins</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            className="search-field"
            variant="outlined"
            placeholder="Search by name..."
            value={filter}
            onChange={handleFilterChange}
            
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} />
                </InputAdornment>
              ),
            }}
            style={{ padding: '5px' }} // Added style to remove the rectangle
          />
          <Button
            variant="contained"
            className="add-user-button"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => navigate('/createuser')}
          >
            Add User
          </Button>
        </Box>
      </div>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Paper>
          <Grid container spacing={2}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Box
                  className="userinfo"
                  onClick={() => navigate(`/user-det/${user.id}`)}
                  style={{ cursor: 'pointer', padding: '10px', borderRadius: '8px', transition: 'all 0.3s ease' }}
                >
                  <Avatar src={user.profile_image } alt={`${user.first_name} ${user.last_name}`} />
                  <Typography variant="body1" className='user-name' style={{ marginLeft: '10px' }}>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default Home;
