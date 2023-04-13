const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there are events stored', () => {
  test('events are returned as json', async () => {
    await api
      .get('/events')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
