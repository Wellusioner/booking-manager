import { useState, useEffect, useReducer, useRef } from 'react';
import fetchData from '../../utils/api';
import reducer from './reducer';
import { FaSpinner } from 'react-icons/fa';

const initialState = {
  isLoading: true,
  error: false,
  users: [],
};

const UserList = () => {
  const timerRef = useRef(null);
  const [{
    isLoading,
    users,
    error
  }, dispatch] = useReducer(reducer, initialState);
  const [userIndex, setUserIndex] = useState(0);
  const user = users[userIndex];

  

  const clearNextTimeout = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    dispatch({type: 'FETCH_USERS_REQUEST'});
    fetchData('http://localhost:3001/users')
      .then(users => dispatch({
        type: 'FETCH_USERS_SUCCESS',
        payload: users
      }))
      .catch(error => dispatch({
        type: 'FETCH_USERS_ERROR',
        payload: error
      }));
  }, []);

  useEffect(() => {
    const setNextTimeout = () => {
      timerRef.current = setTimeout(() => {
        setUserIndex(i => (i + 1) % users.length);
        console.log(users.length);
      }, 3000);
    };
    setNextTimeout();
  });
  
  if(error){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div><FaSpinner className="icon-loading" /> Loading users...</div>
  }

  return (
    <>
      <ul className="users items-list-nav">
        {
          users.map((u, i) => (
            <li key={i}>
              <button
                className={userIndex === i ? 'selected' : ''}
                onClick={() => {
                  setUserIndex(i);
                  clearNextTimeout();
                }}
              >
                {u.name}
              </button>
            </li>
          ))
        }
      </ul>
      {
        user
        ? <div className="user-details">
            <div className="item">
              <div className="item-header">
                <h2>
                  {
                    user.name
                  }
                </h2>
              </div>
              <div className="item-details">
                <h3>{user.title}</h3>
                {
                  user.notes
                }
              </div>
            </div>
          </div>
        : null
      }
    </>
  )
};

export default UserList;