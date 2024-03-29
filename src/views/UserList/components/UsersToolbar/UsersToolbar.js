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

const UsersToolbar = props => {
  const { className, handleSearch, length, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <Typography variant='h4'>Customers ({length})</Typography>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
        <form
          onSubmit={handleSearch}
        >
          <div className={classes.row}>
            <TextField
              placeholder="Search user"
              fullWidth={true}
              style={{ marginRight: '3%' }}
              name='searchKey'
            />
            <Select
              labelId="demo-simple-select-label"
              className={classes.searchInput}
              name="searchBy"
              variant="outlined"
              defaultValue='name'
              required
            >
              <MenuItem value='name'>Name</MenuItem>
              <MenuItem value='phone'>Phone</MenuItem>
              <MenuItem value='email'>Email</MenuItem>
              <MenuItem value='city'>City</MenuItem>
            </Select>
            <Button type='submit' variant='contained'>Go</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar; 
