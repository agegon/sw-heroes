import { call, put, all, select, takeEvery, take } from 'redux-saga/effects';
import * as types from './actionTypes';
import { isNull } from 'lodash';
import { requestPeopleStarted, requestPeopleFailed, requestPeopleSuccess, 
  requestPersonStarted, requestPersonFailed, requestPersonSuccess, 
  requestDataSuccess } from './actions';

export function* watcher() {
  yield takeEvery(types.REQUEST_PEOPLE, fetchPeopleAsync);
  yield takeEvery(types.REQUEST_PERSON, fetchPersonAsync);
}

function* fetchPeopleAsync(action) {
  try {
    yield put(requestPeopleStarted());
    const data = yield call(fetchData, action.url);
    yield put(requestPeopleSuccess(data));
  } catch (error) {
    //console.log(error);
    yield put(requestPeopleFailed());
  }
}

function* fetchPersonAsync(action) {
  const url = `https://swapi.dev/api/people/${action.id}/`;
  let person = yield select(getPerson, url);
  try {
    yield put(requestPersonStarted());
    if (isNull(person)) {
      person = yield call(fetchData, url);
    }
    yield put(requestPersonSuccess(person));
  } catch (error) {
    //console.log(error);
    yield put(requestPersonFailed());
  }
}

export function* watchData() {
  while (true) {
    const action = yield take(types.REQUEST_DATA);
    const urls = yield select(filterUrls, action.urls, action.cache);
    yield call(fetchDataAsync, urls, action.cache);
  }
}

function* fetchDataAsync(urls, cache) {
  if (urls.length !== 0) {
    try {
      yield put(requestPersonStarted());
      const data = yield all(
        urls.map(u => call(fetchData, u))
      );
      yield put(requestDataSuccess(data, cache));
    } catch (error) {
      console.log(error);
      yield put(requestPersonFailed());
    }
  }
}

const filterUrls = (state, urls, cache) => {
  const urlsInState = state[cache].map(item => item.url);
  return urls.filter(url => urlsInState.indexOf(url) === -1);
}

const getPerson = (state, url) => 
  (state.peopleCache.filter(i => i.url === url)[0] || null);

const fetchData = url => {
  return fetch(url).then(res => res.json());
}
