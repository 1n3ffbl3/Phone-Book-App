import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Link, Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import styles from './styles';
import phoneApi from '../services/PhoneApi';
import { notifyError, notifySuccess } from './toasts';

const ADD = 'ADD';
const EDIT = 'EDIT';

class ActionPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneBookRecord: null,
			toMainPage: false,
			action: ''
		};

		this.validator = new SimpleReactValidator();
		this.handleChange = this.handleChange.bind(this);
		this.doAction = this.doAction.bind(this);
		this.doCreate = this.doCreate.bind(this);
		this.doUpdate = this.doUpdate.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.phoneBookRecordId;
		if (id) {
			this.setState({ action: EDIT });
			phoneApi.getPhoneById(id)
				.then(result => this.setState({ phoneBookRecord: result[0] }));
		} else {
			this.setState({ action: ADD, phoneBookRecord: {} });
		}
	}

	doUpdate() {
		const id = this.props.match.params.phoneBookRecordId;
		const { phoneBookRecord } = this.state;
		phoneApi.updatePhone(id, phoneBookRecord)
			.then(() => {
				notifySuccess('Phone record updated successfully');
				this.setState({ toMainPage: true });
			})
			.catch((err) => {
				const errorMessage = err.error || 'An error has occured';
				notifyError(errorMessage);
			});
	}

	doCreate() {
		const { phoneBookRecord } = this.state;
		phoneApi.addPhone(phoneBookRecord)
			.then(() => {
				notifySuccess('Phone record added successfully');
				this.setState({ toMainPage: true });
			})
			.catch((err) => {
				const errorMessage = err.error || 'An error has occured';
				notifyError(errorMessage);
			});
	}

	doAction(event) {
		event.preventDefault();
		if (this.validator.allValid()) {
			const { action } = this.state;
			if (action === ADD) {
				this.doCreate();
			} else if (action === EDIT) {
				this.doUpdate();
			}
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
		this.setState({ phoneBookRecord });
	}

	render() {
		const { classes } = this.props;
		const { phoneBookRecord, action } = this.state;
		if (this.state.toMainPage) {
			return <Redirect to="/" />;
		}

		return (
			<div align="center" className={classes.container}>
				<Link to="/">Go back to main page</Link>
				<form>
					<h1>{action} Phone Book Record</h1>
					<div>
						<TextField
							type="text"
							name="firstname"
							label="First Name"
							className={classes.textField}
							value={phoneBookRecord ? phoneBookRecord.firstname : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
						<div className={classes.error}>
							{phoneBookRecord && this.validator.message('firstname', phoneBookRecord.firstname, 'required|alpha|min:3')}
						</div>
					</div>
					<div>
						<TextField
							type="text"
							name="lastname"
							label="Last Name"
							className={classes.textField}
							value={phoneBookRecord ? phoneBookRecord.lastname : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
						<div className={classes.error}>
							{phoneBookRecord && this.validator.message('lastname', phoneBookRecord.lastname, 'required|alpha|min:5')}
						</div>
					</div>
					<div>
						<TextField
							type="phone"
							name="phonenumber"
							label="Phone Number"
							className={classes.textField}
							value={phoneBookRecord ? phoneBookRecord.phonenumber : ''}
							onChange={this.handleChange}
							margin="normal"
						/>
						<div className={classes.error}>
							{phoneBookRecord && this.validator.message('phonenumber', phoneBookRecord.phonenumber, 'required|min:7')}
						</div>
					</div>
					<Button
						variant="contained"
						size="small"
						className={classes.button}
						onClick={this.doAction}
					>
						<SaveIcon />
						Save
					</Button>
				</form>
			</div>
		);
	}
}

ActionPhone.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionPhone);