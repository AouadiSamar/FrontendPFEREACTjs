import React, { useState, useEffect } from 'react';
import AxiosInstance from '../components/Axios';
import './UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    role_names: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{profile.first_name} {profile.last_name}</h1>
        <p>{profile.role_names.join(', ')}</p>
      </div>
      <div className="profile-details-section">
        <div className="profile-card">
          <FontAwesomeIcon icon={faUser} className="icon"/>
          <div className="profile-card-content">
            <h3>First Name</h3>
            <p>{profile.first_name}</p>
          </div>
        </div>
        <div className="profile-card">
          <FontAwesomeIcon icon={faUser} className="icon"/>
          <div className="profile-card-content">
            <h3>Last Name</h3>
            <p>{profile.last_name}</p>
          </div>
        </div>
        <div className="profile-card">
          <FontAwesomeIcon icon={faEnvelope} className="icon"/>
          <div className="profile-card-content">
            <h3>Email</h3>
            <p>{profile.email}</p>
          </div>
        </div>
        
        <div className="profile-card">
          <FontAwesomeIcon icon={faPhone} className="icon"/>
          <div className="profile-card-content">
            <h3>Phone Number</h3>
            <p>{profile.phone_number}</p>
          </div>
        </div>
        <div className="profile-card">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/>
          <div className="profile-card-content">
            <h3>Address</h3>
            <p>{profile.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
