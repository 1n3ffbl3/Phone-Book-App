import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import styles from './styles';
import phoneApi from '../services/PhoneApi';
import SimpleReactValidator from 'simple-react-validator';

class EditPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneBookRecord: null
		};

		this.validator = new SimpleReactValidator();
		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.phoneBookRecordId;
		phoneApi.getPhoneById(id)
			.then(result => this.setState({ phoneBookRecord: result[0] }));
	}

	update(event) {
		event.preventDefault();
		if (this.validator.allValid()) {
			const id = this.props.match.params.phoneBookRecordId;
			const phoneBookRecord = this.state;
			phoneApi.updatePhone(id, phoneBookRecord)
				.then(() => this.setState({ message: 'Update successful' }))
				.catch(() => this.setState({ message: 'Something went wrong. Check your data.' }));
		} else {
			this.validator.showMessages();
			this.forceUpdate();
		}
	}

	handleChange(event) {
		const { phoneBookRecord } = this.state;
		if (!phoneBookRecord) {
			return;
		}
		phoneBookRecord[event.target.name] = event.target.value;
		this.setState({ phoneBookRecord: phoneBookRecord });
	}

	render() {
		const { classes } = this.props;
		const { phoneBookRecord } = this.state;

		return (
			<div align="center" className={classes.container}>
				<Link to="/">Go back to main page</Link>
				<form>
					<h1>Edit Phone Book Record</h1>
					<div>
						<TextField
							type='text'
							name='firstname'
							label="First Name"
							className={classes.textField}
							value={phoneBookRecord ? phoneBookRecord.firstname : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
						{phoneBookRecord && this.validator.message('firstname', phoneBookRecord.firstname, 'required|alpha|min:5')}
					</div>
					<div>
						<TextField
							type='text'
							name='lastname'
							label="Last Name"
							className={classes.textField}
							value={phoneBookRecord ? phoneBookRecord.lastname : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
						{phoneBookRecord && this.validator.message('lastname', phoneBookRecord.lastname, 'required|alpha|min:5')}
					</div>
					<div>
						<TextField
							type='phone'
							name='phonenumber'
							label="Phone Number"
							className={classes.textField}
							value={phoneBookRecord ? phoneBookRecord.phonenumber : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
						{phoneBookRecord && this.validator.message('phonenumber', phoneBookRecord.phonenumber, 'required|min:7')}
					</div>
					<Button variant="contained"
						size="small"
						className={classes.button}
						onClick={this.update}>
						<SaveIcon />
						Save
                	</Button>
				</form>
			</div>
		);
	}
}

EditPhone.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPhone);