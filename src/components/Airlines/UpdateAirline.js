import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import UpdateService from '../../Services/UpdateService';
import GetService from '../../Services/GetService'
import User from '../User.js'



export default function UpdateAirline() {
    const [data, setData] = useState([]);
    const ID = User.get_id();
    const GetSingle = () => {
        console.log('aaaaaa');
        console.log(ID);
        GetService.GetById("http://127.0.0.1:8000/get_all_airlines/", ID).then((data) => {
            console.log(data)
            setData(data);
        }, (error) => {
            alert(error)
        });
    }
    const Send = () => {
        handleClose();
        console.log(UpdateAirline.values)
        UpdateService.UpdateBack(
            "http://127.0.0.1:8000/update_airline/", ID,
            UpdateAirline.values
        ).then((data) => {
            alert(data);
        }, (error) => {
            alert(error)
        });
    };
    const UpdateAirline = useFormik({
        initialValues: {
            // user_id :ID,
            name: data.name,
            country_id: data.country_id
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
            <button id='update_customer' onClick={handleShow}>
                Update Details
            </button>

            <Modal className='modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Airline</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={UpdateAirline.handleSubmit}>
                        {/* <div className="form-group col-md-12">
                            <label htmlFor="user_id">user id </label>
                            <input type="text" id="user_id" onChange={UpdateAirline.handleChange}
                             name="user_id" className="form-control" Value={ID} />
                        </div> */}
                        <div className="form-group col-md-12">
                            <label htmlFor="name"> Name </label>
                            <input type="text" id="name" onChange={UpdateAirline.handleChange} 
                            name="name" className="form-control" defaultValue={data.name} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="country_id">  Country id </label>
                            <input type="text" id="country_id" onChange={UpdateAirline.handleChange}
                             name="country_id" className="form-control" defaultValue={data.country_id} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={UpdateAirline.handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}




