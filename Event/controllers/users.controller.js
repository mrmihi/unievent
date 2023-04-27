// const bcrypt = require('bcrypt');
// const User = require('../models/user.model');

// const createUser = async (request, response) => {
//   const { username, name, password } = request.body;

//   const saltRounds = 10;
//   const passwordHash = await bcrypt.hash(password, saltRounds);

//   const user = new User({
//     username,
//     name,
//     passwordHash,
//   });

//   const savedUser = await user.save();

//   response.status(201).json(savedUser);
// };

// const getAllUsers = async (request, response) => {
//   const users = await User.find({});
//   response.json(users);
// };

// module.exports = {
//   createUser,
//   getAllUsers,
// };
