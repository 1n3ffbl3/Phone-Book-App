const db = require('../logic/connection')

const phoneBookRecords = [
	{ firstName: 'Ada', lastName: 'Kowalsky', phoneNumber: '+32 54 663322' },
	{ firstName: 'Victor', lastName: 'Smith', phoneNumber: '+48 89 567710' },
	{ firstName: 'Paula', lastName: 'Ananas', phoneNumber: '+33 77 449988' },
	{ firstName: 'Eva', lastName: 'Belowsky', phoneNumber: '+32 11 234567' },
	{ firstName: 'Anna', lastName: 'Karenina', phoneNumber: '+32 00 004567' },
	{ firstName: 'Jean', lastName: 'Utha', phoneNumber: '+32 11 111111' },
	{ firstName: 'Cecilia', lastName: 'Cycoria', phoneNumber: '+32 25 555555' },
	{ firstName: 'Didier', lastName: 'Docker', phoneNumber: '+32 22 887799' },
	{ firstName: 'Filemon', lastName: 'Figi', phoneNumber: '+32 33 845699' },
	{ firstName: 'Johnn', lastName: 'Doe', phoneNumber: '+32 44 766633' },
]

phoneBookRecords.forEach(pbr => {
	db.query(`insert into phoneBook(firstName, lastName, phoneNumber) values ($1, $2, $3)`,
		[pbr.firstName, pbr.lastName, pbr.phoneNumber]);
})
db.end();