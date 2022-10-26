import React, { useEffect, useState } from 'react'
import GetService from '../../Services/GetService'
import DeleteService from '../../Services/DeleteService'
import User from '../User.js'

export default function MyTickets() {
    const ID = User.get_id();
    const [data, setData] = useState([]);
    const [TicketsList, setTicketsList] = useState([
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
    const getTickets = () => {
        GetService.GetById("http://127.0.0.1:8000/get_my_tickets/", ID)
            .then((data) => {
                setTicketsList(data)
            })
    }
    /* const GetSingle = (id) => ()=>{
       GetService.GetByParameter("", id).then((data) => {
             console.log(id);
           
         });
       }*/
    const Delete = (id) => () => {
        console.log(id);
        DeleteService.DeleteById("http://127.0.0.1:8000/tickets/", id).then((data) => {
            console.log(data);
        });
        setTicketsList((TicketsList) => TicketsList.filter((ticket) => ticket.id !== id));
    }
    const renderTicket = (ticket) => {
        return (
            <div class="column">
                <div id={ticket.id} class="card" >

                    <div class="card-body">
                        <tr key={ticket.id}>
                            <h6 >{ticket.flight_id}</h6>
                            <button class="btn btn-primary" onClick={Delete(ticket.id)}>delete</button>
                        </tr>
                    </div>
                </div>
            </div>


        )
    }
    let TicketsListToDisplay = TicketsList.map(renderTicket)
    useEffect(() => {
        getTickets()
    }, [])
    return (

        <div id="booking" class="section">
            <div class="section-center">
                <div class="container">
                    <div class="row">

                        <h1> My Tickets page</h1>
                        <div>
                            {TicketsListToDisplay}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

