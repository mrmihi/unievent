import axios from 'axios';
const baseUrl = '/api/events';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const erase = (id) => {
  const url = baseUrl + '/' + id;
  const request = axios.delete(url);
  return request.then((response) => {
    return response.status;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const eventService = { getAll, create, erase, update };
export default eventService;
