import * as types from './actionTypes';

// Action creators for requests to people list
export const requestPeopleStarted = () => {
  return { type: types.REQUEST_PEOPLE_STARTED }
};

export const requestPeopleFailed = () => {
  return { type: types.REQUEST_PEOPLE_FAILED }
};

export const requestPeopleSuccess = (data) => {
  return { type: types.REQUEST_PEOPLE_SUCCESS, data }
};

export const fetchPeople = (url) => {
  return { type: types.REQUEST_PEOPLE, url }
};

// Action creators for requests to person info
export const requestPersonStarted = () => {
  return { type: types.REQUEST_PERSON_STARTED }
};

export const requestPersonFailed = () => {
  return { type: types.REQUEST_PERSON_FAILED }
};

export const requestPersonSuccess = (person) => {
  return { type: types.REQUEST_PERSON_SUCCESS, person }
};

export const fetchPerson = (id) => {
  return { type: types.REQUEST_PERSON, id }
};

// Action creators for requests with data for person
export const requestDataSuccess = (data, cache) => {
  return { type: types.REQUEST_DATA_SUCCESS, data, cache }
};

export const fetchData = (urls, cache) => {
  return { type: types.REQUEST_DATA, urls, cache }
};
