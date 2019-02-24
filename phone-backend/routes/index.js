
var express = require('express');
var router = express.Router();
const phoneBookService = require('../logic/phoneBookService');
const phoneBookValidator = require('../logic/phoneBookValidator');

router.get('/', function (req, res, next) {
	phoneBookService.getAll()
		.then(result => {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ data: result, totalEntries: result.length }))
		});
});

router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	const phoneBook = phoneBookService.get(id)
		.then(result => res.send(JSON.stringify(result)));
});

router.post('/', function (req, res, next) {
	const firstName = req.body.firstname;
	const lastName = req.body.lastname;
	const phoneNumber = req.body.phonenumber;
	console.log(req.body);
	if (!phoneBookValidator.validate(firstName, lastName, phoneNumber)) {
		res.status(400);
		res.send(JSON.stringify({ error: "Wrong input parameters!" }));
		return;
	}

	if (!phoneBookValidator.validatePhoneNumber(phoneNumber)) {
		res.status(400);
		res.send(JSON.stringify({ error: `Wrong phoneNumber format. Actual: ${phoneNumber} expected: +XX XX XXXXXX!` }));
		return;
	}

	phoneBookService.add(firstName, lastName, phoneNumber)
		.then(result => {
			console.log(result);
			res.status(200);
			res.send(result);
		})
		.catch(error => {
			console.error(error);
			res.status(400);
			res.send(JSON.stringify({ error: error }));
		});
});

router.put('/:id', function (req, res, next) {
	if (!req.body.phoneBookRecord) {
		res.status(400);
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
		res.status(400);
		res.send(JSON.stringify({ error: `Wrong phoneNumber format. Actual: ${phoneNumber} expected: +XX XX XXXXXX!` }));
		return;
	}

	phoneBookService.update(id, firstName, lastName, phoneNumber)
		.then(result => {
			res.send(JSON.stringify({ rowsUpdated: result }));
		})
		.catch(error => {
			res.status(400);
			res.send(JSON.stringify({ error: error }));
		});
});

module.exports = router;