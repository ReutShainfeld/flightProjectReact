import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import UpdateService from '../../Services/UpdateService';
import GetService from '../../Services/GetService'
import User from '../User.js'
import "./Customers.css";


export default function UpdateCustomer() {
    const [data, setData] = useState([]);
    const ID = User.get_id();
    const GetSingle = () => {
        console.log(ID);
        GetService.GetById("http://127.0.0.1:8000/customers/", ID).then((data) => {
            setData(data);
        }, (error) => {
            alert(error)
        });
    }

    const Send = () => {
        handleClose();
        console.log(UpdateCustomer.values)
        UpdateService.UpdateBack(
            "http://127.0.0.1:8000/update_customer/", ID,
            UpdateCustomer.values
        ).then((data) => {
            alert(data);
        }, (error) => {
            alert(error)
        });
    };
    const UpdateCustomer = useFormik({
        initialValues: {
            // user_id: ID,
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            phone_no: data.phone_no,
            credit_card_no: data.credit_card_no,
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
                Update Personal Details
            </button>

            <Modal className='modal' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateCustomer.handleSubmit}>

                        {/* <div className="form-group col-md-12">
                            <label htmlFor="id_number">ID Number </label>
                            <input type="text" id="id_number" onChange={UpdateCustomer.handleChange}
                                name="user_id" className="form-control"
                                Value={ID} />
                        </div> */}
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={UpdateCustomer.handleChange}
                                name="first_name" className="form-control"
                                defaultValue={data.first_name} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={UpdateCustomer.handleChange}
                                name="last_name" className="form-control"
                                defaultValue={data.last_name} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="address"> Address </label>
                            <input type="text" id="address" onChange={UpdateCustomer.handleChange}
                                name="address" className="form-control"
                                defaultValue={data.address} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="phone"> Phone </label>
                            <input type="text" id="phone" onChange={UpdateCustomer.handleChange}
                                name="phone_no" className="form-control"
                                defaultValue={data.phone_no} />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="credit_card_num"> Credit Card Num</label>
                            <input type="text" id="credit_card_num" onChange={UpdateCustomer.handleChange}
                                name="credit_card_no" className="form-control"
                                defaultValue={data.credit_card_no} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={UpdateCustomer.handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*   {error &&  <div class="m-4">  <div class="alert alert-danger alert-dismissible d-flex align-items-center fade show">
      	<i class="bi-exclamation-octagon-fill"></i>
        <strong class="mx-2">Error!</strong> {data}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div></div>}*/}

        </>

    );
}




