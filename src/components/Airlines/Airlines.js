import React, { useEffect, useState } from 'react'
import GetService from '../../Services/GetService'
import DeleteService from '../../Services/DeleteService'
import User from '../User.js'

export default function Airlines() {
    const USERTYPE = User.UserType();
    const [data, setData] = useState([]);
    const [AirlinesList, setAirlinesList] = useState([
    ])
    const [status, setStatus] = useState(false);
    const getAirlines = () => {
        GetService.GetAll("http://127.0.0.1:8000/get_all_airlines")
            .then((data) => {
                setAirlinesList(data)
            })
    }
    const GetSingle = (id) => () => {
        console.log(id);
        GetService.GetById("http://127.0.0.1:8000/get_all_airlines/", id).then((data) => {
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
            setAirlinesList((AirlinesList) => AirlinesList.filter((Airline) => Airline.id !== id));
        });
    }
    const renderAirline = (Airline) => {
        return (
            <div class="column">
                <div id={Airline.id} class="card" >
                    <div class="card-body">
                        <tr key={Airline.id}>
                            <h6>{Airline.name}</h6>
                            <h6 id={'more' + Airline.id}></h6>
                            <button id={'myBtn' + Airline.id} class="btn btn-primary" onClick={GetSingle(Airline.id)}>see more</button>
                            {USERTYPE === 'Administrator' && <button class="btn btn-primary" onClick={Delete(Airline.id)}>delete</button>}
                        </tr>
                    </div>
                </div>
            </div>

        )
    }
    let AirlinesListToDisplay = AirlinesList.map(renderAirline)
    useEffect(() => {
        getAirlines()
    }, [])
    return (

        <div id="booking" class="section">
            <div class="section-center">
                <div class="container">
                    <div class="row">
                        <div>
                            {AirlinesListToDisplay}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
