import * as types from './actionTypes';
import { get, isNull } from 'lodash';

const initialState = {
  nextPage: 'https://swapi.co/api/people/',
  peopleCount: null,
  peopleCache: [],
  planetsCache: [],
  filmsCache: [],
  speciesCache: [],
  vehiclesCache: [],
  starshipsCache: [],
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

  const receivedData = get(data, 'results', [])
    .map(item => {
      item.id = getId(item.url)
      return item;
    });

  const peopleCache = [ 
    ...state.peopleCache,
    ...receivedData
  ];

  const newState = {
    ...state,
    nextPage: get(data, 'next'),
    peopleCount: get(data, 'count'),
    peopleCache,
    peopleStatus: { loading: false, error: false },
  };
  return newState;
}

const getId = url => {
  const regId = /(?<=\/)\d+(?=\/?$)/;
  const id = url.match(regId);
  return isNull(id) ? Date.now() : id[0];
}
