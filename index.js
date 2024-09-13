const module = (function() {
  let currentCard = undefined;

  const projectsArray = [
    {
      titleText: "Line Rider Web",
      titleLink: "https://www.linerider.com",
      description: "Description3",
      thumbText: "Line Rider Web",
      thumbSrc: "assets/lrweb-banner.png",
      thumbAlt: "Line rider web card preview",
      devIcons: [["devicon-react-original", "React"], ["devicon-materialui-plain", "MaterialUI"], ["devicon-bash-plain","Bash"]]
    },
    {
      titleText: "Line Rider Desktop",
      titleLink: "https://github.com/LunaKampling/LROverhaul",
      description: "Description2",
      thumbText: "Line Rider Desktop",
      thumbSrc: "assets/lra-banner.png",
      thumbAlt: "Line rider advanced card preview",
      devIcons: [["devicon-csharp-plain", "C#"]]
    },
    {
      titleText: "Line Rider Web Guide",
      titleLink: "https://malizma333.github.io/line-rider-web-guide",
      description: "Description1",
      thumbText: "Line Rider Documentation",
      thumbSrc: "assets/lrdocs-thumb.png",
      thumbAlt: "Line rider documentation card preview",
      devIcons: [["devicon-markdown-original", "Markdown"], ["devicon-jekyll-plain", "Jekyll"]]
    },
  ];

  function generateProjectCard({
    thumbAlt,
    thumbSrc,
    thumbText,
    titleLink,
    titleText,
    description,
    devIcons
  }) {
    const icons = devIcons.map(icon => `<i class="${icon[0]}" title="${icon[1]}"></i>`).join(' ');
    return `
    <div class="project-container">
      <img alt="${thumbAlt}" src="${thumbSrc}"/>
      <a class="project-thumb">${thumbText}</a>
      <div class="project-content">
        <button class="project-content-close">
          <i class="fa fa-solid fa-xmark"></i>
        </button>
        <a href="${titleLink}">
          <h1>${titleText}
            <i class="fa fa-solid fa-up-right-from-square"></i>
          </h1>
        </a>
        <span>${icons}</span>
        <p>${description}</p>
      </div>
    </div>`;
  }

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

    const projectDiv = document.getElementById("projects");
    for(const projectData of projectsArray) {
      projectDiv.innerHTML += generateProjectCard(projectData);
    }

    const projectCells = document.getElementsByClassName("project-container");

    for(const project of projectCells) {
      const card = project.getElementsByClassName("project-content")[0];
      const openButton = project.getElementsByClassName("project-thumb")[0];
      const closeButton = project.getElementsByClassName("project-content-close")[0];
      openButton.addEventListener("click", (e) => showCard(e, card), false);
      closeButton.addEventListener("click", (e) => showCard(e, undefined), false);
    }
  }
  return undefined;
})();