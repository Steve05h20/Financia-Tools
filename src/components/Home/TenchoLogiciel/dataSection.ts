export const dataSection = () => {
  const nameSection = "tenchoLogiciel"

  const platformDescriptions = {
    tailwind: "Nous avons utilisé Tailwind CSS pour le styling rapide avec des classes utilitaires directement dans notre HTML, évitant le CSS personnalisé.",
    vue: "Nous avons choisi Vue.js comme framework front-end pour sa simplicité et sa réactivité, permettant de créer des composants modulaires.",
    typescript: "Nous avons implémenté TypeScript pour ajouter un typage statique, réduisant les erreurs et améliorant la maintenance du code.",
    daisyui: "Nous avons utilisé DaisyUI comme extension de Tailwind pour accélérer le développement avec ses composants prédéfinis et élégants.",
    figma: "Nous avons démarré avec Figma pour concevoir maquettes et prototypes, facilitant la visualisation de l'interface avant le développement.",
    github: "Nous avons géré les versions avec GitHub, permettant la collaboration, le suivi des modifications et l'automatisation des déploiements.",
    trello: "Nous avons organisé notre travail avec Trello en utilisant un système Kanban pour visualiser l'avancement et prioriser les tâches."
  }

  const images = {
    imageFigma: { url: "src/components/Home/TenchoLogiciel/images/figma.png", alt: "figma" },
    imageTypescript: { url: "src/components/Home/TenchoLogiciel/images/typeScript.png", alt: "typescript" },
    imageDaisyui: { url: "src/components/Home/TenchoLogiciel/images/daisyui.png", alt: "daisyui" },
    imageTrello: { url: "src/components/Home/TenchoLogiciel/images/Trello.png", alt: "trello" },
    imageTailwind: { url: "src/components/Home/TenchoLogiciel/images/tailwind-css.png", alt: "tailwind" },
    imageGithub: { url: "src/components/Home/TenchoLogiciel/images/GitHub.png", alt: "github" },
    imageVue: { url: "src/components/Home/TenchoLogiciel/images/vue.png", alt: "vue" },


  }

  return {
    platformDescriptions,
    nameSection,
    images,
  }






}
