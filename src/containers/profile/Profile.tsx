import { Avatar, IconButton, makeStyles, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { useAuthContext } from '../../shared/providers/auth-provider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    position: 'absolute',
    bottom: '20px',
    left: 'calc(50% - 70px)',
  },
}));

export const Profile = () => {
  const { loggedUser, handleSignout } = useAuthContext();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '18rem',
        top: '0',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '75%',
          overflow: 'hidden',
        }}
      >
        <img
          style={{
            filter: 'blur(10px)',
            width: '140%',
            height: '140%',
            margin: '-70px',
          }}
          src={loggedUser.imageUrl}
          alt='profile cover'
        />
        <IconButton
          aria-controls='profileMenu'
          aria-haspopup='true'
          onClick={handleClick}
          color='primary'
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
          }}
          aria-label='settings'
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='profileMenu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSignout}>Logout</MenuItem>
        </Menu>
      </div>
      <Avatar
        alt='User profile'
        src={loggedUser.imageUrl}
        className={classes.large}
      />
    </div>
  );
};

export default Profile;
