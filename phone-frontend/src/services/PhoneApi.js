import API_URL from '../config';

const APPLICATION_JSON = "application/json";

class PhoneApi {

	async getAllPhones() {
		const res = await fetch(API_URL, {
			method: "GET",
			headers: {
				"Accept": APPLICATION_JSON
			}
		});
		return await res.json();
	}

	async getPhoneById(id) {
		const res = await fetch(`${API_URL}${id}`);
		return await res.json();
	}

	async addPhone(data) {
		const res = await fetch(`${API_URL}`, {
			method: "POST",
			headers: {
				"Accept": APPLICATION_JSON,
				"Content-Type": APPLICATION_JSON
			},
			body: JSON.stringify(data)
		});
		return await res.json();
	}

	async updatePhone(id, data) {
		const res = fetch(`${API_URL}/${id}`, {
			method: "PUT",
			headers: {
				"Accept": APPLICATION_JSON,
				"Content-Type": APPLICATION_JSON
			},
			body: JSON.stringify(data)
		})
		return await res.json();
	}
}

const phoneApi = new PhoneApi();

export default phoneApi;