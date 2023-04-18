const VolunteerServices = require('../services/volunteer.service');
const makeResponse = require('../utils/response');

//get all volunteers
const getVolunteers = async (req, res) => {
  const result = await VolunteerServices.getVolunteers();

  return makeResponse({
    res,
    ...result,
  });
};

//get Event Specific Volunteers
// const getEventSpecificVolunteers = async (req, res) => {
//   const opportunityID = req.params.id;
//   const opportunity = await OpportunityModel.findById(opportunityID)

//   try {
//     const volunteers = await VolunteerModel.find({
//       opportunityID: ,
//     });
//     res.json(volunteers);
//   } catch (error) {
//     res.json(error);
//   }
// };

//apply to an opportunity
const applyToAnOpportunity = async (req, res) => {
  const result = await VolunteerServices.applyToAnOpportunity(req.body);

  return makeResponse({ res, ...result });
};

//update submitted volunteer details
const updateVolunteerApplication = async (req, res) => {
  const result = await VolunteerServices.updateVolunteerApplication(
    req.params.id,
    req.body
  );

  return makeResponse({ res, ...result });
};

//delete volunteer application
const deleteVolunteerApplication = async (req, res) => {
  const result = await VolunteerServices.deleteVolunteerApplication(
    req.params.id
  );
  return makeResponse({ res, ...result });
};

module.exports = {
  applyToAnOpportunity,
  getVolunteers,
  // getEventSpecificVolunteers,
  deleteVolunteerApplication,
  updateVolunteerApplication,
};
