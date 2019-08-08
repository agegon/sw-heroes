import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './actionTypes';
import { requestStarted, requestPeopleSuccess, requestFailed } from './actions';

export default function* watcher() {
  yield takeEvery(types.REQUEST_PEOPLE, fetchPeopleAsync);
}

function* fetchPeopleAsync(action) {
  try {
    yield put(requestStarted());
    const data = yield call(() => {
      return fetch(action.url)
        .then(res => res.json())
      }
    );
    yield put(requestPeopleSuccess(data));
  } catch (error) {
    yield put(requestFailed());
  }
}