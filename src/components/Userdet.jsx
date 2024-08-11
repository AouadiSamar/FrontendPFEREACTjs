import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Container, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AxiosInstance from './Axios';
import './Userdet.css';
import EditIcon from '@mui/icons-material/Edit';
import User from './det.png';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const UseDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await AxiosInstance.get(`/api/v1/users/${userId}/`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    const handleStatusToggle = async () => {
        try {
            const response = await AxiosInstance.patch(`/api/v1/users/${userId}/toggle-active/`);
            setUser({ ...user, is_active: response.data.is_active });
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container className="user-details-container">
            <Box p={3} className="user-details-content">
                <Box className="user-details-info">
                    <Box className="user-details-header">
                        <Typography variant="h4" className="user-details-title">{`${user.first_name} ${user.last_name}`}</Typography>
                    </Box>
                    <Box className="user-details-data" display="flex" justifyContent="space-between">
                        <Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <EmailIcon />
                                <Typography variant="body1" className="label"><strong>Email:</strong></Typography>
                                <Typography variant="body1" className="info">{user.email}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <EmailIcon />
                                <Typography variant="body1" className="label"><strong>departement:</strong></Typography>
                                <Typography variant="body1" className="info">{user.departement}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <PhoneIcon />
                                <Typography variant="body1" className="label"><strong>Phone Number:</strong></Typography>
                                <Typography variant="body1" className="info">{user.phone_number || 'N/A'}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <SupervisorAccountIcon />
                                <Typography variant="body1" className="label"><strong>Roles:</strong></Typography>
                                <Typography variant="body1" className="info">
                                    {user.roles && user.roles.length > 0
                                        ? user.roles.map(role => role.name).join(', ')
                                        : 'N/A'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <HomeIcon />
                                <Typography variant="body1" className="label"><strong>Address:</strong></Typography>
                                <Typography variant="body1" className="info">{user.address || 'N/A'}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <InfoIcon />
                                <Typography variant="body1" className="label"><strong>Status:</strong></Typography>
                                <Typography variant="body1" className="info">{user.is_active ? 'Active' : 'Inactive'}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={2} className="user-actions" display="flex" justifyContent="flex-start">
                        <IconButton component={Link} to={`/edit-user/${userId}`} className="edit-button">
                            <EditIcon style={{ color: '#3f51b5' }} />
                        </IconButton>
                        <ToggleButtonGroup
                            value={user.is_active ? 'active' : 'inactive'}
                            exclusive
                            onChange={handleStatusToggle}
                            aria-label="user status"
                            className="status-toggle"
                        >
                            <ToggleButton value="active" aria-label="active">
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </ToggleButton>
                            <ToggleButton value="inactive" aria-label="inactive">
                                <CancelIcon style={{ color: 'red' }} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <Box className="user-details-image">
                    <img src={User} alt="Design" className="design-image" />
                </Box>
            </Box>
        </Container>
    );
};

export default UseDetails;
