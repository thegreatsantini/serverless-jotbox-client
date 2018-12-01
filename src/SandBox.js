import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: '0 auto',
  },
  container: {
    padding: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    textAlign: 'center'
  },
  title: {
    padding: '50px'
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
      <div className={classes.container}>
        <Typography className={classes.title} variant='h3'>
          Fetching Data
      </Typography>
        <CircularProgress
          size={90}
          className={classes.progress}
        />
      </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
