const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/eventHelper');
const Event = require('../models/event.model');
const Org = require('../../User/models/org.model');

let token = '';

beforeAll(async () => {
  await Org.deleteMany({});
  await Org.insertMany(helpers.initialOrgs);
});

beforeEach(async () => {
  await Event.deleteMany({});
  await Event.insertMany(helpers.initialEvents);

  const response = await api.post('/api/org/login').send({
    email: 'foss@gmail.com',
    password: 'foss',
  });

  token = response.body.token;
}, 10000);

describe('When there are events stored', () => {
  test('All events are returned as json', async () => {
    await api
      .get('/api/events')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('One event is returned as json', async () => {
    const response = await api.get('/api/events');
    const events = response.body;
    const event = events[0];
    await api
      .get(`/api/events/${event._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('Event can be created', async () => {
    const newEvent = {
      name: 'Test Event',
      description: 'This is a test event',
      headerImage: 'https://example.com/images/test-event-2023.jpg',
      venue: 'Test Venue',
      startTime: 1652578800,
      endTime: 1652665200,
      status: 'upcoming',
      category: 'Test',
      speakers: [],
      attendeeCount: 0,
      capacity: 800,
      tags: ['test', 'event', '2023'],
      joinLink: 'https://example.com/test-event-2023/join',
      host: 'Example Corp',
      org: 'FOSS',
      orgId: '643e5bd63fb330696881d0fc',
      attendees: [],
    };
    await api
      .post('/api/events')
      .send(newEvent)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const eventsAtEnd = await helpers.eventsInDb();
    expect(eventsAtEnd).toHaveLength(helpers.initialEvents.length + 1);
    const names = eventsAtEnd.map((event) => event.name);
    expect(names).toContain('Test Event');
  });

  test('Event will not be created if there is no authorization token', async () => {
    const newEvent = {
      name: 'Test Event',
      description: 'This is a test event',
      headerImage: 'https://example.com/images/test-event-2023.jpg',
      venue: 'Test Venue',
      startTime: 1652578800,
      endTime: 1652665200,
      status: 'upcoming',
      category: 'Test',
      speakers: [],
      attendeeCount: 0,
      capacity: 800,
      tags: ['test', 'event', '2023'],
      joinLink: 'https://example.com/test-event-2023/join',
      host: 'Example Corp',
      org: 'FOSS',
      orgId: '643e5bd63fb330696881d0fc',
      attendees: [],
    };
    await api
      .post('/api/events')
      .send(newEvent)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    const eventsAtEnd = await helpers.eventsInDb();
    expect(eventsAtEnd).toHaveLength(helpers.initialEvents.length);
    const names = eventsAtEnd.map((event) => event.name);
    expect(names).toContain('Test Event');
  });
  test('Event can be deleted', async () => {
    const response = await api.get('/api/events');
    const events = response.body;
    const event = events[0];
    await api
      .delete(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
    const eventsAtEnd = await helpers.eventsInDb();
    expect(eventsAtEnd).toHaveLength(helpers.initialEvents.length - 1);
    const names = eventsAtEnd.map((event) => event.name);
    expect(names).not.toContain(event.name);
  });
  test('Event can be updated', async () => {});
});

afterAll(() => {
  mongoose.connection.close();
});
