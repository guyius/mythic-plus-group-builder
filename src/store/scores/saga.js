import { put, takeLatest, all } from 'redux-saga/effects';

import { post } from '../../utils/http'
import { scoreSucceed, scoreFailed} from './actions';

function* scoreSaga(action) {
  const { level, player, newScore } = action;
  try {
    const { data } = yield post('/api/update-scores', {level, player, score: newScore});
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