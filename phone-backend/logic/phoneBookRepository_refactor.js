class PhoneBookRepository {
	constructor(database) {
		this.db = database;
	}

	getAll() {
		return new Promise((resolve, reject) => {
			db.query('select * from phoneBook', (err, result) => {
				if (err) {
					console.error(err);
					reject();
				} else {
					console.debug("getAll:", JSON.stringify(result));
					resolve(result);
				}
			})
		});
	}
	get(id) {
		return new Promise((resolve, reject) => {
			db.query('select * from phoneBook where id = $1', [id], (err, result) => {
				if (err) {
					console.error(err);
					reject();
				} else {
					console.debug("get:", JSON.stringify(result));
					resolve(result);
				}
			})
		});
	}
	update(phoneBook) {
		return new Promise((resolve, reject) => {
			db.query(`update phoneBook 
                set firstName = $1, lastName = $2, phoneNumber = $3 
                where id = $4`, [phoneBook.firstName, phoneBook.lastName, phoneBook.phoneNumber, phoneBook.id], (err, result) => {
					if (err) {
						console.error(err);
						reject();
					} else {
						console.debug("update: ", JSON.stringify(result));
						resolve(result);
					}
				})
		});
	}
	add(phoneBook) {
		return new Promise((resolve, reject) => {
			db.query(`insert into phoneBook(firstName, lastName, phoneNumber) values ($1, $2, $3)`,
				[phoneBook.firstName, phoneBook.lastName, phoneBook.phoneNumber], (err, result) => {
					if (err) {
						console.error(err);
						reject();
					} else {
						console.debug("update: ", JSON.stringify(result));
						resolve(result);
					}
				})
		});
	}
}

module.exports = PhoneBookRepository;