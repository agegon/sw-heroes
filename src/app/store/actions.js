import * as types from './actionTypes';

export const requestStarted = () => {
  return { type: types.REQUEST_STARTED }
};

export const requestFailed = () => {
  return { type: types.REQUEST_FAILED }
};

export const requestPeopleSuccess = (data) => {
  return { type: types.REQUEST_PEOPLE_SUCCESS, data }
};

export const requestPersonSuccess = (data) => {
  return { type: types.REQUEST_PEOPLE_SUCCESS, data }
};

export const fetchPeople = (url) => {
  return { type: types.REQUEST_PEOPLE, url }
};

export const fetchPerson = () => {
  return { type: types.REQUEST_PERSON }
};