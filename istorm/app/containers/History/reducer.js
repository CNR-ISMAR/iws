/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import moment from "moment";
import { UPDATE_HISTORY } from './constants';

const dateFormat = "YYYY-MM-DD";

export const initialState = {
  from: moment().add(3, "days").format(dateFormat),
  to: moment().subtract(3, "days").format(dateFormat),
};

/* eslint-disable default-case, no-param-reassign */
const historyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_HISTORY:
        draft.from = action.date.from.format(dateFormat);
        draft.to = action.date.to.format(dateFormat);
        break;
    };
  });

export default historyPageReducer;
