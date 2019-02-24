import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import styles from './styles';
import phoneApi from '../services/PhoneApi';

class EditPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			phoneBookRecord: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.phoneBookRecordId;
		phoneApi.getPhoneById(id)
			.then(result => this.setState({ phoneBookRecord: result[0] }));
	}

	update() {
		const id = this.props.match.params.phoneBookRecordId;
		const phoneBookRecord = this.state;
		phoneApi.updatePhone(id, phoneBookRecord)
			.then(() => this.setState({ message: 'Update successful' }))
			.catch(error => this.setState({ message: 'Something went wrong. Check your data.' }));
	}

	handleChange(event) {
		const { phoneBookRecord, message } = this.state;
		if (!phoneBookRecord) {
			return;
		}
		if (message) {
			this.setState({ message: null });
		}
		phoneBookRecord[event.target.name] = event.target.value;
		this.setState({ phoneBookRecord: phoneBookRecord });
	}

	render() {
		const { classes } = this.props;
		const { phoneBookRecord, message } = this.state;

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
					</div>
					<Button variant="contained"
						size="small"
						className={classes.button}
						onClick={this.update}>
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

EditPhone.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPhone);