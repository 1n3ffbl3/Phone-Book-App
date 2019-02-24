import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import styles from './styles';
import phoneApi from '../services/PhoneApi';

class AddPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: null,
			lastname: null,
			phonenumber: null,
			message: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.save = this.save.bind(this);
	}

	handleChange(event) {
		const { message } = this.state;
		if (message) {
			this.setState({ message: null });
		}
		this.setState({ [event.target.name]: event.target.value });
	}

	save(event) {
		event.preventDefault();
		const { firstname, lastname, phonenumber } = this.state;
		const data = { firstname: firstname, lastname: lastname, phonenumber: phonenumber };
		phoneApi.addPhone(data)
			.then(() => this.setState({ message: 'Record added succesfully.' }))
			.catch(() => this.setState({ message: 'Something went wrong. Check your data.' }));
	}

	render() {
		const { classes } = this.props;
		const { firstname, lastname, phonenumber, message } = this.state;

		return (
			<div align="center" className={classes.container}>
				<Link to="/">Go back to main page</Link>
				<form>
					<h1>New Phone Number</h1>
					<div>
						<TextField
							type='text'
							name='firstname'
							label="First Name"
							className={classes.textField}
							value={firstname ? firstname : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
					</div>
					<div>
						<TextField
							type='text'
							name='lastname'
							label="Last Name"
							className={classes.textField}
							value={lastname ? lastname : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
					</div>
					<div>
						<TextField
							type='phone'
							name='phonenumber'
							label="Phone Number"
							className={classes.textField}
							value={phonenumber ? phonenumber : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
					</div>
					<Button variant="contained"
						size="small"
						type="submit"
						className={classes.button}
						onClick={this.save}>
						<SaveIcon />
						Save
          </Button>
					<div>
						{message ? message : ''}
					</div>
				</form>
			</div>
		);
	}
}

AddPhone.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPhone);