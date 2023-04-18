const validateRequest = (event, user, errorMessage) => {
  if (!event.faculty.includes(user.faculty) && user.role != 'Admin') {
    throw {
      message: errorMessage,
    };
  }
};

module.exports = {
  validateRequest,
};
