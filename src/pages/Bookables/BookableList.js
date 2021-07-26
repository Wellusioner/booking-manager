import { useEffect, useReducer, useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { sessions, days } from '../../static.json';
import reducer from './reducer';
import fetchData from '../../utils/api';

const initialState = {
  hasDetails: true,
  bookableIndex: 0,
  group: 'Rooms',
  bookables: [],
  isLoading: true,
  error: false,
  isPresenting: false
}

const BookableList = () => {
  const [{
    bookableIndex,
    hasDetails,
    group,
    bookables,
    isLoading,
    error,
    isPresenting
  }, dispatch] = useReducer(reducer, initialState);

  const bookablesInGroup = bookables.filter(b => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const timerRef = useRef(null);


  const scheduleNext = () => {
    if(timerRef.current === null){
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        dispatch({
          type: 'NEXT_BOOKABLE',
          payload: true
        })
      }, 3000);
    }
  }

  const clearNextTimeout = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  useEffect(() => {

    dispatch({ type: 'FETCH_BOOKABLE_REQUEST' });

    fetchData('http://localhost:3001/bookables')
      .then(bookables => dispatch({ type: 'FETCH_BOOKABLE_SUCCESS', payload: bookables }))
      .catch(error => dispatch({ type: 'FETCH_BOOKABLE_ERROR', payload: error }));

  }, []);

  useEffect(() => {
    if(isPresenting){
      scheduleNext();
    }else{
      clearNextTimeout();
    }
  });

  if(error){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div><FaSpinner className="icon-loading" /> Loading bookables</div>
  }
  
  return (
    <>
      <select onChange={e => {
        dispatch({
          type: 'SET_GROUP',
          payload: e.target.value
        })
        if (isPresenting) {
          clearNextTimeout();
          scheduleNext();
          }
      }}>
        <option value="Rooms">Book</option>
        <option value="Kit">Kit</option>
      </select>
      <ul className="bookables items-list-nav">
        {
          bookablesInGroup.map((b, i) => (
            <li
              key={b.title}
              className={i === bookableIndex ? 'selected' : null}
            >
              <button
                className="btn"
                onClick={() => dispatch({
                  type: 'SET_BOOKABLE',
                  payload: i
                })}
              >
                {b.title}
              </button>
            </li>
          ))
        }
      </ul>
      <button
        onClick={() => dispatch({
          type: 'NEXT_BOOKABLE',
          paload: false
        })}
      >Next</button>
      {
        bookable
        ? <div className="bookable-details">
            <div className="item">
              <div className="item-header">
                <h2>{bookable.title}</h2>
                <span className="controls">
                  <label htmlFor="toggler">
                    <input 
                      type="checkbox" 
                      id="toggler" 
                      checked={hasDetails}
                      onChange={() => dispatch({
                        type: 'TOGGLE_DETAILS'
                      })}
                    />
                    display details
                  </label>
                </span>
              </div>
              <p>{bookable.notes}</p>
              {
                hasDetails
                ? <div className="item-details">
                    <h3>Availability</h3>
                    <div className="bookable-availability">
                      <ul>
                        {
                          bookable.sessions.map(s => <li key={s}>{sessions[s]}</li>)
                        }
                      </ul>
                      <ul>
                        {
                          bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)
                        }
                      </ul>
                    </div>
                  </div>
                : null
              }
            </div>
          </div> 
        : null
      }
    </>
  )
};

export default BookableList;