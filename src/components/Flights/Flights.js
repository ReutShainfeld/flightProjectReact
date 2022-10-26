import React, { useEffect, useState } from 'react'
import GetService from '../../Services/GetService'
import PostService from "../../Services/PostService";
import User from '../User.js'

export default function Flights() {
    const USERTYPE = User.UserType();
    const ID = User.get_id();
    const [data, setData] = useState([]);
    const [flightsList, setFlightsList] = useState([
        /*{ id: 1, name: "aaa" },
        { id: 2, name: "bbb" },
        { id: 3, name: "ccc" },
        { id: 4, name: "ddd" },
        { id: 5, name: "eee" },
        { id: 6, name: "fff" },
        { id: 7, name: "ggg" },
        { id: 8, name: "hhh" },
        { id: 1, name: "aaa" },
        { id: 2, name: "bbb" },
        { id: 3, name: "ccc" },
        { id: 4, name: "ddd" },
        { id: 5, name: "eee" },
        { id: 6, name: "fff" },
        { id: 7, name: "ggg" },
        { id: 8, name: "hhh" },*/


    ])
    const [status, setStatus] = useState(false);
    const getFlights = () => {
        GetService.GetAll("http://127.0.0.1:8000/get_all_flights")
            .then((data) => {
                setFlightsList(data)
            })
    }
    const GetSingle = (id) => () => {
        console.log(id);
        GetService.GetById("http://127.0.0.1:8000/get_all_flights/", id).then((data) => {

            console.log(data)
            setData(data);
        });
        var moreText = document.getElementById("more" + id);
        var btnText = document.getElementById("myBtn" + id);
        if (!status) {
            btnText.innerHTML = "see less";
            {
                Object.entries(data).map(([key, value]) => (
                    moreText.innerHTML += key + ' ' + value + "<br />"
                ))
            }
            console.log("data")
            setStatus(true)

        } else {

            btnText.innerHTML = "see more";
            moreText.innerHTML = '';
            setStatus(false)

        }
    }
    const AddTicket = (id) => () => {
        const Object = { flight_id: id, customer_id: ID };
        console.log(Object)
        PostService.AddToBack("http://127.0.0.1:8000/tickets", Object).then((data) => {
            console.log(data);
            if (data.error === undefined){
                alert("added successfully")
              }
              else{
                alert(data.error)
              }
        })
    }

    const renderFlight = (flight) => {
        return (
    
            <div class="column">
                <div id={flight.id} class="card" >

                    <div class="card-body">
                        <tr key={flight.id}>
                            <h6 > flight id: {flight.id}</h6>
                            {/* <h6 > origin country: {flight.origin_country_id}</h6> */}
                            {/* <h6 >{flight.airline_company_id['name']}</h6> */}
                            <h6 id={'more' + flight.id}></h6>
                            <button id={'myBtn' + flight.id} class="btn btn-primary" onClick={GetSingle(flight.id)}>see more</button>
                            {USERTYPE === 'Customer' && <button class="btn btn-primary" onClick={AddTicket(flight.id)}>Buy</button>}
                        </tr>
                    </div>
                </div>
            </div>


        )
    }
    let flightsListToDisplay = flightsList.map(renderFlight)
    useEffect(() => {
        getFlights()
    }, [])
    return (

        <div id="booking" class="section">
            <div class="section-center">

                <div class="container">
                    <div class="row">
                        <div>
                            {flightsListToDisplay}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

