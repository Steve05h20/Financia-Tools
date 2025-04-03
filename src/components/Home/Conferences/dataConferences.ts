export const dataConferences = {
  nameSection: 'conferences',

  texts: {
    title: 'Nos prochaines conférences',
    description:
      'Prenez en main votre portefeuille étudiant et bâtissez un avenir serein et rentable.',
  },

  images: {
    imageConferences: {
      url: new URL('@/components/Home/Conferences/conferences.jpg', import.meta.url).href,
      alt: 'Conférence étudiants',
    },
  },

  events: [
    {
      id: 1,
      title: 'Colloque de la relève en communication',
      date: '2025-02-12',
      time: '09:00',
      location: 'Université Laval',
      description: 'Le colloque de la relève en communication',
    },
    {
      id: 2,
      title: "43ᵉ colloque de l'AQUOPS",
      date: '2025-04-15',
      time: '10:00',
      location: 'Centre des congrès de Québec',
      description: "Le colloque de l'AQUOPS",
    },
    {
      id: 3,
      title: 'Sommet du numérique en éducation 2025',
      date: '2025-05-01',
      time: '14:00',
      location: 'Palais des congrès de Montréal',
      description: 'Le sommet du numérique en éducation 2025',
    },
  ],
}
