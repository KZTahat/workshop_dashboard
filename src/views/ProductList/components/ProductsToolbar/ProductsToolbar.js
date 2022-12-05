import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';

import { SearchInput } from '../../../../components';

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
    marginRight: theme.spacing(1)
  },
  form: {
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
}));

const ProductsToolbar = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <Typography variant="h2">
          Products
        </Typography>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={props.handleOpen}
        >
          Add product
        </Button>
      </div>
      <div className={classes.row}>
        {/* <form
          onSubmit={props.handleSearch}
          className={classes.form}
        > */}
          <SearchInput
            className={classes.searchInput}
            placeholder="Search product"
            name='searchKey'
            onChange={props.handleSearch}
          />
        {/* </form> */}
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
