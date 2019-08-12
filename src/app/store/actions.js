import * as types from './actionTypes';

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

export const fetchPerson = (id) => {
  return { type: types.REQUEST_PERSON, id }
};
