const Event = require('../models/event.model');

const initialEvents = [
  {
    name: 'New User Test',
    description: 'A conference showcasing the latest technology trends',
    headerImage: 'https://example.com/images/tech-conference-2023.jpg',
    venue: 'San Francisco Convention Center',
    startTime: 1646461200,
    endTime: 1646547600,
    status: 'upcoming',
    category: 'Technology',
    speakers: [],
    attendeeCount: 0,
    capacity: 1000,
    tags: ['technology', 'conference', '2023'],
    joinLink: 'https://example.com/tech-conference-2023/join',
    host: 'Example Corp',
    org: 'FOSS',
    orgId: '643e5bd63fb330696881d0fc',
    _id: '643e6ca96030148f194b771d',
    attendees: [],
    createdAt: '2023-04-18T10:10:49.025Z',
    updatedAt: '2023-04-18T10:10:49.025Z',
    __v: 0,
  },
  {
    _id: '643e6ca96030148f194b771e',
    name: 'Marketing Summit',
    description: 'A summit discussing the latest marketing strategies',
    headerImage: 'https://example.com/images/marketing-summit-2023.jpg',
    venue: 'New York City Convention Center',
    startTime: 1650860400,
    endTime: 1650946800,
    status: 'upcoming',
    category: 'Marketing',
    speakers: [],
    attendeeCount: 0,
    capacity: 1500,
    tags: ['marketing', 'summit', '2023'],
    joinLink: 'https://example.com/marketing-summit-2023/join',
    host: 'Example Corp',
    org: 'FOSS',
    orgId: '643e5bd63fb330696881d0fc',
    attendees: [],
    createdAt: '2023-04-18T10:20:12.051Z',
    updatedAt: '2023-04-18T10:20:12.051Z',
    __v: 0,
  },
  {
    _id: '643e6ca96030148f194b771f',

    name: 'Green Energy Conference',
    description: 'A conference discussing sustainable energy solutions',
    headerImage: 'https://example.com/images/green-energy-conference-2023.jpg',
    venue: 'Moscone Center, San Francisco',
    startTime: 1652578800,
    endTime: 1652665200,
    status: 'upcoming',
    category: 'Energy',
    speakers: [],
    attendeeCount: 0,
    capacity: 800,
    tags: ['energy', 'conference', '2023'],
    joinLink: 'https://example.com/green-energy-conference-2023/join',
    host: 'Example Corp',
    org: 'FOSS',
    orgId: '643e5bd63fb330696881d0fc',
    attendees: [],
    createdAt: '2023-04-18T10:30:18.015Z',
    updatedAt: '2023-04-18T10:30:18.015Z',
    __v: 0,
  },
];

const initialOrgs = [
  {
    email: 'foss@gmail.com',
    name: 'FOSS',
    password: '$2b$10$c0ufKBmSnzsAzemnKDJNKuW0dMdwfFmXjgAicRAj2rr.xGRnOxpF.',
    mobile: '119',
    website: 'foss.com',
  },
];

const eventsInDb = async () => {
  const events = await Event.find({});
  return events.map((event) => event.toJSON());
};

module.exports = {
  initialEvents,
  eventsInDb,
  initialOrgs,
};
