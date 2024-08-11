import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios'; // Assurez-vous que AxiosInstance est correctement configuré
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Grid, Avatar
} from '@mui/material';
import './Create.css';
import UserImage from './det.png'; // Assurez-vous que le chemin est correct

function AddUser() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/roles/');
        setRoles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error.response ? error.response.data : error.message);
      }
    };
    fetchRoles();
  }, []);

  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    roles: yup.array().min(1, 'Select at least one role'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const userData = {
      ...data,
      phone_number: data.phoneNumber,
      first_name: data.firstName,
      last_name: data.lastName,
      roles: data.roles.map(role => parseInt(role)),
    };

    try {
         await AxiosInstance.post('/api/v1/users/usersc/', userData);
      navigate('/home');
    } catch (error) {
      console.error('There was an error creating the user:', error.response ? error.response : error);
      alert('Erreur lors de la création de l’utilisateur. Vérifiez la console pour plus de détails.');
    }
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <Avatar src={UserImage} alt="User Image" sx={{ width: '100%', height: '90%' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className='h4'gutterBottom>Add User</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName')}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName')}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('departement')}
                  label="departement"
                  variant="outlined"
                  fullWidth
                  error={!!errors.departement}
                  helperText={errors.departement? errors.departement.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('phoneNumber')}
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" error={!!errors.roles}>
                  <InputLabel>Roles</InputLabel>
                  <Select
                    {...register('roles')}
                    multiple
                    label="Roles"
                    defaultValue={[]}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.roles ? errors.roles.message : ''}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">
                  Add
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
}

export default AddUser;
