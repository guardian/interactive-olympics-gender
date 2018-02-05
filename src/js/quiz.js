import fetch from 'unfetch'

class Quiz {

	constructor(_id, production = false) {

		this._id = _id
		this.production = production
		this.boxUrl = production ? 'https://interactive.guardianapis.com' : 'http://localhost:3000' 
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

		const path = this.production ? `${this.bucketUrl}/quiz-server/${this._id}.json` : `${this.bucketUrl}/quiz-server/test/${this._id}.json`

		return fetch(path)
			.then(resp => resp.json())

	}

}

export default Quiz