const phoneBookRepository = require('./phoneBookRepository');

class PhoneBookService {

	getAll() {
		return phoneBookRepository.getAll()
			.then(result => result.rows);
	}

	get(id) {
		return phoneBookRepository.get(id)
			.then(result => result.rows);
	}

	add(firstName, lastName, phoneNumber) {
		const phoneBook = {
			firstName: firstName,
			lastName: lastName,
			phoneNumber: phoneNumber
		};
		return phoneBookRepository.add(phoneBook)
			.then(result => result.rowCount);
	}

	update(id, firstName, lastName, phoneNumber) {
		return phoneBookRepository.get(id)
			.then(() => {
				const phoneBook = {
					id: id,
					firstName: firstName,
					lastName: lastName,
					phoneNumber: phoneNumber
				};
				return phoneBookRepository.update(phoneBook)
					.then(result => result.rowCount);
			});
	}
}

const phoneBookService = new PhoneBookService();
module.exports = phoneBookService;