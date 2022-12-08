import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import FlakyIcon from '@mui/icons-material/Flaky';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { TablePagination } from '@material-ui/core';
import { getInitials } from '../../../../helpers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '2%'
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  FlakyIcon: {
    marginLeft: '12%',
    cursor: 'pointer',
  }
}));

const TransactionsTable = (props) => {
  const { className, transactions, updateStatus, ...rest } = props;
  const classes = useStyles();

  const [selectedTrans, setSelectedTrans] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let selectedTrans;

    if (event.target.checked) {
      selectedTrans = transactions.map(user => user._id);
    } else {
      selectedTrans = [];
    }

    setSelectedTrans(selectedTrans);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTrans.indexOf(id);
    let newSelectedTrans = [];

    if (selectedIndex === -1) {
      newSelectedTrans = newSelectedTrans.concat(selectedTrans, id);
    } else if (selectedIndex === 0) {
      newSelectedTrans = newSelectedTrans.concat(selectedTrans.slice(1));
    } else if (selectedIndex === selectedTrans.length - 1) {
      newSelectedTrans = newSelectedTrans.concat(selectedTrans.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedTrans = newSelectedTrans.concat(
        selectedTrans.slice(0, selectedIndex),
        selectedTrans.slice(selectedIndex + 1)
      );
    }

    setSelectedTrans(newSelectedTrans);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTrans.length === transactions.length}
                      color="primary"
                      indeterminate={
                        selectedTrans.length > 0 &&
                        selectedTrans.length < transactions.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Trans. ID</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Trans. date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.slice(0, rowsPerPage).map(transaction => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={transaction.id}
                    selected={selectedTrans.indexOf(transaction._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedTrans.indexOf(transaction._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, transaction._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={transaction.avatarUrl}
                        >
                          {getInitials(transaction.buyerName)}
                        </Avatar>
                        <Typography variant="body1">{transaction.buyerName}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{transaction._id}</TableCell>
                    <TableCell>{transaction.buyerPhoneNumber}</TableCell>
                    <TableCell>
                      {moment(transaction.transactionDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell
                      style={{ color: transaction.status == 'delivered' ? 'green' : 'red' }}
                    >
                      {transaction.status}
                    </TableCell>
                    <TableCell>
                      <FlakyIcon
                        className={classes.FlakyIcon}
                        onClick={() => updateStatus(transaction._id, transaction.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={transactions.length}
          onPageChange={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

TransactionsTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default TransactionsTable;
