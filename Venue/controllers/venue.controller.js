const createVenue = async (req, res) => {
  const result = await creatAVenue(req.body);
};

module.exports = {
  createVenue,
};
