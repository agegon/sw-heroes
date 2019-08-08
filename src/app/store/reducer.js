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
      return { ...state, loading: true, error: false };
    case types.REQUEST_FAILED: 
      return { ...state, loading: false, error: true };
    case types.REQUEST_PEOPLE_SUCCESS:
      return setPeopleToState(state, action.data);
    default:
      return state;
  }
};

export default reducer;

const setPeopleToState = (state, data) => {
  const peopleCache = { ...state.peopleCache };
  data.results.forEach(e => {
    peopleCache[e.url] = e;
  });

  const newState = {
    ...state,
    loading: false, 
    error: false,
    nextPage: data.next,
    peopleCache: peopleCache,
  };

  return newState;
}