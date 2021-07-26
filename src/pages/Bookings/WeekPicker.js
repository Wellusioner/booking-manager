import { useReducer } from 'react';
import { getWeek } from '../../utils/date-wrangler';
import reducer from './weekReducer';
import {FaChevronLeft, FaCalendarDay, FaChevronRight} from "react-icons/fa";

const WeekPicker = ({ date}) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({type: 'PREV_WEEK'})}
        >
          <FaChevronLeft />
          Previous
        </button>
        <button
          className="btn"
          onClick={() => dispatch({type: 'TODAY'})}
        >
          <FaCalendarDay />
          Today
        </button>
        <button
          className="btn"
          onClick={() => dispatch({type: 'NEXT_WEEK'})}
        >
          Next
          <FaChevronRight />
        </button>
      </p>
      <p>
        { week.start.toDateString() } - { week.end.toDateString() }
      </p>
    </div>
  )
}

export default WeekPicker;