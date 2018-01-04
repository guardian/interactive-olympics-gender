import fetch from 'unfetch'

class Quiz {

	constructor(_id) {

		this._id = _id
		this.boxUrl = 'https://interactive.guardianapis.com'
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

		return fetch(`${this.bucketUrl}/quiz-server/${this._id}.json`)
			.then(resp => resp.json())

	}

}

export default Quiz