import * as types from './actionTypes';

const initialState = {
  nextPage: 'https://swapi.co/api/people/',
  peopleCache: {},
  planetsCache: {},
  filmsCache: {},
  speciesCache: {},
  vehiclesCache: {},
  starshipsCache: {},
  loading: false,
  error: false,
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_STARTED: 
      return { loading: true, error: false, ...state };
    case types.REQUEST_FAILED: 
      return { loading: false, error: true, ...state };
    case types.REQUEST_PEOPLE_SUCCESS: 
      return setPeopleToState(state, action.data);
    default:
      return state;
  }
};

export default reducer;

const setPeopleToState = (state, data) => {
  const newState = { loading: false, error: false, ...state };
  newState.nextPage = data.next;
  const newPeopleCache = { ...newState.peopleCache };
  data.results.forEach(e => {
    newPeopleCache[e.url] = e;
  });
  newState.peopleCache = newPeopleCache;
  return newState;
}