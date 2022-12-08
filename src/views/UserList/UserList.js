import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { UsersToolbar, UsersTable, TransactionsModal } from './components';
import Swal from 'sweetalert2';
import { useData } from '../../dataContext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

let allUsers;
const UserList = () => {
  const classes = useStyles();
  const data = useData();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserTransactions, setSelectedUserTransactions] = useState([]);

  const handleShowModal = (customerId) => {
    axios.get(`${process.env.REACT_APP_TRANSACTIONS}/gettransactionsbybuyerid/${customerId}`)
      .then((response) => {
        setSelectedUserTransactions(response.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      })
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    allUsers = data.users;
  }, [])

  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${process.env.REACT_APP_USERS}/deleteuser/${userId}`)
            .then(() => {
              let newUsersList = [];
              data.users.forEach((user) => {
                if (user._id !== userId) newUsersList.push(user);
              })
              data.setUsers(newUsersList);
              allUsers = newUsersList;
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSearch = (event) => {
    event.preventDefault();
    let searchKey = event.target.searchKey.value;
    let searchBy = event.target.searchBy.value;
    if (searchKey) {
      let customers = []
      allUsers.forEach((user) => {
        if (user[searchBy]
          .toLowerCase()
          .includes(
            searchKey
              .toLowerCase()
          )) {
          customers.push(user);
        }
      })
      if (customers.length) {
        data.setUsers(customers);
        event.target.searchKey.value = '';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Customers Found!',
          footer: 'try another keyword!'
        })
      }

    } else {
      data.setUsers(allUsers);
    }
  }

  return (
    <div className={classes.root}>
      <TransactionsModal
        showModal={showModal}
        transactions={selectedUserTransactions}
        handleCloseModal={handleCloseModal}
      />
      <UsersToolbar
        handleSearch={handleSearch}
        length={data.users.length}
      />
      <div className={classes.content}>
        <UsersTable
          users={data.users}
          handleDelete={handleDelete}
          handleShowModal={handleShowModal}
        />
      </div>
    </div>
  );
};

export default UserList;
