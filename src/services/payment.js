import api from './api';

export const buyTicket = async (concertId, data) =>
  api.put(`/ticket/buyTicket/${concertId}`, data);
