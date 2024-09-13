function copyText(text) {
  var blob = new Blob([text], {type: 'text/plain'});
  var item = new ClipboardItem({'text/plain': blob});
  navigator.clipboard.write([item]);
}

window.onload = function() {
  const emailContactLink = document.getElementById("contacts-email");
  const discordContactLink = document.getElementById("contacts-discord");
  
  emailContactLink.addEventListener("click", async (e) => {
    e.preventDefault();
    copyText("tkbessler@gmail.com");
  }, false);

  discordContactLink.addEventListener("click", async (e) => {
    e.preventDefault();
    copyText("malizma");
  }, false);
}