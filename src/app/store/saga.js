import { call, put, all, select, takeEvery } from 'redux-saga/effects';
import * as types from './actionTypes';
import { requestPeopleStarted, requestPeopleFailed, requestPeopleSuccess } from './actions';

export default function* watcher() {
  yield takeEvery(types.REQUEST_PEOPLE, fetchPeopleAsync);
}

function* fetchPeopleAsync(action) {
  try {
    yield put(requestPeopleStarted());
    const data = yield call(fetchData, action.url);
    yield put(requestPeopleSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(requestPeopleFailed());
  }
}

const fetchData = url => {
  return fetch(url).then(res => res.json());
}
