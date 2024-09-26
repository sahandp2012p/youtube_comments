import '../sass/style.sass'
import axios from "axios"

const form = document.getElementById("score")

const formSubmit = (event) =>{
	event.preventDefault()
	const formData = new FormData(event.target)
	axios.post('http://localhost:8000', {
		id: formData.get('id')
	}).then(response => {
		if (response.status == 200) {
      let data = response.data
			document.querySelector('p').innerText = `${data.score}/10 ${data.emoji} Out of ${data.comments} comments`
		} else if (response.status == 206) {
			document.querySelector('p').innerText = response.data.detail
		} else {
			document.querySelector('p') = innerText = 'Unauthorized'
		}
	})
}

form.addEventListener("submit", formSubmit, false)
