import React, { useEffect, useState } from 'react'
import GetService from '../../Services/GetService'
import DeleteService from '../../Services/DeleteService'
import UpdateFlight from './UpdateFlight'
import User from '../User.js'

export default function MyFlights() {
    const ID = User.get_id();
    const [data, setData] = useState([]);
    const [flightsList, setFlightsList] = useState([
        // { id: 1, name: "aaa" },
        // { id: 2, name: "bbb" },
        // { id: 3, name: "ccc" },
        // { id: 4, name: "ddd" },
        // { id: 5, name: "eee" },
        // { id: 6, name: "fff" },
        // { id: 7, name: "ggg" },
        // { id: 8, name: "hhh" },

    ])
    const [status, setStatus] = useState(false);
    const getFlights = () => {
        GetService.GetById("http://127.0.0.1:8000/get_my_flights/", ID)
            .then((data) => {
                setFlightsList(data)
            })
    }
    const GetSingle = (id) => () => {
        GetService.GetById("http://127.0.0.1:8000/get_all_flights/", id).then((data) => {
            setData(data);
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

        }});
    }

    const Delete = (id) => () => {
        console.log(id);
        DeleteService.DeleteById("http://127.0.0.1:8000/flights/", id).then((data) => {
            console.log(data);
        });
        setFlightsList((flightsList) => flightsList.filter((flight) => flight.id !== id));
    }

    const renderFlight = (flight) => {
        return (
            <div class="column">
                <div id={flight.id} class="card" >

                    <div class="card-body">
                        <tr key={flight.id}>
                            <h6 >fight ID: {flight.id}</h6>
                            <h6 > origin country: {flight.origin_country_id}</h6>
                            <h6 > destination country: {flight.destination_country_id}</h6>
                            <h6 id={'more' + flight.id}></h6>
                            <button id={'myBtn' + flight.id} class="btn btn-primary" onClick={GetSingle(flight.id)}>see more</button>
                            <UpdateFlight ID={flight.id} />
                            <button class="btn btn-primary" onClick={Delete(flight.id)}>delete</button>
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

