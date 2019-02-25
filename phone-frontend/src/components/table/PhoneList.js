import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import phoneService from '../../services/PhoneApi';
import styles from '../styles';
import PhoneEditButton from './PhoneEditButton';
import PhoneTableHeader from './PhoneTableHeader';
import { Fab, Icon, Checkbox, Table, TableBody, TableCell, TableRow } from '@material-ui/core';

class PhoneList extends React.Component {
	state = {
		selected: [],
		rows: [],
		filteredRows: [],
		searchText: '',
	}

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		if (selectedIndex === 0) {
			this.setState({ selected: [] });
		} else {
			this.setState({ selected: [].concat(id) });
		}
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	hasTextSearchedQuery = (text, searchQuery) =>
		text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;

	componentDidMount() {
		phoneService.getAllPhones()
			.then(result => this.setState({ rows: result.data }));
	}

	render() {
		const { classes } = this.props;
		const { rows, searchText } = this.state;

		const filteredRows = searchText && rows && rows.length > 0 ?
			rows.filter(row => {
				return this.hasTextSearchedQuery(row.firstname) ||
					this.hasTextSearchedQuery(row.lastname) ||
					this.hasTextSearchedQuery(row.phonenumber);
			}) : rows;
		return (
			<div>
				<div align="center">
					<h1>Phone Book</h1>
					<DebounceInput
						position="inherit"
						placeholder="Search..."
						minLength={2}
						debounceTimeout={300}
						onChange={event => this.setState({ searchText: event.target.value })} />
					<div>
						<span>
							Add Phone Book Record
              			</span>
						<Link to="/new">
							<Fab color="secondary" size="small" aria-label="Add" className={classes.fab}>
								<Icon>add_icon</Icon>
							</Fab>
						</Link>
					</div>
				</div>
				<div>
					{filteredRows ? (
						<Table className={classes.table}>
							<PhoneTableHeader />
							<TableBody>
								{filteredRows ? filteredRows.map(row => {
									const isSelected = this.isSelected(row.id);
									return (
										<TableRow key={row.id}
											onClick={event => this.handleClick(event, row.id)}>
											<TableCell padding="checkbox">
												<Checkbox checked={isSelected} />
											</TableCell>
											<TableCell component="th" scope="row" align="center" >
												{row.lastname}
											</TableCell>
											<TableCell align="center">{row.firstname}</TableCell>
											<TableCell align="center">{row.phonenumber}</TableCell>
											<TableCell align="center">
												<PhoneEditButton phoneBookRecordId={row.id} />
											</TableCell>
										</TableRow>
									)
								}) : ''}
							</TableBody>
						</Table>
					) : "No records in filteredRows"}
				</div>
			</div>
		);
	}
}

PhoneList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhoneList);