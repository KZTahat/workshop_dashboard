import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { Select, TextField, MenuItem, Button, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

const TransactionsToolbar = props => {
  const { className, handleSearch, length, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <Typography variant='h4'>Transactions ({length})</Typography>
        <span className={classes.spacer} />
        {/* <Button
          color="primary"
          variant="contained"
        >
          Add user
        </Button> */}
      </div>
      <div className={classes.row}>
        <form
          onSubmit={handleSearch}
        >
          <div className={classes.row}>
            <TextField
              placeholder="Search transaction"
              fullWidth={true}
              style={{ marginRight: '3%' }}
              name='searchKey'
            />
            <Select
              labelId="demo-simple-select-label"
              className={classes.searchInput}
              name="searchBy"
              variant="outlined"
              defaultValue='buyerName'
              required
            >
              <MenuItem value='buyerName'>Name</MenuItem>
              <MenuItem value='buyerPhoneNumber'>Phone</MenuItem>
              <MenuItem value='transactionDate'>date</MenuItem>
              <MenuItem value='status'>Status</MenuItem>
            </Select>
            <Button type='submit' variant='contained'>Go</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

TransactionsToolbar.propTypes = {
  className: PropTypes.string
};

export default TransactionsToolbar; 
