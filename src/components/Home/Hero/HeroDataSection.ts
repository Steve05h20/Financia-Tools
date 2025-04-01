export const HeroDataSection = ()=>{

  const nameSection = "presentation"

  const texts ={
    title: "Découvrez de nouvelles possibilités",
    description: "Commencez à prendre le contrôle de vos finances aujourd'hui avec notre application qui suit vos dépenses, vos revenus et vos objectifs financiers.",
  }

  const images = {
    imageHero: {url: "src/components/Home/Hero/img/hero3.jpg", alt: "students"},
    imagePhone: {url: "src/components/Home/Exemple/phone.png", alt: "phone"},
  }

  return {
    nameSection,
    texts,
    images,
  }


}
