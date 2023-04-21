// const bcrypt = require('bcrypt');
// const User = require('../models/user.model');
// const helper = require('../helpers/userHelper');
// const supertest = require('supertest');
// const app = require('../../app');
// const api = supertest(app);

// describe('when there is initially one user in db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const passwordHash = await bcrypt.hash('sekret', 10);
//     const user = new User({ username: 'root', name: 'admin', passwordHash });

//     await user.save();
//   });

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newUser = {
//       username: 'mrmihi',
//       name: 'Dinal',
//       password: 'password',
//     };

//     await api
//       .post('/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

//     const usernames = usersAtEnd.map((u) => u.username);
//     expect(usernames).toContain(newUser.username);
//   });

//   test('creation fails with proper statuscode and message if username already taken', async () => {
//     const usersAtStart = await helper.usersInDb();
//     const newUser = {
//       username: 'mrmihi',
//       name: 'Pasindu',
//       password: 'password',
//     };

//     await api.post('/users').send(newUser);
//     await api
//       .post('/users')
//       .send(newUser)
//       .expect(400)
//       .expect('Content-Type', /application\/json/);

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length);
//   });
// });
