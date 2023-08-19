import sendRequest from "./send-request";
const BASE_URL = '/api/items';

export async function create(itemData) {
  return sendRequest(BASE_URL, 'POST', itemData);
}

export async function deleteById(itemId) {
  return sendRequest(`${BASE_URL}/${itemId}`, 'DELETE');
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
