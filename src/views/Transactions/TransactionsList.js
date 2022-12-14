import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { TransactionsTable, TransToolbar } from './components';
import Swal from 'sweetalert2';
import { useData } from '../../dataContext';
import { TransDetailsModal } from '../../components';


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
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();
  const data = useData();

  useEffect(() => {
    allTransactions = data.transactions;
  }, [])

  const handleShowModal = (transaction) => {
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
  };
  const handleCloseModal = () => setShowModal(false);

  const cancelTransaction = (transactionId, status) => {
    if (status == 'canceled') {
      Swal.fire({text: 'transaction already canceled', icon: 'warning',});
    }
    else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      })
        .then((result) => {
          if (result.isConfirmed && (status != 'pending' || status != 'delivered')) {
            axios.patch(`${process.env.REACT_APP_TRANSACTIONS}/canceltransaction/${transactionId}`)
              .then((response) => {
                let newTransList = [];
                data.transactions.forEach((transaction) => {
                  if (transaction._id == transactionId) transaction.status = 'canceled'
                  newTransList.push(transaction);
                })
                data.setTransactions(newTransList);
                allTransactions = newTransList;
                Swal.fire(
                  'Canceled!',
                  'Transaction has been canceled.',
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

  }

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
    if (status == 'canceled') {
      Swal.fire({text: 'Could not change status', icon: 'warning',});
    }
    else {
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
            if (result.isConfirmed && status != 'canceled') {
              let newStatus = 'delivered';
              if (status == 'delivered') newStatus = 'pending';
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
  }

  return (
    <div className={classes.root}>
      <TransDetailsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        purchases={data.purchases}
      />
      <TransToolbar
        handleSearch={handleSearch}
        length={data.transactions.length}
      />
      <div className={classes.content}>
        <TransactionsTable
          updateStatus={updateStatus}
          transactions={data.transactions}
          handleShowModal={handleShowModal}
          cancelTransaction={cancelTransaction}
        />
      </div>
    </div>
  );
};

export default TransactionsList;
