import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});

function PhoneEditButton(props) {
  const { classes, phoneBookRecordId } = props;
  return (
    <div>
      <Link to={`/edit/${phoneBookRecordId}`}>
        <Fab color="secondary" size="small" aria-label="Edit" className={classes.fab}>
          <Icon>edit_icon</Icon>
        </Fab>
      </Link>
    </div>
  );
}

PhoneEditButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneEditButton);