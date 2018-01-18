import fetch from 'unfetch'

class Quiz {

	constructor(_id, test = false) {

		this._id = _id
		this.test = test
		this.boxUrl = test ? 'http://localhost:3000' : 'https://interactive.guardianapis.com'
		this.bucketUrl = 'https://interactive.guim.co.uk'
	}

	postAnswer (data) {

		return fetch(`${this.boxUrl}/projects/${this._id}`, {
			method : 'post',
			mode : 'no-cors',
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(data)

		})

	}

	getSummary () {

		const path = this.test ? `${this.bucketUrl}/quiz-server/test/${this._id}.json` : `${this.bucketUrl}/quiz-server/${this._id}.json`

		return fetch(path)
			.then(resp => resp.json())

	}

}

export default Quiz