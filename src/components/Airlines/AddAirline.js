import { useFormik } from 'formik';
import React, { useState } from "react";
import PostService from "../../Services/PostService";
import BaseFacade from "../BaseFacade/BaseFacade";
import User from '../User'
export default function AddFlightSecond() {
    const user_id=User.get_user_id();
    const [status, setStatus] = useState(false);
    const Send = () => {
        PostService.AddToBack("http://127.0.0.1:8000/airline", AddAirline.values).then((data) => {
            console.log(data);
            if (data.error === undefined) {
                //User.SaveData({user_role:AddAirline.values.user_role,id:data.id,user_id:user_id});
                User.SaveData({user_role:AddAirline.values.user_role,user_id:user_id});
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

    const AddAirline = useFormik({
        initialValues: {
            user_id: user_id,
            name: '',
            country_id: '',
            user_role: 'Airline'
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
                    <form id="add_form" onSubmit={AddAirline.handleSubmit}>

                        <div className="form-group col-md-12">
                            <label htmlFor="user_id">user id </label>
                            <input type="text" id="user_id" onChange={AddAirline.handleChange} name="user_id" value={user_id} className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="name"> Name </label>
                            <input type="text" id="name" onChange={AddAirline.handleChange} name="name" className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="country_id">  Country id </label>
                            <input type="text" id="country_id" onChange={AddAirline.handleChange} name="country_id" className="form-control" />
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button className="btn btn-success" type="submit"> Edit airline </button>
                        </div>
                    </form>
                </div>
            </div>}
            {status && <BaseFacade ></BaseFacade>}

        </section>
    )

}