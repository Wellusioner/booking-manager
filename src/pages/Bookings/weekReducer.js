import { getWeek } from "../../utils/date-wrangler";

const weekReducer = (state, action, callback) => {
  switch(action.type){
    case 'NEXT_WEEK':
      return getWeek(state.date, 7);
    case 'PREV_WEEK':
      return getWeek(state.date, -7);
    case 'TODAY':
      return getWeek(new Date())
    case "SET_DATE":
      return getWeek(new Date(action.payload));
    default:
      return state;
  }
};

export default weekReducer;