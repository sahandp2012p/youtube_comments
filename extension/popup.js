document.addEventListener("DOMContentLoaded", () => {
  let loadingInterval;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    const resultDiv = document.getElementById("result");

    if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {
      const videoId = url.searchParams.get("v");
      if (videoId) {
        startLoadingAnimation(resultDiv); // Start animation
        fetchSentiment(videoId, resultDiv); // Pass resultDiv
      } else {
        resultDiv.textContent = "No video ID found.";
      }
    } else {
      resultDiv.textContent = "Not a YouTube video page.";
    }
  });

  function fetchSentiment(videoId, resultDiv) {
    fetch("https://youtube-comments-backend-kv2i.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: videoId }),
    })
      .then((response) => response.json())
      .then((data) => {
        clearInterval(loadingInterval); // Stop animation when results arrive

        if (data.score !== undefined && data.emoji && data.comments) {
          resultDiv.innerText = `${data.score}/10 ${data.emoji} Out of ${data.comments} comments`;
        } else if (data.detail) {
          resultDiv.innerText = data.detail;
        } else {
          resultDiv.innerText =
            "An error occurred while fetching the sentiment.";
        }
      })
      .catch((error) => {
        clearInterval(loadingInterval); // Stop animation on error
        console.error("Error fetching sentiment:", error);
        resultDiv.textContent = "Error fetching sentiment.";
      });
  }

  function startLoadingAnimation(element) {
    let dots = 0;
    element.textContent = "Loading";
    loadingInterval = setInterval(() => {
      element.textContent = "Loading" + ".".repeat(dots);
      dots = (dots + 1) % 4;
    }, 300);
  }
});
