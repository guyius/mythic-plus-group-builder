import { put, takeLatest, all } from 'redux-saga/effects';

import { get } from '../../utils/http'
import { getPlayerFailed, getPlayerSucceed} from './actions';

function* playerSaga(action) {
  const { id, region } = action.selected;
  try {
    const { data } = yield get(`/api/character/${id}/${region}`);
    yield put(getPlayerSucceed(data));
  } catch (e) {
    yield put(getPlayerFailed(e.message));
  }
}

function* actionWatcher() {
  yield takeLatest('GET_PLAYER', playerSaga)
}

export default function* playerRootSaga() {
  yield all([actionWatcher()]);
}