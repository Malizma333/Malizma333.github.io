let currentCard = undefined;

async function copyContact(event, contactRef, text) {
  event.preventDefault();
  const copyIcon = contactRef.getElementsByClassName("fa-copy")[0];

  var blob = new Blob([text], { type: "text/plain" });
  var item = new ClipboardItem({ "text/plain": blob });

  await navigator.clipboard.write([item]);

  copyIcon.classList.add("fa-check");
  contactRef.style.pointerEvents = "none";
  contactRef.style.cursor = "default";

  await new Promise(_ => setTimeout(_, 500));

  copyIcon.classList.remove("fa-check");
  contactRef.style.pointerEvents = "all";
  contactRef.style.cursor = "pointer";
}

function showCard(event, nextCard) {
  event.preventDefault();

  if(currentCard !== undefined) {
    currentCard.style.margin = "-100% 0%";
  }

  currentCard = nextCard;

  if(nextCard !== undefined) {
    currentCard.style.margin = "0% 0%";
  }
}

window.onload = function() {
  const emailContactLink = document.getElementById("contacts-email");
  const discordContactLink = document.getElementById("contacts-discord");
  
  emailContactLink.addEventListener(
    "click",
    async (e) => copyContact(e, emailContactLink, "tkbessler@gmail.com"),
    false
  );

  discordContactLink.addEventListener(
    "click",
    async (e) => copyContact(e, discordContactLink, "malizma"),
    false
  );

  const projectCells = document.getElementsByClassName("project-cell");

  for(const project of projectCells) {
    const card = project.getElementsByClassName("project-card")[0];
    const openButton = project.getElementsByClassName("project-thumb")[0];
    const closeButton = project.getElementsByClassName("project-card-close")[0];
    openButton.addEventListener("click", (e) => showCard(e, card), false);
    closeButton.addEventListener("click", (e) => showCard(e, undefined), false);
  }
}