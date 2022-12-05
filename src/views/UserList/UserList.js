import React, { useState, useEffect } from 'react';//
import { makeStyles } from '@material-ui/styles';//
import axios from 'axios';
import { UsersToolbar, UsersTable, TransactionsModal } from './components';//
import Swal from 'sweetalert2';

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
  const [users, setUsers] = useState([]);
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
    try {
      axios.get(`${process.env.REACT_APP_USERS}/getallusers`)
        .then((response) => {
          setUsers(response.data.users);
          allUsers = response.data.users;
        })
        .catch((err) => {
          console.log(err);
        })
    }
    catch (error) {
      console.log('inside catch', error);
    }
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
            .then((response) => {
              console.log(response);
              let newUsersList = [];
              users.forEach((user) => {
                if (user._id !== userId) newUsersList.push(user);
              })
              setUsers(newUsersList);
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
    console.log(event.target.category.value);
    console.log(event.target.search.value);
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
      />
      <div className={classes.content}>
        <UsersTable
          users={users}
          handleDelete={handleDelete}
          handleShowModal={handleShowModal}
        />
      </div>
    </div>
  );
};

export default UserList;
