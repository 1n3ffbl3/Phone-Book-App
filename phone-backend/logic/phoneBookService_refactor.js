class PhoneBookService {
	constructor(repository) {
		this.phoneBookRepository = repository;
	}

	getAll() {
		return this.phoneBookRepository.getAll()
			.then(result => result.rows);
	}

	get(id) {
		return this.phoneBookRepository.get(id)
			.then(result => result.rows);
	}

	add(firstName, lastName, phoneNumber) {
		const phoneBook = {
			firstName: firstName,
			lastName: lastName,
			phoneNumber: phoneNumber
		};
		return this.phoneBookRepository.add(phoneBook)
			.then(result => result.rowCount);
	}

	update(id, firstName, lastName, phoneNumber) {
		return this.phoneBookRepository.get(id)
			.then(() => {
				const phoneBook = {
					id: id,
					firstName: firstName,
					lastName: lastName,
					phoneNumber: phoneNumber
				};
				return this.phoneBookRepository.update(phoneBook)
					.then(result => {
						return result.rowCount
					});
			});
	}
}

module.exports = PhoneBookService;