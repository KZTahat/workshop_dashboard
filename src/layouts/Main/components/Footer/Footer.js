import React from 'react';//
import PropTypes from 'prop-types';//
import clsx from 'clsx';//
import { makeStyles } from '@material-ui/styles';//
import { Typography, Link } from '@material-ui/core';//

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="website URL goes here"
          target="_blank"
        >
          Khaled Tahat
        </Link>
        . 2022
      </Typography>
      <Typography variant="caption">
        Your imagination have no limits, Be creative.
        No rules will restrict your idea, shape it up.
        Professionalism in making art.
        practicing makes experience  NOT theoretical study.
        work, learn from your mistakes THEN create 😊
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
