import * as types from './actionTypes';
import { isNull } from 'lodash';

const initialState = {
  nextPage: 'https://swapi.co/api/people/',
  peopleCount: 10,
  peopleIdList: [],
  peopleCache: {},
  planetsCache: {},
  filmsCache: {},
  speciesCache: {},
  vehiclesCache: {},
  starshipsCache: {},
  peopleStatus: { loading: false, error: false },
  personStatus: { loading: false, error: false },
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
  const peopleIdList = [ ...state.peopleIdList ];
  data.results.forEach(e => {
    const id = getId(e.url);
    if (peopleIdList.indexOf(id) === -1) {
      peopleCache[id] = e;
      peopleIdList.push(id);
    }
  });

  const newState = {
    ...state,
    peopleStatus: { loading: false, error: false },
    nextPage: data.next,
    peopleCache,
    peopleIdList,
    peopleCount: data.count
  };

  return newState;
}

const getId = url => {
  const regId = /(?<=\/)\d+(?=\/?$)/;
  const id = url.match(regId);
  return isNull(id) ? Date.now() : id[0];
}
