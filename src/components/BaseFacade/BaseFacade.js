import { Link, Outlet } from 'react-router-dom';
import "./BaseFacade.css"
import User from '../User.js'
import myImage from "../profile.png"
import UpdateCustomer from '../Customers/UpdateCustomer'
import UpdateAirline from '../Airlines/UpdateAirline';

export default function BaseFacade() {

  const USERTYPE = User.UserType();
  return (
    <div>
      <header class="site-navbar" role="banner">
        <nav id="nav" class="site-navigation position-relative text-right" role="navigation">

          <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
            <li class="has-children"><Link to="#"><span>Search for</span></Link>
              <ul class="dropdown arrow-top">
                <li><Link to="/flight-app/search-flights">Flights</Link></li>
                <li><Link to="/flight-app/search-airline">Airline</Link></li>
              </ul></li>

            <li><Link to="/flight-app/airlines"><span>Airlines</span></Link></li>

            <li><Link to="/flight-app/countries"><span>Countries</span></Link></li>
            <li><Link to="/flight-app/flights"><span>Flights</span></Link></li>
            {USERTYPE === 'Anonymous' && <li><Link to="/new-customer"><span>Register as a customer</span></Link></li>}
            {USERTYPE === 'Administrator' && <li><Link to="/flight-app/customers"><span>Customers</span></Link></li>}
            {USERTYPE === 'Administrator' && <li class="has-children"><Link to="#"><span>Add New</span></Link>
              <ul class="dropdown arrow-top">
                <li><Link to="/flight-app/new-customer">Customer</Link></li>
                <li><Link to="/flight-app/new-airline">Airline</Link></li>
                <li><Link to="/flight-app/new-administrator">Administrator</Link></li>
              </ul></li>}
            {USERTYPE === 'Customer' &&
              <li id='CustomerFacade' class="has-children"> <Link to="#">
                <img id='profile' src={myImage} />
              </Link>
                <ul class="dropdown arrow-top">
                  <li><UpdateCustomer>Update Personal Details</UpdateCustomer></li>
                  <li><Link to="/flight-app/my-tickets">My Tickets</Link></li>
                </ul></li>
            }
            {USERTYPE === 'Airline' &&
              <li id='CustomerFacade' class="has-children"> <Link to="#">
                <span>private area</span>
              </Link>
                <ul class="dropdown arrow-top">
                  <li><UpdateAirline>Update Details</UpdateAirline></li>
                  <li><Link to="/flight-app/my-flights">My Flights</Link></li>
                  <li><Link to="/flight-app/add-flight">Add Flight</Link></li>
                </ul></li>
            }

          </ul>
        </nav>
      </header>
      <Outlet></Outlet>
    </div>
  )
}