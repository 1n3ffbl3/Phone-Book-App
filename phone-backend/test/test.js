const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
chai.should();

const PhoneBookService = require('../logic/phoneBookService_refactor');
let repository = null;

const data = [
	{ id: 1 }
];
let repositoryPromise;

describe('test service with mocks', function () {

	beforeEach(function () {
		repository = {
			getAll: function () { },
			get: function (id) { },
			update: function (object) { },
			add: function () { }
		}

		repositoryPromise = new Promise(resolve => {
			const queryResult = {
				rows: data
			};
			resolve(queryResult);
		});
	})

	it('getAll should call repository.getAll once', function () {
		const getAllStub = sinon.stub(repository, "getAll").returns(repositoryPromise);
		const service = new PhoneBookService(repository);
		service.getAll();

		expect(getAllStub.calledOnce).to.be.true;
	});

	it('get should call repository.get once', function () {
		const getStub = sinon.stub(repository, "get").withArgs(1).returns(repositoryPromise);
		const service = new PhoneBookService(repository);
		service.get(1);

		expect(getStub.calledOnce).to.be.true;
	});

	it('update should call repository.update once', function () {
		const firstname = "Adam";
		const lastname = "Kropka";
		const phonenumber = "+32 11 234567";

		const updatePromise = new Promise(resolve => {
			const queryResult = {
				rowCount: 1
			};
			resolve(queryResult);
		});

		const getStub = sinon.stub(repository, "get").withArgs(1).returns(repositoryPromise);
		const updateStub = sinon.stub(repository, "update").withArgs(sinon.match.any).returns(updatePromise);

		const service = new PhoneBookService(repository);
		service.update(1, firstname, lastname, phonenumber);

		expect(getStub.calledOnce).to.be.true;
		expect(updateStub.calledOnce).to.be.true;
	});

	it('add should call repository.add once', function () {
		const firstname = "Adam";
		const lastname = "Kropka";
		const phonenumber = "+32 11 234567";

		const addStub = sinon.stub(repository, "add").withArgs(sinon.match.any).returns(repositoryPromise);

		const service = new PhoneBookService(repository);
		service.add(firstname, lastname, phonenumber);

		expect(addStub.calledOnce).to.be.true;
	});
});