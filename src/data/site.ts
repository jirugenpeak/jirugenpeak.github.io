type Contact = {
  label: string
  url: string | null
}

type Site = {
  name: string
  descriptor: string[]
  intro: { work: string; employer: string; employerUrl: string; about: string }
  resumeUrl: string | null
  contacts: Contact[]
}

export const site: Site = {
  name: 'Aditya Sharma',
  descriptor: ['Software Engineer', 'Data Engineering', 'Backend Systems'],
  intro: {
    work: 'I build data pipelines and backend systems as a Data Engineering Intern at',
    employer: 'ShyftLabs',
    employerUrl: 'https://www.shyftlabs.io/',
    about: 'I’m learning systems engineering and distributed infrastructure. I love watching football.',
  },
  resumeUrl: null,
  contacts: [
    { label: 'GitHub', url: null },
    { label: 'LinkedIn', url: null },
    { label: 'Email', url: null },
  ],
}
