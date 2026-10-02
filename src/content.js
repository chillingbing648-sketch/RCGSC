const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export { asset }

// Single source of copy. Items marked TODO are NOT verified from the original site —
// replace them with the real text/images from the existing HTML.
export const content = {
  club: 'Rotaract Club of Ghanshyamdas Saraf College',
  district: 'Rotaract District 3141',
  year: '2026–27',
  president: { name: 'Rtr. Ayush Thakur', role: 'President' },
  theme: { rotary: 'Create Lasting Impact', club: 'REIGN', tagline: 'Unleash the Grace' },
  location: 'Malad West, Mumbai',
  about: 'A Rotaract club of District 3141 at Ghanshyamdas Saraf College, Malad West, Mumbai — students leading service across four avenues.',
  avenues: [
    { n: '01', title: 'Community Service', text: 'Projects that put our time and effort to work for the communities around us.', hue: '#7c4dff', pos: '50% 35%', img: asset('/images/daanveer-citation.webp') },
    { n: '02', title: 'Club Service', text: 'Strengthening the club itself — its members, fellowship and the way we run.', hue: '#2a3cff', pos: '50% 40%', img: asset('/images/presidency-2025-26.webp') },
    { n: '03', title: 'Professional Development', text: 'Growing the skills and leadership that carry members beyond college.', hue: '#d946a8', pos: '15% 30%' },
    { n: '04', title: 'International Service', text: "Connecting our work with Rotaract's worldwide network of service.", hue: '#ff8a5b', pos: '85% 70%' },
  ],
  journey: [
    { year: '2025–26', label: '2025–26', title: 'Rtr. Vishal Singh, President', text: 'Rtr. Vishal Singh led the club as President, with Falak Shaikh as Secretary.', img: asset('/images/presidency-2025-26.webp'), pos: '50% 40%', hue: '#2a3cff' },
    { year: '2026–27', label: 'REIGN', title: 'REIGN — Unleash the Grace', text: 'A new term under Rtr. Ayush Thakur, President.', img: asset('/images/reign-crest.webp'), pos: '50% 50%', hue: '#d946a8' },
    { year: '2026–27', label: 'Daanveer', title: 'Daanveer Citation', text: 'Recognised for the club’s part in making Seva Mahotsav whole.', img: asset('/images/daanveer-citation.webp'), pos: '50% 35%', hue: '#e3b341' },
  ],
  daanveer: { title: 'Daanveer', statement: 'With kindness in your actions and service in your soul, you played a beautiful part in making Seva Mahotsav whole.', note: 'Daanveer Citation · District Rotaract Representative 2026–27', img: asset('/images/daanveer-citation.webp') },
  events: [],
  contact: { email: '', instagram: '', linkedin: '', join: '' },
}

export const gallery = [
  { src: asset('/images/group-photo.jpeg'), size: 'xl', pos: '50% 50%', zoom: 1, caption: 'RCGSC · 2026–27' },
  { src: asset('/images/group-photo.jpeg'), size: 'tall', pos: '12% 60%', zoom: 1.9, caption: 'RCGSC · 2026–27' },
  { src: asset('/images/group-photo.jpeg'), size: 'sq', pos: '85% 70%', zoom: 1.8, caption: 'RCGSC · 2026–27' },
  { src: asset('/images/group-photo.jpeg'), size: 'wide', pos: '50% 30%', zoom: 1.4, caption: 'RCGSC · 2026–27' },
  { src: asset('/images/group-photo.jpeg'), size: 'tall', pos: '55% 80%', zoom: 1.8, caption: 'RCGSC · 2026–27' },
  { src: asset('/images/group-photo.jpeg'), size: 'sq', pos: '30% 25%', zoom: 1.7, caption: 'RCGSC · 2026–27' },
]
