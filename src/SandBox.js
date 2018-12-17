import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  
}

class SandBox extends React.Component {
  state = {
    isLoading: true,
  };
  
  render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        {
          !isLoading &&
          <React.Fragment>
            <p>SandBox</p>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

SandBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SandBox);

