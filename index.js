const module = (function() {
  let currentCard = undefined;

  const projectsArray = [
    {
      titleText: "Line Rider Web",
      titleLink: "https://www.linerider.com",
      description: "Line Rider Web is a revision of the 2006 flash game Line Rider built for the web. I contributed highly-requested features and bugfixes.",
      thumbSrc: "assets/lrweb-thumb.png",
      thumbAlt: "",
      devIcons: [["devicon-react-original", "React"], ["devicon-materialui-plain", "MaterialUI"], ["devicon-bash-plain","Bash"]]
    },
    {
      titleText: "Line Rider Desktop",
      titleLink: "https://github.com/LunaKampling/LROverhaul",
      description: "Line Rider Desktop is another revision of Line Rider built as a Windows desktop app. I've assisted with cross-compatibility issues and feature requests.",
      thumbSrc: "assets/lra-thumb.png",
      thumbAlt: "",
      devIcons: [["devicon-csharp-plain", "C#"]]
    },
    {
      titleText: "Line Rider Web Guide",
      titleLink: "https://malizma333.github.io/line-rider-web-guide",
      description: "The Line Rider guide is a collection of articles and tutorials on Line Rider Web written by me.",
      thumbSrc: "assets/lrdocs-thumb.png",
      thumbAlt: "",
      devIcons: [["devicon-markdown-original", "Markdown"], ["devicon-jekyll-plain", "Jekyll"]]
    },
    {
      titleText: "Userscript Mods",
      titleLink: "https://github.com/Malizma333/linerider-userscript-mods",
      description: "Line Rider Web offers mod support through userscript mods, of which I've written several.",
      thumbSrc: "assets/userscript-thumb.png",
      thumbAlt: "",
      devIcons: [["devicon-javascript-plain", "JavaScript"]]
    },
    {
      titleText: "Kakuro Solver Webapp",
      titleLink: "https://kakuro-solver.vercel.app",
      description: "Kakuro is a pen-and-paper game that's best described as a hybrid of crosswords and sudoku. I made a simple puzzle solver to practice recursive backtracking and try out the NextJS framework.",
      thumbSrc: "assets/kakuro-thumb.png",
      thumbAlt: "",
      devIcons: [["devicon-nextjs-plain", "NextJS"], ["devicon-tailwindcss-original", "TailwindCSS"]]
    },
    {
      titleText: "Quantum Tic-Tac-Toe",
      titleLink: "https://malizma.itch.io/quantum-tic-tac-toe",
      description: "Quantum Tic-Tac-Toe is like classical Tic-Tac-Toe, but you can play two move states that get entangled. This was made as a final project for the Qubit x Qubit quantum computing course.",
      thumbSrc: "assets/quantum-thumb.png",
      thumbAlt: "",
      devIcons: [["devicon-unity-plain", "Unity"]]
    },
  ];

  function generateProjectCard({
    thumbAlt,
    thumbSrc,
    titleLink,
    titleText,
    description,
    devIcons
  }) {
    const icons = devIcons.map(icon => `<i class="${icon[0]}" title="${icon[1]}"></i>`).join(' ');
    return `
    <div class="project-container">
      <img alt="${thumbAlt}" src="${thumbSrc}"/>
      <button class="h-text project-thumb">${titleText}</button>
      <div class="project-content">
        <button class="p-text project-content-close">
          <i class="h-text fa fa-solid fa-xmark"></i>
        </button>
        <a class="h-text" href="${titleLink}">
          ${titleText} <sup><i class="s-text fa fa-solid fa-up-right-from-square"></i></sup>
        </a>
        <span class="h-text">${icons}</span>
        <p class="p-text">${description}</p>
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
      "click", async (e) => copyContact(e, emailContactLink, "tkbessler@gmail.com"), false
    );

    discordContactLink.addEventListener(
      "click", async (e) => copyContact(e, discordContactLink, "malizma"), false
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