(function () {
  let currentCard

  const projectsArray = [
    {
      titleText: 'Keep It Together',
      description: 'Keep It Together was a cooperative, survival space game made using Godot for the 2025 Spring game jam, hosted by ACM Game. You can download an executable to play the game at [this itch.io page](https://swishyswishtail.itch.io/keep-it-together).',
      thumbSrc: 'assets/breakupgame-thumb-cropped.png',
      thumbAlt: 'Thumbnail showcasing gameplay of the Keep It Together game',
      devIcons: [['devicon-godot-plain', 'Godot']]
    },
    {
      titleText: 'Pickhacks Hackathon Website',
      description: '[Pickhacks](https://pickhacks.io) is Missouri S&T\'s annual hackathon hosted by the ACM Hack team each year. I helped develop the registration page frontend and managed deployment configuration.',
      thumbSrc: 'assets/pickhacks-thumb-cropped.png',
      thumbAlt: 'Hero page of the Pickhacks Website',
      devIcons: [['devicon-typescript-plain', 'TypeScript'], ['devicon-nextjs-plain', 'NextJS'], ['devicon-vercel-original', 'Vercel']]
    },
    {
      titleText: 'Line Rider Web',
      description: '[Line Rider Web](https://www.linerider.com) is a revision of the 2006 flash game Line Rider built for the web. I contributed highly-requested features and bugfixes.',
      thumbSrc: 'assets/lrweb-thumb-cropped.png',
      thumbAlt: 'Thumbnail for the official Line Rider website.',
      devIcons: [['devicon-javascript-plain', 'JavaScript'], ['devicon-react-original', 'React'], ['devicon-materialui-plain', 'MaterialUI'], ['devicon-bash-plain', 'Bash']]
    },
    {
      titleText: 'Line Rider Desktop',
      description: "Line Rider Desktop is another revision of Line Rider built as a Windows desktop app. I've assisted with cross-compatibility issues and feature requests. The download is publicly available at [this GitHub repository](https://github.com/LunaKampling/LROverhaul).",
      thumbSrc: 'assets/lra-thumb-cropped.png',
      thumbAlt: 'Banner for the desktop edition of Line Rider.',
      devIcons: [['devicon-csharp-plain', 'C#']]
    },
    {
      titleText: 'Line Rider Web Guide',
      description: 'The [Line Rider web guide](https://malizma333.github.io/line-rider-web-guide) is a collection of articles and tutorials oriented towards heavier users of Line Rider web.',
      thumbSrc: 'assets/lrdocs-thumb-cropped.png',
      thumbAlt: 'Screenshot of the Line Rider web guide.',
      devIcons: [['devicon-markdown-original', 'Markdown'], ['devicon-jekyll-plain', 'Jekyll']]
    },
    {
      titleText: 'Userscript Mods',
      description: "Line Rider Web offers mod support through userscripts that inject JavaScript into the site. Userscript-based mods I've developed can be found at [this docs site](https://malizma333.github.io/linerider-userscript-mods/).",
      thumbSrc: 'assets/userscript-thumb-cropped.png',
      thumbAlt: 'Screenshot of the Tampermonkey dashboard, showcasing a list of Line Rider related userscripts.',
      devIcons: [['devicon-javascript-plain', 'JavaScript'], ['devicon-typescript-plain', 'TypeScript']]
    },
    {
      titleText: 'Kakuro Solver Webapp',
      description: "Kakuro is a pen-and-paper game that's best described as a hybrid of crosswords and sudoku. I made a simple puzzle solver to practice recursive backtracking and try out the NextJS framework. [Here's the website](https://kakuro-solver.vercel.app) hosted by Vercel.",
      thumbSrc: 'assets/kakuro-thumb-cropped.png',
      thumbAlt: 'Partial screenshot of a solved kakuro board.',
      devIcons: [['devicon-typescript-plain', 'TypeScript'], ['devicon-nextjs-plain', 'NextJS'], ['devicon-tailwindcss-original', 'TailwindCSS']]
    },
    {
      titleText: 'Quantum Tic-Tac-Toe',
      description: 'Quantum Tic-Tac-Toe is like classical Tic-Tac-Toe, but you can play two move states that get entangled. This was made as a final project for the Qubit x Qubit quantum computing course. A [web-ported version of the game](https://malizma.itch.io/quantum-tic-tac-toe) is hosted on itch.io.',
      thumbSrc: 'assets/quantum-thumb-cropped.png',
      thumbAlt: 'Screenshot of a quantum tic-tac-toe board.',
      devIcons: [['devicon-unity-plain', 'Unity']]
    },
    {
      titleText: 'Rooftop Bebop',
      description: "Rooftop Bebop is a 2D survival shooter game made in 2 weeks for the DigiPen summer game development course. You can [download the game](https://games.digipen.edu/games/rooftop-bebop) in DigiPen's gallery.",
      thumbSrc: 'assets/rooftopbebop-thumb-cropped.png',
      thumbAlt: 'Screenshot of Rooftop Bebop gameplay.',
      devIcons: [['devicon-unity-plain', 'Unity']]
    }
  ]

  function generateProjectCard ({
    thumbAlt,
    thumbSrc,
    titleText,
    description,
    devIcons
  }) {
    const icons = devIcons.map(icon => `<i class="${icon[0]}" title="${icon[1]}"></i>`).join(' ')
    const newDescription = description.replace(/[[](.+?)[\]][(](.+?)[)]/, '<a href="$2">$1</a>')
    return `
    <div class="project-container">
      <img alt="${thumbAlt}" src="${thumbSrc}"/>
      <button class="h-text project-thumb">${titleText}</button>
      <div class="project-content">
        <button class="p-text project-content-close" aria-label="Close Preview">
          <svg x-bind:width="size" x-bind:height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" x-bind:stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
        <div class="project-text">
          <p class="h-text">
            ${titleText}
          </p>
          <span class="h-text">${icons}</span>
          <p class="p-text description">${newDescription}</p>
        </div>
      </div>
    </div>`
  }

  async function copyContact (event, contactRef, text) {
    event.preventDefault()
    contactRef.style.pointerEvents = 'none'
    contactRef.style.cursor = 'default'

    const copyIcon = contactRef.getElementsByClassName('copy-icon')[0]
    const copySuccessIcon = contactRef.getElementsByClassName('copy-success-icon')[0]

    const blob = new Blob([text], { type: 'text/plain' })
    const item = new window.ClipboardItem({ 'text/plain': blob })

    await navigator.clipboard.write([item])

    copyIcon.style.display = 'none'
    copySuccessIcon.style.display = 'inline'

    await new Promise(resolve => setTimeout(resolve, 500))

    copyIcon.style.display = 'inline'
    copySuccessIcon.style.display = 'none'
    contactRef.style.pointerEvents = 'all'
    contactRef.style.cursor = 'pointer'
  }

  function showCard (event, nextCard) {
    event.preventDefault()

    if (currentCard !== undefined) {
      currentCard.style.margin = '-100% 0%'
      const textContent = currentCard.querySelector('.project-text')
      if (textContent) textContent.scrollTo(0, 0)
    }

    currentCard = nextCard

    if (nextCard !== undefined) {
      currentCard.style.margin = '0% 0%'
    }
  }

  function setupLinks () {
    const emailContactLink = document.getElementById('contacts-email')
    const discordContactLink = document.getElementById('contacts-discord')

    emailContactLink.addEventListener(
      'click', async (e) => copyContact(e, emailContactLink, 'tkbessler@gmail.com'), false
    )

    discordContactLink.addEventListener(
      'click', async (e) => copyContact(e, discordContactLink, 'malizma'), false
    )
  }

  function createProjects () {
    const projectDiv = document.getElementById('projects')

    for (const projectData of projectsArray) {
      projectDiv.innerHTML += generateProjectCard(projectData)
    }

    const projectCells = document.getElementsByClassName('project-container')

    for (const project of projectCells) {
      const card = project.getElementsByClassName('project-content')[0]
      const openButton = project.getElementsByClassName('project-thumb')[0]
      const closeButton = project.getElementsByClassName('project-content-close')[0]
      openButton.addEventListener('click', (e) => showCard(e, card), false)
      closeButton.addEventListener('click', (e) => showCard(e, undefined), false)
    }
  }

  window.onload = function () {
    CanvasHelper.initCanvas()
    setupLinks()
    createProjects()
  }

  return undefined
})()
