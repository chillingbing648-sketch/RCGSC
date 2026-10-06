// Central source for site copy and media. Add confirmed club details here.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export const content = {
  club: 'Rotaract Club of Ghanshyamdas Saraf College',
  district: 'Rotaract District 3141',
  year: '2026–27',
  president: { name: 'Rtr. Ayush Thakur', role: 'President' },
  committee: [
    { name: 'Rtr. Ayush Thakur', role: 'President', image: '/images/committee-06.jpg', group: 'Executive' },
    { name: 'Rtr. Shivam Singh', role: 'Vice President', image: '/images/committee-08.jpg', group: 'Executive' },
    { name: 'Rtr. Vihang Dolas', role: 'Vice President & Professional Development Director', image: '/images/committee-14.jpg', group: 'Executive' },
    { name: 'Rtr. Manika Chavan', role: 'Secretary', image: '/images/committee-11.jpg', group: 'Executive' },
    { name: 'Rtr. Kaushal Tiwari', role: 'Treasurer', image: '/images/committee-10.jpg', group: 'Executive' },
    { name: 'Rtr. Ankitha Shetty', role: 'Joint Secretary', image: '/images/committee-04.jpg', group: 'Executive' },
    { name: 'Rtr. Sneha Bonik', role: 'Joint Secretary', image: '/images/committee-05.jpg', group: 'Executive' },
    { name: 'Rtr. Mohini Kayasth', role: 'Joint Secretary', image: '/images/committee-13.jpg', group: 'Executive' },
    { name: 'Rtr. Pragati Jaiswal', role: 'Digital Chairwoman & LGBTQ+ Director', image: '/images/committee-02.jpg', group: 'Directors & Team' },
    { name: 'Rtr. Swaranjali Ardalkar', role: 'Human Resources Development', image: '/images/committee-03.jpg', group: 'Directors & Team' },
    { name: 'Rtr. Sapna Singh', role: 'Human Resources Development', image: '/images/committee-09.jpg', group: 'Directors & Team' },
    { name: 'Rtr. Mansi Dave', role: 'Human Resources Development', image: '/images/committee-12.jpg', group: 'Directors & Team' },
    { name: 'Rtr. Rishi Ash', role: 'Sergeant at Arms', image: '/images/committee-07.jpg', group: 'Directors & Team' },
    { name: 'Rtr. Shurveer Singh', role: 'Social Media Chairman', image: '/images/committee-15.jpg', group: 'Directors & Team' },
    { name: 'Rtr. Vishal Singh', role: 'Immediate Past President', image: '/images/committee-01.jpg', group: 'Directors & Team' },
  ],
  theme: { rotary: 'Create Lasting Impact', club: 'REIGN', tagline: 'Unleash the Grace' },
  location: 'Malad West, Mumbai',
  about: 'A Rotaract club of District 3141 at Ghanshyamdas Saraf College, Malad West, Mumbai — students leading service across four avenues.',
  avenues: [
    { n: '01', title: 'Community Service', text: 'Projects that put our time and effort to work for the communities around us.', purpose: 'Respond to local needs through practical, people-first service.', hue: '#7c4dff', pos: '50% 35%', img: '/images/daanveer-citation.webp', relatedMembers: [], projects: [] },
    { n: '02', title: 'Club Service', text: 'Strengthening the club itself — its members, fellowship and the way we run.', purpose: 'Build a connected club where members can learn, contribute and belong.', hue: '#2a3cff', pos: '50% 40%', img: '/images/presidency-2025-26.webp', relatedMembers: [], projects: [] },
    { n: '03', title: 'Professional Development', text: 'Growing the skills and leadership that carry members beyond college.', purpose: 'Help members grow the confidence and skills to lead beyond college.', hue: '#d946a8', pos: '15% 30%', relatedMembers: [{ name: 'Rtr. Vihang Dolas', role: 'Professional Development Director' }], projects: [] },
    { n: '04', title: 'International Service', text: "Connecting our work with Rotaract's worldwide network of service.", purpose: 'Connect the club’s service to Rotaract’s global community.', hue: '#ff8a5b', pos: '85% 70%', relatedMembers: [], projects: [] },
  ],
  journey: [
    { year: '2025–26', label: '2025–26', title: 'Rtr. Vishal Singh, President', text: 'Rtr. Vishal Singh led the club as President, with Falak Shaikh as Secretary.', img: '/images/presidency-2025-26.webp', pos: '50% 40%', hue: '#2a3cff' },
    { year: '2026–27', label: 'REIGN', title: 'REIGN — Unleash the Grace', text: 'A new term under Rtr. Ayush Thakur, President.', img: '/images/reign-crest.webp', pos: '50% 50%', hue: '#d946a8' },
    { year: '2026–27', label: 'Daanveer', title: 'Daanveer Citation', text: 'Recognised for the club’s part in making Seva Mahotsav whole.', img: '/images/daanveer-citation.webp', pos: '50% 35%', hue: '#e3b341' },
  ],
  daanveer: { title: 'Daanveer', statement: 'With kindness in your actions and service in your soul, you played a beautiful part in making Seva Mahotsav whole.', note: 'Daanveer Citation · District Rotaract Representative 2026–27', img: '/images/daanveer-citation.webp' },
  achievements: [
    { title: 'Daanveer Citation', kind: 'Recognition', detail: 'District Rotaract Representative · 2026–27', image: '/images/daanveer-citation.webp' },
    { title: 'Seva Mahotsav', kind: 'Service highlight', detail: 'Recognised for the club’s contribution to bringing Seva Mahotsav together.', image: '/images/daanveer-citation.webp' },
  ],
  events: [],
  contact: {
    email: '',
    join: '',
    socials: [
      { label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/rcgsc/' },
      { label: 'LinkedIn', icon: 'linkedin', url: '' },
      { label: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/rcgsc.3141/' },
      { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/@RcgscOfficial' },
      { label: 'X / Twitter', icon: 'x', url: 'https://x.com/rcgsc3141' },
      { label: 'WhatsApp community', icon: 'whatsapp', url: '' },
    ],
  },
}

export const galleryCategories = [
  { id: 'events', label: 'Events' },
  { id: 'community-service', label: 'Community service' },
  { id: 'committee', label: 'Committee' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'club-moments', label: 'Club moments' },
  { id: 'recognition', label: 'Recognition' },
]

export const gallery = [
  { src: '/images/group-photo.jpeg', category: 'club-moments', size: 'feature', pos: '50% 50%', caption: 'The RCGSC community · 2026–27' },
  { src: '/images/daanveer-citation.webp', category: 'recognition', size: 'feature', pos: '50% 35%', caption: 'Daanveer Citation · 2026–27' },
  { src: '/images/presidency-2025-26.webp', category: 'committee', size: 'feature', pos: '50% 40%', caption: 'A legacy that grows stronger · 2025–26' },
  ...[
    ['Ayush Thakur', 6], ['Shivam Singh', 8], ['Vihang Dolas', 14], ['Manika Chavan', 11],
    ['Kaushal Tiwari', 10], ['Ankitha Shetty', 4], ['Sneha Bonik', 5], ['Mohini Kayasth', 13],
    ['Pragati Jaiswal', 2], ['Swaranjali Ardalkar', 3], ['Sapna Singh', 9], ['Mansi Dave', 12],
    ['Rishi Ash', 7], ['Shurveer Singh', 15], ['Vishal Singh', 1],
  ].map(([name, image]) => ({
    src: `/images/committee-${String(image).padStart(2, '0')}.jpg`,
    category: 'committee', size: 'portrait', pos: '50% 50%', caption: `Rtr. ${name} · RCGSC 2026–27`,
  })),
]
