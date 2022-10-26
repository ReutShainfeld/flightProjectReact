import React, { useEffect, useState } from 'react'
import GetService from '../../Services/GetService'
export default function Countries() {
    const [data, setData] = useState([]);
    const [CountriesList, setCountriesList] = useState([])
    const [status, setStatus] = useState(false);
    const getCountries = () => {
        GetService.GetAll("http://127.0.0.1:8000/get_all_countries")
            .then((data) => {
                setCountriesList(data)
            })
    }
    const GetSingle = (id) => () => {
        console.log(id);
        GetService.GetById("http://127.0.0.1:8000/get_all_countries/", id).then((data) => {
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

            }
        }, (error) => {
            alert(error)
        });
    }
    const renderCountry = (Country) => {
        return (<div class="column">
            <div id={Country.id} class="card" >
                <div class="card-body">
                    <tr key={Country.id}>
                        <img src={Country.image} width="250" height="200"></img>
                        <h6 >{Country.name}</h6>
                        <h6 id={'more' + Country.id}></h6>
                        <button id={'myBtn' + Country.id} class="btn btn-primary" onClick={GetSingle(Country.id)}>see more</button>
                    </tr>
                </div>
            </div>
        </div>)
    }
    let CountriesListToDisplay = CountriesList.map(renderCountry)
    useEffect(() => {
        getCountries()
    }, [])
    return (

        <div id="booking" class="section">
            <div class="section-center">
                <div class="container">
                    <div class="row">
                        <h1>Countries page</h1>
                        <div>
                            {CountriesListToDisplay}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
