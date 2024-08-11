import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToApp from '@mui/icons-material/ExitToApp';
import AxiosInstance from './Axios';
import logo from './ola.png';
import BuildIcon from '@mui/icons-material/Build'; // Machines
import StoreIcon from '@mui/icons-material/Store'; // Merchants
import PeopleIcon from '@mui/icons-material/People'; // Clients

import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserFriends, FaAngleDown } from 'react-icons/fa';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AxiosInstance.get('/api/v1/users/profile/');
        setUserName(`${response.data.first_name} ${response.data.last_name}`);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fonction pour déterminer si le lien est actif
  const isActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <nav className="Header">
      <div className="c">
        <img src={logo} alt="Paymee Logo" className="logo" />
      </div>
      <div className="header-menu">
        <ul className="menu-items">
          <li>
            <Link to="/Chart">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            {/* Dropdown pour My account */}
            <div className="dropdown">
              <span className={`navigation-text ${isActive('/user') ? 'active' : ''}`}>
                <FaUserFriends /> My account <FaAngleDown />
              </span>
              <div className="dropdown-content">
                <Link to="/user">Account</Link>
                <Link to="/home">Admin Management</Link>
           
                <Link to="/create-role">Role Management</Link>
              </div>
            </div>
          </li>
          <div>
  <span className={`navigation-text ${isActive('/Ho') ? 'active' : ''}`}>

<li> <Link to="/Ho"> 
  <PeopleIcon /> Client Managements</Link></li>       
    </span>  </div>
<div>
  <span className={`navigation-text ${isActive('/Hom') ? 'active' : ''}`}>

              <li> <Link to="/Hom">   <BuildIcon /> Machine Managements</Link></li> 
              </span></div>
              <span className={`navigation-text ${isActive('/HomeMarchands') ? 'active' : ''}`}>

              <li><Link to="/HomeMarchands">  <StoreIcon />Merchand Managements</Link></li>  
              </span> <li>
            {/* Dropdown for Documents */}
            <div className="dropdown">
              <div className="dropdown-content">
               
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="right-corner">
        <span className="user-name">{userName}</span>
        <IconButton
          aria-label="Account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Déconnexion</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Header;
