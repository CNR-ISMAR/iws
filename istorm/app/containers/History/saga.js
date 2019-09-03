import { takeLatest, call, put, select } from 'redux-saga/effects';
import { REQUEST_TIMELINE } from './constants';
import { successTimeline, errorTimeline } from './actions';

import { requestTimelineData } from 'utils/api';

export function* getTimelineSaga(action) {
  // See example in containers/HomePage/saga.js
  const timelineOption = { 
    method: 'get',
    //body: {}
  };
  try {
    const request = yield call(requestTimelineData, timelineOption);
    yield put(successTimeline(request));
    if(typeof action.redirect !== "undefined") {
      action.redirect("/");
    }
  } catch(e) {
    yield put(errorTimeline(e.message));
  }
}

// Individual exports for testing
export default function* historySaga(action) {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_TIMELINE, getTimelineSaga);
}
