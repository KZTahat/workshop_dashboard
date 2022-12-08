import React, {useEffect} from 'react';//
import { makeStyles } from '@material-ui/styles';//
import axios from 'axios';
import { TransactionsTable, TransToolbar } from './components';//
import Swal from 'sweetalert2';
import { socket } from '../../App'
import { useData } from '../../dataContext';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

let allTransactions;
const TransactionsList = () => {
  const classes = useStyles();
  const data = useData();
  
  useEffect(() => {
    allTransactions = data.transactions;
  }, [])

  socket.on('new_transaction', (message) => {
    console.log(message);
  })


  // const handleDelete = (userId) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         axios.delete(`${process.env.REACT_APP_USERS}/deleteuser/${userId}`)
  //           .then((response) => {
  //             console.log(response);
  //             let newUsersList = [];
  //             users.forEach((user) => {
  //               if (user._id !== userId) newUsersList.push(user);
  //             })
  //             setUsers(newUsersList);
  //             allTransactions = newUsersList;
  //             Swal.fire(
  //               'Deleted!',
  //               'User has been deleted.',
  //               'success'
  //             )
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           })
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  const handleSearch = (event) => {
    event.preventDefault();
    let searchKey = event.target.searchKey.value;
    let searchBy = event.target.searchBy.value;
    if (searchKey) {
      let foundTransactions = []
      allTransactions.forEach((transaction) => {
        if (transaction[searchBy]
          .toLowerCase()
          .includes(
            searchKey
              .toLowerCase()
          )) {
          foundTransactions.push(transaction);
        }
      })
      if (foundTransactions.length) {
        data.setTransactions(foundTransactions);
        event.target.searchKey.value = '';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No Transactions Found!',
          footer: 'try another keyword!',
        })
      }
    } else {
      data.setTransactions(allTransactions);
    }
  }

  const updateStatus = (transId, status) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            let newStatus = 'delivered';
            if (status == 'delivered') newStatus = 'processing';
            axios.patch(`${process.env.REACT_APP_TRANSACTIONS}/updatestatus/${transId}?status=${newStatus}`)
              .then(() => {
                let newTransactions = data.transactions.map((trans) => {
                  if (trans._id == transId) {
                    trans.status = newStatus;
                  }
                  return trans;
                })
                Swal.fire(
                  'Updated!',
                  'The status has been Updated.',
                  'success'
                )
                data.setTransactions(newTransactions);
                allTransactions = newTransactions;
              })
              .catch((err) => {
                console.log(err);
              })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <TransToolbar
        handleSearch={handleSearch}
        length={data.transactions.length}
      />
      <div className={classes.content}>
        <TransactionsTable
          updateStatus={updateStatus}
          transactions={data.transactions}
        />
      </div>
    </div>
  );
};

export default TransactionsList;
