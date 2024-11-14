import "../css/index.css";
import axios from "axios";

const form = document.getElementById("score");
const spinner = document.getElementById('spinner')

const formSubmit = (event) => {
  event.preventDefault();
  document.getElementById('result').innerText = ''
  spinner.style.display = 'flex'
  const formData = new FormData(event.target);
  axios
    .post("https://youtube-comments-backend-kv2i.onrender.com", {
      id: formData.get("id"),
    })
    .then((response) => {
      if (response.status == 200) {
        let data = response.data;
        document.getElementById("result").innerText =
          `${data.score}/10 ${data.emoji} Out of ${data.comments} comments`;
      } else if (response.status == 206) {
        document.getElementById("result").innerText = response.data.detail;
      } else {
        document.getElementById("result").innerText = "Unauthorized";
      }

      spinner.style.display='none'
    });

  // TODO: Add top comments
};

form.addEventListener("submit", formSubmit, false);
