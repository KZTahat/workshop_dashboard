import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { socket } from '../../../../App'
import { useData } from '../../../../dataContext';
import {
  IconButton,
  Table,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { Howl } from 'howler';
import bells_notification from './bells_notification.mp3';
import new_user from './new_user.mp3'
import { TransDetailsModal } from '../../../../components'
import workshop_logo from './workshop_logo.jpg'

const newSound = {
  transaction: new Howl({
    src: [bells_notification]
  }),
  user: new Howl({
    src: [new_user]
  }),
}

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  link: {
    color: 'red'
  },
  tableRow: {
    borderRadius: '5px',
    backgroundColor: 'rgb(164, 179, 241)'
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, handleSignout, ...rest } = props;
  const data = useData();
  const classes = useStyles();
  const [notifications, setNotification] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [showModal, setShowModal] = useState(false);

  socket.on('new_transaction', (newTransaction) => {
    data.setTransactions([newTransaction, ...data.transactions]);
    newTransaction.seen = false;
    setNotification([newTransaction, ...notifications]);
    localStorage.setItem('notification', JSON.stringify([newTransaction, ...notifications]));
    newSound.transaction.play();
  })

  // socket.on('new_user', (payload) => {
  //   console.log(payload);
  //   newSound.new_user.play();
  // data.setUsers([payload, ...data.transactions]);
  // newTransaction.seen = false;
  // payload.seen = false;
  // setNotification([newTransaction, ...notifications]);
  // localStorage.setItem('notification', JSON.stringify([payload, ...notifications]));
  // newSound.play();
  // })

  useEffect(() => {
    const localStorageNotifications = JSON.parse(localStorage.getItem('notification'));
    if (localStorageNotifications) setNotification(localStorageNotifications);
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowModal = (transaction, id) => {
    localStorage.removeItem('notification');
    let newNotifications = [];
    notifications.forEach((transaction) => {
      if (transaction._id == id) transaction.seen = true;
      localStorage.setItem('notification', JSON.stringify([...newNotifications, transaction]));
      newNotifications.push(transaction);
    })
    setNotification(newNotifications);
    let foundPurchases = [];
    transaction.Purchases.forEach((id) => {
      axios.get(`${process.env.REACT_APP_PRODUCTS}/getproductbyid/${id}`)
        .then((response) => {
          foundPurchases.push(response.data.product);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setShowModal(true);
    data.setPurchases(foundPurchases);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <TransDetailsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        purchases={data.purchases}
      />
      <Toolbar>
        <RouterLink to="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            alt="Logo"
            src={workshop_logo}
            style={{ width: '40px', height: '40px' }}
          />
          <span style={{ color: "white", marginLeft: '1em' }}>My_Workshop</span>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Badge badgeContent={notifications.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 8.5,
                width: '55ch',
              },
            }}
          >
            {notifications.length ? notifications.map((transaction, index) => (
              <Table key={index}>
                <MenuItem key={transaction} selected={transaction === 'Pyxis'} >
                  <TableRow
                    style={{ backgroundColor: transaction.seen ? '' : 'rgb(164, 179, 241)', borderRadius: '5%' }}
                    onClick={() => handleShowModal(transaction, transaction._id)}
                  >
                    <TableCell>
                      <Typography>{transaction.buyerName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{transaction.transactionDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{transaction.buyerPhoneNumber}</Typography>
                    </TableCell>
                  </TableRow>
                </MenuItem>
              </Table>
            )) : <Typography mg='5%'>No notifications For Now</Typography>}
          </Menu>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <LogoutIcon
              onClick={handleSignout}
            />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar >
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
