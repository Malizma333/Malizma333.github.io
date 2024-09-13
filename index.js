async function copyEvent(event, contactRef, text) {
  event.preventDefault();

  const copyIcon = contactRef.getElementsByClassName("fa-copy")[0];
  
  var blob = new Blob([text], {type: 'text/plain'});
  var item = new ClipboardItem({'text/plain': blob});
  await navigator.clipboard.write([item]);

  copyIcon.classList.add("fa-check");
  contactRef.style.pointerEvents = "none";
  contactRef.style.cursor = "default";

  setTimeout(() => {
    copyIcon.classList.remove("fa-check");
    contactRef.style.pointerEvents = "all";
    contactRef.style.cursor = "pointer";
  }, 500);
}

window.onload = function() {
  const emailContactLink = document.getElementById("contacts-email");
  const discordContactLink = document.getElementById("contacts-discord");
  
  emailContactLink.addEventListener(
    "click",
    async (e) => copyEvent(e, emailContactLink, "tkbessler@gmail.com"),
    false
  );

  discordContactLink.addEventListener(
    "click",
    async (e) => copyEvent(e, discordContactLink, "malizma"),
    false
  );
}