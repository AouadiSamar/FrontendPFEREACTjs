import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Grid, Avatar, Checkbox, FormControlLabel
} from '@mui/material';
import './Edit.css';
import UserImage from './det.png'; // Ensure the path is correct

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  roles: yup.array().min(1, 'Select at least one role'),
  isActive: yup.bool().required('Active status is required'),
});

function EditUser() {
  const { id: userId } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const rolesResponse = await AxiosInstance.get('/api/v1/users/roles/');
        setRoles(rolesResponse.data);

        const userResponse = await AxiosInstance.get(`/api/v1/users/${userId}/`);
        const userData = userResponse.data;

        if (userData) {
          setValue('firstName', userData.first_name);
          setValue('lastName', userData.last_name);
          setValue('email', userData.email);
          setValue('phoneNumber', userData.phone_number);
          setValue('roles', userData.roles.map(role => role.id));
          setValue('isActive', userData.is_active);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      phone_number: data.phoneNumber,
      first_name: data.firstName,
      last_name: data.lastName,
      departement:data.departement,
      roles: data.roles.map(role => parseInt(role)),
      is_active: data.isActive,
    };

    try {
      await AxiosInstance.put(`/api/v1/users/update/${userId}/`, payload);
      navigate('/home');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <Avatar src={UserImage} alt="User Image" sx={{ width: '100%', height: '90%' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className='h4' gutterBottom>Edit User</Typography>
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
                  helperText={errors.departement ? errors.departement.message : ''}
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox {...register('isActive')} />}
                  label="Active Status"
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
}

export default EditUser;
