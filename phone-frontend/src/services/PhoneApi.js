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
		const resJson = await res.json();
		return resJson;
	}

	async getPhoneById(id) {
		const res = await fetch(`${API_URL}${id}`);
		const resJson = await res.json();
		return resJson;
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
		if (res.status === 204) {
			return '';
		}
		const json = await res.json();
		return json.ok ? json : Promise.reject(json);
	}

	async updatePhone(id, data) {
		const res = await fetch(`${API_URL}${id}`, {
			method: "PUT",
			headers: {
				"Accept": APPLICATION_JSON,
				"Content-Type": APPLICATION_JSON
			},
			body: JSON.stringify(data)
		});
		const json = await res.json();
		return json.ok ? json : Promise.reject(json);
	}
}

const phoneApi = new PhoneApi();

export default phoneApi;