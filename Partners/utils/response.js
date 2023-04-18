const makeResponse = ({ res, status, data, message }) => {
  const responseData = { data, message };
  if (!data) delete responseData.data;
  console.log(status);
  res.status(status).json(responseData);
};

module.exports = makeResponse;
