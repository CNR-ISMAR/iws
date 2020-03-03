import { takeLatest, call, put, select } from 'redux-saga/effects';
import { REQUEST_TIMELINE, UPDATE_HISTORY } from './constants';
import makeSelectHistory from './selectors';
import { successTimeline, errorTimeline } from './actions';
import { requestTimelineData } from 'utils/api';
import { push } from 'connected-react-router';

export function* getTimelineSaga(action) {
  const timelineOption = {
    method: 'get',
    //body: {}
  };
  let from = action.request ? action.request.from.toISOString() : null;
  let to = action.request ? action.request.to.toISOString() : null;
  try {
    const request = yield call(requestTimelineData, timelineOption, from, to);
    yield put(successTimeline(request));
    if(typeof action.redirect !== "undefined") {
      action.redirect("/");
    }
  } catch(e) {
    yield put(errorTimeline(e.message));
  }
}
export function* updateHistorySaga(action) {
    yield put(push("/"));
}

// Individual exports for testing
export default function* historySaga(action) {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_TIMELINE, getTimelineSaga);
  yield takeLatest(UPDATE_HISTORY, updateHistorySaga);
}
