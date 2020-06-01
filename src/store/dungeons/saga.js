/*import { put, takeLatest, all } from 'redux-saga/effects';

import { get } from '../../utils/http'
import { searchSucceed, searchFailed} from './actions';

function* searchSaga(action) {
  const { query } = action;
  try {
    const { data } = yield get(`/api/search?query=${query}`);
    yield put (searchSucceed(data));
  } catch (e) {
    yield put (searchFailed(e.message));
  }
}

function* actionWatcher() {
  yield takeLatest('DO_SEARCH', searchSaga)
}

export default function* searchRootSaga() {
  yield all([actionWatcher()]);
}*/