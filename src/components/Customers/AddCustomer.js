import { useFormik } from 'formik';
import React, { useState } from "react";
import PostService from "../../Services/PostService";
import BaseFacade from "../BaseFacade/BaseFacade";
import User from '../User'
export default function AddCustomer() {
    const user_id = User.get_user_id();
    const [status, setStatus] = useState(false);
    const Send = () => {
        PostService.AddToBack("http://127.0.0.1:8000/customers", AddCustomer.values).then((data) => {
            console.log(data);
            if (data.error === undefined) {
               // User.SaveData({user_role:AddCustomer.values.user_role,id:data.id,user_id:user_id});
               User.SaveData({user_role:AddCustomer.values.user_role,user_id:user_id});
               User.SaveID({id:data.id});
                setStatus(true);
            }
            else {
                alert(data.error)
            }
        }, (error) => {
            alert(error)
        });

    }



    const AddCustomer = useFormik({
        initialValues: {
            user_id: user_id,
            first_name: '',
            last_name: '',
            address: '',
            phone: '',
            credit_card_num: '',
            user_role: 'Customer',
        },
        onSubmit: Send,
    });

    return (
        <section className="vh-100">
            {!status && <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"></div>
                    <form id="add_form" onSubmit={AddCustomer.handleSubmit}>

                        <div className="form-group col-md-12">
                            <label htmlFor="id_number">ID Number </label>
                            <input type="text" id="id_number" onChange={AddCustomer.handleChange} name="user_id" value={user_id} className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={AddCustomer.handleChange} name="first_name" className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={AddCustomer.handleChange} name="last_name" className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="address"> Address </label>
                            <input type="text" id="address" onChange={AddCustomer.handleChange} name="address" className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="phone"> Phone </label>
                            <input type="text" id="phone" onChange={AddCustomer.handleChange} name="phone_no" className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="credit_card_num"> Credit Card Num</label>
                            <input type="text" id="credit_card_num" onChange={AddCustomer.handleChange} name="credit_card_no" className="form-control" />
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button className="btn btn-success" type="submit"> Edit Customer </button>
                        </div>
                    </form>
                </div>
            </div>}
            {status && <BaseFacade ></BaseFacade>}

        </section>
    )

}




