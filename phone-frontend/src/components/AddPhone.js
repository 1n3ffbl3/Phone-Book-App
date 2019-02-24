import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import styles from './styles';
import phoneApi from '../services/PhoneApi';
import SimpleReactValidator from 'simple-react-validator';

class AddPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			phonenumber: ''
		};

		this.validator = new SimpleReactValidator();
		this.handleChange = this.handleChange.bind(this);
		this.save = this.save.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	save(event) {
		event.preventDefault();
		if (this.validator.allValid()) {
			const { firstname, lastname, phonenumber } = this.state;
			const data = { firstname: firstname, lastname: lastname, phonenumber: phonenumber };
			phoneApi.addPhone(data)
				.then(() => this.setState({ message: 'Record added succesfully.' }))
				.catch(() => this.setState({ message: 'Something went wrong. Check your data.' }));
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
	}

	render() {
		const { classes } = this.props;

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
							value={this.state.firstname}
							onChange={this.handleChange}
							margin="normal"
						/>
						{this.validator.message('firstname', this.state.firstname, 'required|alpha|min:5')}
					</div>
					<div>
						<TextField
							type='text'
							name='lastname'
							label="Last Name"
							className={classes.textField}
							value={this.state.lastname}
							onChange={this.handleChange}
							margin="normal"
						/>
						{this.validator.message('lastname', this.state.lastname, 'required|alpha|min:5')}
					</div>
					<div>
						<TextField
							type='phone'
							name='phonenumber'
							label="Phone Number"
							className={classes.textField}
							value={this.state.phonenumber}
							onChange={this.handleChange}
							margin="normal"
						/>
						{this.validator.message('phonenumber', this.state.phonenumber, 'required|min:7')}
					</div>
					<Button variant="contained"
						size="small"
						type="submit"
						className={classes.button}
						onClick={this.save}>
						<SaveIcon />
						Save
         			</Button>
				</form>
			</div>
		);
	}
}

AddPhone.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPhone);