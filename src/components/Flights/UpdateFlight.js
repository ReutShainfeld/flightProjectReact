import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import UpdateService from '../../Services/UpdateService';
import GetService from '../../Services/GetService'


export default function UpdateFlight({ ID }) {
  const [data, setData] = useState([""]);
  // const ID = User.get_id();

  const GetSingle = () => {
    console.log("get single" + ID);
    GetService.GetById("http://127.0.0.1:8000/get_all_flights/", ID).then((data) => {
      setData(data);
      console.log(data)
    });
  }

  const Send = () => {
    handleClose();
    console.log(UpdateFlight.values)
    UpdateService.UpdateBack(
      "http://127.0.0.1:8000/flights/", ID,
      UpdateFlight.values
    ).then((data) => {
      alert(data);
    }, (error) => {
      alert(error)
    });
  };
  const UpdateFlight = useFormik({
    initialValues: {
      airline_company_id: ID,
      origin_country_id: data.origin_country_id,
      destination_country_id: data.destination_country_id,
      departure_time: data.departure_time,
      landing_time: data.landing_time,
      remaining_tickets:data.remaining_tickets
    },
    onSubmit: Send,
  });



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    GetSingle();
  }

  return (
    <>
      <button variant="primary" class="btn btn-primary" onClick={handleShow}>
        update
      </button>

      <Modal className='modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={UpdateFlight.handleSubmit}>
            <div className="form-group col-md-12">
              <label htmlFor="airline_company_id">Airline company id </label>
              <input
                type="text"
                id="airline_company_id"
                onChange={UpdateFlight.handleChange}
                name="airline_company_id"
                className="form-control"
                defaultValue={data.airline_company_id}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="origin_country_id"> Origin country id </label>
              <input
                type="text"
                id="origin_country_id"
                onChange={UpdateFlight.handleChange}
                name="origin_country_id"
                className="form-control"
                defaultValue={data.origin_country_id}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="destination_country_id">
                {" "}
                Destination country id{" "}
              </label>
              <input
                type="text"
                id="destination_country_id"
                onChange={UpdateFlight.handleChange}
                name="destination_country_id"
                className="form-control"
                defaultValue={data.destination_country_id}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="departure_time"> Departure time </label>
              <input
                type="text"
                id="departure_time"
                onChange={UpdateFlight.handleChange}
                name="departure_time"
                className="form-control"
                defaultValue={data.departure_time}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="landing_time"> Landing time </label>
              <input
                type="text"
                id="landing_time"
                onChange={UpdateFlight.handleChange}
                name="landing_time"
                className="form-control"
                defaultValue={data.landing_time}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="remaining_tickets"> Remaining tickets</label>
              <input
                type="text"
                id="remaining_tickets"
                onChange={UpdateFlight.handleChange}
                name="remaining_tickets"
                className="form-control"
                defaultValue={data.remaining_tickets}
              />
            </div>


          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={UpdateFlight.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
}




