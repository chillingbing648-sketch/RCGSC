export const routes = [
  { path: '/', label: 'Home', title: 'RCGSC — Rotaract Club of Ghanshyamdas Saraf College', description: 'Meet RCGSC, the Rotaract Club of Ghanshyamdas Saraf College, and discover a year of student-led service in Malad West, Mumbai.' },
  { path: '/committee', label: 'Committee', summary: 'The people behind the work.', title: 'Committee 2026–27 — RCGSC', description: 'Meet the RCGSC committee for 2026–27: REIGN, Unleash the Grace.' },
  { path: '/avenues', label: 'Avenues', summary: 'Four ways to put service into motion.', title: 'Avenues of Service — RCGSC', description: 'Explore the four avenues through which RCGSC serves its community and develops its members.' },
  { path: '/journey', label: 'Journey', summary: 'The years and people that brought us here.', title: 'Our Journey — RCGSC', description: 'Trace the leadership, themes, and milestones that shape the RCGSC story.' },
  { path: '/achievements', label: 'Achievements', summary: 'Recognition earned through service.', title: 'Achievements — RCGSC', description: 'Read about RCGSC recognition and service highlights, including the Daanveer Citation.' },
  { path: '/gallery', label: 'Gallery', summary: 'A closer look at the club.', title: 'Gallery — RCGSC', description: 'Browse RCGSC committee portraits, club moments, and recognition.' },
  { path: '/join', label: 'Join us', summary: 'Find your place in RCGSC.', title: 'Join RCGSC — Rotaract Club of Ghanshyamdas Saraf College', description: 'Find your place in the Rotaract Club of Ghanshyamdas Saraf College.' },
]

export const pageForPath = (path) => routes.find((page) => page.path === path)
