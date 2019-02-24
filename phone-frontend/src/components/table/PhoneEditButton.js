import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import styles from '../styles';
import { Fab, Icon } from '@material-ui/core';

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