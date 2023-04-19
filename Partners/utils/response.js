const makeResponse = ({ res, status, data, message }) => {
  const responseData = { data, message };
  if (!data) delete responseData.data;
  res.status(status).json(responseData);
};

module.exports = makeResponse;
