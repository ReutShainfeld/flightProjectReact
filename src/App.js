import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BaseFacade from "./components/BaseFacade/BaseFacade";
import Flights from "./components/Flights/Flights";
import Airlines from "./components/Airlines/Airlines";
import Countries from "./components/Countries/Countries";
import Customers from "./components/Customers/Customers";
import Tickets from "./components/Tickets/Tickets";
//import DeleteFlight from "./components/Flights/DeleteFlight";
import AddFlight from "./components/Flights/AddFlight";
import SearchFlights from "./components/SearchPage/SearchFlights";
import SearchAirline from "./components/SearchPage/SearchAirline";
//import DeleteCustomer from "./components/Customers/DeleteCustomer";
//import DeleteAirline from "./components/Airlines/DeleteAirline";
import AddAirline from "./components/Airlines/AddAirline";
import AddCustomer from "./components/Customers/AddCustomer";
import AddAdministrators from "./components/Administrator/AddAdministrators";
import AddTicket from "./components/Tickets/AddTicket";
import MyFlights from "./components/Flights/MyFlights";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/flight-app" element={<BaseFacade />}>
          <Route path="flights" element={<Flights />} />
          <Route path="search-flights" element={<SearchFlights />} />
          <Route path="search-airline" element={<SearchAirline />} />
          <Route path="airlines" element={<Airlines />} />
          <Route path="countries" element={<Countries />} />
          <Route path="my-tickets" element={<Tickets />} />
          <Route path="customers" element={<Customers />} />
          <Route path="new-customer" element={<AddCustomer />} />
          <Route path="new-airline" element={<AddAirline />} />
          <Route path="new-administrator" element={<AddAdministrators />} />
          <Route path="add-flight" element={<AddFlight />} />
          <Route path="my-flights" element={<MyFlights />} />

        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addTicket" element={<AddTicket />} />
        <Route path="/new-customer" element={<AddCustomer />} />
        <Route path="/new-airline" element={<AddAirline />} />
        <Route path="/new-administrator" element={<AddAdministrators />} />
      </Routes>

    </div>
  );
}

export default App;
