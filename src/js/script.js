import "../css/index.css";
import axios from "axios";

const form = document.getElementById("score");

const formSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  axios
    .post("http://localhost:8000", {
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
    });
};

form.addEventListener("submit", formSubmit, false);
