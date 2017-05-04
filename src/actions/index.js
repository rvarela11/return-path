import api from '../../JSON/mock_rp_data.json';
import axios from 'axios';

export const GET_API = 'GET_API';
export const GET_DROPDOWNS_API = 'GET_DROPDOWNS_API';
export const NEW_API = 'NEW_API';

export function API () {
  return {
    type: GET_API,
    payload: api
  }
}

export function dropdownsAPI () {
  return {
    type: GET_DROPDOWNS_API,
    payload: api
  }
}

export function newAPI (data) {
  return {
    type: NEW_API,
    payload: data
  }
}
