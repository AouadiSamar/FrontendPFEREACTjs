import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid, Checkbox, FormControlLabel, Avatar
} from '@mui/material';
import './CreateRole.css';
import UserImage from './002.png'; // Assurez-vous que le chemin est correct pour votre image d'utilisateur

const schema = yup.object().shape({
  name: yup.string().required('Role name is required'),
  description: yup.string().optional(),
  permissions: yup.array().min(1, 'Select at least one permission'),
});

function CreateRole() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/permissions/');
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };
    fetchPermissions();

    const fetchRoles = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/roles/');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const roleData = {
      name: data.name,
      description: data.description,
      permissions: permissions.filter(p => p.enabled).map(p => p.id),
    };
    try {
      await AxiosInstance.post('/api/v1/users/rolesc/', roleData);
      navigate('/home');
    } catch (error) {
      console.error('Error creating role:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <Avatar src={UserImage} alt="User Image" sx={{ width: '100%', height: '90%' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className='h4' gutterBottom>Add Role</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('name')}
                  label="Role Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('description')}
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description ? errors.description.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" error={!!errors.permissions}>
                  <InputLabel>Permissions</InputLabel>
                  <Select
                    {...register('permissions')}
                    multiple
                    label="Permissions"
                    defaultValue={[]}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {permissions.map((permission) => (
                      <MenuItem key={permission.id} value={permission.id}>
                        <Checkbox checked={permission.enabled || false} onChange={e => {
                          const updatedPermissions = [...permissions];
                          updatedPermissions.find(p => p.id === permission.id).enabled = e.target.checked;
                          setPermissions(updatedPermissions);
                        }} />
                        {permission.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.permissions ? errors.permissions.message : ''}</FormHelperText>
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

export default CreateRole;
