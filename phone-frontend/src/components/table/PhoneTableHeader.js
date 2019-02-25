import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
	{
		id: 'lastName', numeric: false, disablePadding: true, label: 'Last name',
	},
	{
		id: 'firstName', numeric: true, disablePadding: false, label: 'First name',
	},
	{
		id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone number',
	},
	{
		id: 'edit', numeric: true, disablePadding: false, label: 'Edit',
	},
];

const PhoneTableHeader = () => (
	<TableHead>
		<TableRow>
			<TableCell />
			{columns.map(
				column => (
					<TableCell
						key={column.id}
						padding={column.disablePadding ? 'none' : 'default'}
						align="center"
					>
						{column.label}
					</TableCell>
				),
				this,
			)}
		</TableRow>
	</TableHead>
);

export default PhoneTableHeader;
