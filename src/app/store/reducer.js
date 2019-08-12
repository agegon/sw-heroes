import * as types from './actionTypes';
import { isNull } from 'util';

const initialState = {
  nextPage: 'https://swapi.co/api/people/',
  peopleCache: {},
  planetsCache: {},
  filmsCache: {},
  speciesCache: {},
  vehiclesCache: {},
  starshipsCache: {},
  peopleStatus: { loading: true, error: false },
  personStatus: { loading: true, error: false },
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PEOPLE_STARTED: 
      return { 
        ...state, 
        peopleStatus: { loading: true, error: false  },
      };
    case types.REQUEST_PEOPLE_FAILED: 
      return { 
        ...state, 
        peopleStatus: { loading: false, error: true  },
      };
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
    peopleCache[getId(e.url)] = e;
  });

  const newState = {
    ...state,
    peopleStatus: { loading: false, error: false },
    nextPage: data.next,
    peopleCache
  };

  return newState;
}

const getId = url => {
  const regId = /(?<=\/)\d+(?=\/?$)/;
  const id = url.match(regId);
  return isNull(id) ? Date.now() : id[0];
}
