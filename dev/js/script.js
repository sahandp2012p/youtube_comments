// const axios = require("axios")

const form = document.getElementById("score")

const formSubmit = (event) =>{
	event.preventDefault()
	const formData = new FormData(event.target)
// 	fetch('http://localhost:8000/', {
// 		method: "POST",
// 		body: JSON.stringify({
// 			id: formData.get('id')
// 		})
// 	})
//   .then(response => response.json())
//   .then((data) => {
//   	if (data['detail']) {
//   		document.querySelector('p').innerText = data['detail']
//   	} else {
//   		document.querySelector('p').innerText =  `${data['score']}/10 ${data['emoji']} Out of ${data['comments']} comments`
//   	}
//   })
	axios.post('http://localhost:8000', {
		id: formData.get('id')
	}).then(response => {
		if (response.status == 200) {
			console.log(response.data)
		}
	})
}

form.addEventListener("submit", formSubmit, false)
