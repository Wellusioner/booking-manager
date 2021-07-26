import './assets/styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import {
  FaCalendarAlt,
  FaDoorOpen,
  FaUsers
} from 'react-icons/fa';

import Bookings from './pages/Bookings';
import Bookables from './pages/Bookables';
import Users from './pages/Users';
import Example from './pages/UseEffectExample';

import {
  UserPicker
} from './components';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <div className="container">
            <nav>
              <ul>
                <li>
                  <Link
                    className="btn btn-header" 
                    to="/bookings"
                  >
                    <FaCalendarAlt />
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="btn btn-header" 
                    to="/bookables"
                  >
                    <FaDoorOpen />
                    <span>Bookables</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="btn btn-header" 
                    to="/users"
                  >
                    <FaUsers />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="btn btn-header" 
                    to="/example"
                  >
                    <span>Example</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <UserPicker />
          </div>
        </header>
        <div className="container">
          <Switch>
            <Route exact path="/bookings" component={Bookings}/>
            <Route exact path="/bookables" component={Bookables}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/example" component={Example} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;