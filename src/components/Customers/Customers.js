import React, { useEffect, useState } from 'react'
import GetService from '../../Services/GetService'
import DeleteService from '../../Services/DeleteService'

export default function Customers() {
    const [data, setData] = useState([]);
    const [CustomersList, setCustomersList] = useState([
      /*  { id: 1, first_name: "aaa", last_name: "stefan" },
        { id: 2, first_name: "bbb", last_name: "stefan" },
        { id: 3, first_name: "ccc", last_name: "stefan" },
        { id: 4, first_name: "ddd", last_name: "stefan" },
        { id: 5, first_name: "eee", last_name: "stefan" },
        { id: 6, first_name: "fff", last_name: "stefan" },
        { id: 7, first_name: "ggg", last_name: "stefan" },
        { id: 8, first_name: "hhh", last_name: "stefan" },*/
    ])
    const [status, setStatus] = useState(false);
    const getCustomers = () => {
        GetService.GetAll("http://127.0.0.1:8000/customers")
            .then((data) => {
                setCustomersList(data)
            })
    }
    const GetSingle = (id) => () => {
        console.log(id);
        GetService.GetById("http://127.0.0.1:8000/customers/", id).then((data) => {
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
    const Delete = (id) => () => {
        console.log(id);
        DeleteService.DeleteById("http://127.0.0.1:8000/customers/", id).then((data) => {
            console.log(data);
        });
        setCustomersList((CustomersList) => CustomersList.filter((Customer) => Customer.id !== id));
    }

    const renderCustomer = (Customer) => {
        return (
            <div class="column">
                <div id={Customer.id} class="card" >
                    <div class="card-body">
                        <tr key={Customer.id}>
                            <h6>{Customer.first_name}</h6>
                            <h6>{Customer.last_name}</h6>
                            <h6 id={'more' + Customer.id}></h6>
                            <button id={'myBtn' + Customer.id} class="btn btn-primary" onClick={GetSingle(Customer.id)}>see more</button>
                            <button class="btn btn-primary" onClick={Delete(Customer.id)}>delete</button>
                        </tr>
                    </div>
                </div>
            </div>

        )
    }
    let CustomersListToDisplay = CustomersList.map(renderCustomer)
    useEffect(() => {
        getCustomers()
    }, [])
    return (

        <div id="booking" class="section">
            <div class="section-center">
                <div class="container">
                    <div class="row">
                        <div>
                            {CustomersListToDisplay}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
