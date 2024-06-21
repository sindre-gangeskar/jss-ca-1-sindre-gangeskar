function open_new_window(location) {
  window.location.href = location;
}
function visited(element) {
  var memeID = $(element).closest("tr").find("td:first-child").text();
  var visitedMemes = JSON.parse(localStorage.getItem("visitedMemes")) || {};
  visitedMemes[memeID] = true;
  localStorage.setItem("visitedMemes", JSON.stringify(visitedMemes));
}
function handleMemeDetailButtonClick() {
  var buttons = document.querySelectorAll(".details-btn");
  buttons.forEach((button) => {
    var id = parseInt(button.getAttribute("data-meme-id"));
    button.addEventListener("click", function () {
      fetch(`/meme-details/${id}`, { method: "POST" })
        .then((data) => {
          console.log(data);
          window.location.href = data.url;
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    });
  });
}
/* On ready, get visited memes in the memes overview */
$(function () {
  var visitedMemes = JSON.parse(localStorage.getItem("visitedMemes")) || {};
  Object.keys(visitedMemes).forEach((memeID) => {
    $(`tr.meme-row:has(td:contains(${memeID}))`).addClass("visited");
  });
});
