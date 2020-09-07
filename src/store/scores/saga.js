import { put, takeLatest, all } from 'redux-saga/effects';

import { httpPut } from '../../utils/http'
import { scoreSucceed, scoreFailed} from './actions';

function* scoreSaga(action) {
  const { score } = action;
  try {
    const { data } = yield httpPut('/api/update-scores', score, );
    yield put (scoreSucceed(data));
  } catch (e) {
    yield put (scoreFailed(e.message));
  }
}

function* actionWatcher() {
  yield takeLatest('SET_SCORE', scoreSaga)
}

export default function* searchRootSaga() {
  yield all([actionWatcher()]);
}