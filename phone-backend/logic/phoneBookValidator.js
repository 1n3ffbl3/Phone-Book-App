const phoneNumberRegex = new RegExp('[+][0-9]{2} [0-9]{2} [0-9]{6,}');
module.exports = {
	validate: function (firstName, lastName, phoneNumber) {
		if (!firstName || !lastName || !phoneNumber) {
			return false;
		}
		return true;
	},
	validatePhoneNumber: function (phoneNumber) {
		return phoneNumberRegex.test(phoneNumber);
	}
}