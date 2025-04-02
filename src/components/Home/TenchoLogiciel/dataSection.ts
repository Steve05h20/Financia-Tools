export const dataSection = () => {
  const nameSection = "tenchoLogiciel"

  const platformDescriptions = {
    tailwind: "On a utilisé Tailwind CSS pour le styling rapide avec des classes utilitaires directement dans notre HTML, évitant le CSS personnalisé.",
    vue: "On a choisi Vue.js comme framework front-end pour sa simplicité et sa réactivité, permettant de créer des composants modulaires.",
    typescript: "On a implémenté TypeScript pour ajouter un typage statique, réduisant les erreurs et améliorant la maintenance du code.",
    daisyui: "On a utilisé DaisyUI comme extension de Tailwind pour accélérer le développement avec ses composants prédéfinis et élégants.",
    figma: "On a démarré avec Figma pour concevoir maquettes et prototypes, facilitant la visualisation de l'interface avant le développement.",
    github: "On a géré les versions avec GitHub, permettant la collaboration, le suivi des modifications et l'automatisation des déploiements.",
    trello: "On a organisé notre travail avec Trello en utilisant un système Kanban pour visualiser l'avancement et prioriser les tâches."
  }

  const images = {
    imageDaisyui: { url: "src/components/Home/TenchoLogiciel/images/daisyui.png", alt: "daisyui" },
    imageFigma: { url: "src/components/Home/TenchoLogiciel/images/figma.png", alt: "figma" },
    imageTailwind: { url: "src/components/Home/TenchoLogiciel/images/tailwind-css.png", alt: "tailwind" },
    imageTypescript: { url: "src/components/Home/TenchoLogiciel/images/typeScript.png", alt: "typescript" },
    imageVue: { url: "src/components/Home/TenchoLogiciel/images/vue.png", alt: "vue" },
    imageTrello: { url: "src/components/Home/TenchoLogiciel/images/Trello.png", alt: "trello" },
    imageGithub: { url: "src/components/Home/TenchoLogiciel/images/GitHub.png", alt: "github" },


  }

  return {
    platformDescriptions,
    nameSection,
    images,
  }






}
