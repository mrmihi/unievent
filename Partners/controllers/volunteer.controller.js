const VolunteerServices = require('../services/volunteer.service');

//get all volunteers
const getVolunteers = async (req, res) => {
  const response = await VolunteerServices.getVolunteers();
  res.json(response);
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
  const response = await VolunteerServices.applyToAnOpportunity(req.body);
  res.json(response);
};

//update submitted volunteer details
const updateVolunteerApplication = async (req, res) => {
  // const {
  //   fullName,
  //   email,
  //   contactNo,
  //   availableTime,
  //   status,
  //   userID,
  //   opportunityID,
  // } = req.body;
  const response = await VolunteerServices.updateVolunteerApplication(
    req.params.body,
    req.id
  );
  res.json(response);
};

//delete volunteer application
const deleteVolunteerApplication = async (req, res) => {
  const response = await VolunteerServices.deleteVolunteerApplication(
    req.params.id
  );
  res.json(response);
};

module.exports = {
  applyToAnOpportunity,
  getVolunteers,
  // getEventSpecificVolunteers,
  deleteVolunteerApplication,
  updateVolunteerApplication,
};
