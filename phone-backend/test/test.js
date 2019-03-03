const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const PhoneBookService = require('../logic/phoneBookService_refactor');

describe('test service with mocks', function () {

	beforeEach(function () {
		repository = {
			getAll: sinon.spy(),
			get: sinon.spy(),
			update: sinon.spy(),
			add: sinon.spy()
		}
	})

	it('getAll should call repository.getAll once', function () {

		const service = new PhoneBookService(repository);
		service.getAll();
		console.log('repository.getAll:', repository.getAll); //spy

		expect(repository.getAll.calledOnce).to.be.true
	});

	it('get should call repository.get once', function () {

		const service = new PhoneBookService(repository);
		service.get();

		expect(repository.get.calledOnce).to.be.true
	});

	it('update should call repository.update once', function () {

		const service = new PhoneBookService(repository);
		service.update();

		expect(repository.update.calledOnce).to.be.true
	});

	it('add should call repository.add once', function () {

		const service = new PhoneBookService(repository);
		service.add();

		expect(repository.add.calledOnce).to.be.true
	});
});