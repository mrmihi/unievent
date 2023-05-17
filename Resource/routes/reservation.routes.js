const express = require('express');

const {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationByResourceId,
  getReservationByOrganizerId,
  updateReservationById,
  deleteReservationById,
  getReservationByResourceManagerId,
  getReservationByResourceManagerIdPending,
  getReservationByEventId,
} = require('../controllers/reservation.controller');

const ReservationRouter = express.Router();

ReservationRouter.post('/', createReservation);
ReservationRouter.get('/', getAllReservations);
ReservationRouter.get('/:id', getReservationById);
ReservationRouter.get('/resource/:id', getReservationByResourceId);
ReservationRouter.get('/organizer/:id', getReservationByOrganizerId);
ReservationRouter.put('/:id', updateReservationById);
ReservationRouter.delete('/:id', deleteReservationById);
ReservationRouter.get('/manager/:id', getReservationByResourceManagerId);
ReservationRouter.get(
  '/manager/:id/pending',
  getReservationByResourceManagerIdPending
);
ReservationRouter.get('/event/:id', getReservationByEventId);

module.exports = ReservationRouter;
