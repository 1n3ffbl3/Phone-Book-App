import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import PhoneTableHeader from './PhoneTableHeader';
import {DebounceInput} from 'react-debounce-input';
import PhoneEditButton from './PhoneEditButton';
import API_URL from '../../config';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  fab: {
    margin: theme.spacing.unit
  }
});

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
      this.setState({ selected: []});
    } else {
      this.setState({ selected: [].concat(id)});
    }
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount() {
    fetch(`${API_URL}/`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }}
    )
    .then(result => result.json())
    .then(result => {
      this.setState({rows: result.data});
    });
  }
  
  render() {
    const { classes } = this.props;
    const { rows, searchText} = this.state;

    const filteredRows = searchText && rows && rows.length > 0 ?
      rows.filter(row => {
        return row.firstname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          row.lastname.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
          row.phonenumber.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
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
            onChange={event => this.setState({searchText: event.target.value})} />
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
		{ filteredRows ? (
      <Table className={classes.table}>
        <PhoneTableHeader/>
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
            )}) : ''}
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