var express = require('express');
var router = express.Router();
const PhoneBookRepository = require('../logic/phoneBookRepository_refactor');
const PhoneBookService = require('../logic/phoneBookService_refactor');
const phoneBookValidator = require('../logic/phoneBookValidator');
const db = require('../logic/connection');

const repository = new PhoneBookRepository(db);
const service = new PhoneBookService(repository);
console.log(`Repository: ${repository}`);
console.log(`Service ${service}`);
router.get('/', function (req, res, next) {
	service.getAll()
		.then(result => {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ data: result, totalEntries: result.length }))
		});
});

router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	if (!id) {
		res.status(400);
		res.send(JSON.stringify({ error: "Id was not provided!" }));
		return;
	}
	service.get(id)
		.then(result => res.send(JSON.stringify(result)));
});

router.post('/', function (req, res, next) {
	if (!req.body.phoneBookRecord) {
		res.status(405);
		res.send(JSON.stringify({ error: "No phoneBookRecord found in body." }));
		return;
	}

	const firstName = req.body.phoneBookRecord.firstname;
	const lastName = req.body.phoneBookRecord.lastname;
	const phoneNumber = req.body.phoneBookRecord.phonenumber;

	if (!phoneBookValidator.validate(firstName, lastName, phoneNumber)) {
		res.status(400);
		res.send(JSON.stringify({ error: "Wrong input parameters!" }));
		return;
	}

	if (!phoneBookValidator.validatePhoneNumber(phoneNumber)) {
		res.status(430);
		res.send(JSON.stringify({ error: `Wrong phoneNumber format. Actual: ${phoneNumber} expected: +XX XX XXXXXX!` }));
		return;
	}

	service.add(firstName, lastName, phoneNumber)
		.then(result => {
			res.sendStatus(204);
		})
		.catch(error => {
			console.error(error);
			res.status(500);
			res.send(JSON.stringify({ error: 'A server error has occured.' }));
		});
});

router.put('/:id', function (req, res, next) {
	if (!req.body.phoneBookRecord) {
		res.status(405);
		res.send(JSON.stringify({ error: "No phoneBookRecord found in body." }));
		return;
	}

	const id = req.params.id;
	const firstName = req.body.phoneBookRecord.firstname;
	const lastName = req.body.phoneBookRecord.lastname;
	const phoneNumber = req.body.phoneBookRecord.phonenumber;

	if (!phoneBookValidator.validate(firstName, lastName, phoneNumber)) {
		res.status(400);
		res.send(JSON.stringify({ error: "Wrong input parameters!" }));
		return;
	}

	if (!phoneBookValidator.validatePhoneNumber(phoneNumber)) {
		res.status(430);
		res.send(JSON.stringify({ error: `Wrong phoneNumber format. Actual: ${phoneNumber} expected: +XX XX XXXXXX!` }));
		return;
	}

	service.update(id, firstName, lastName, phoneNumber)
		.then(result => {
			res.sendStatus(204);
		})
		.catch(error => {
			console.error(error);
			res.status(500);
			res.send(JSON.stringify({ error: 'A server error has occured.' }));
		});
});

module.exports = router;