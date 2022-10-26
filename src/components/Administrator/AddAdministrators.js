import { useFormik } from 'formik';
import React, { useState } from "react";
import PostService from "../../Services/PostService";
import BaseFacade from "../BaseFacade/BaseFacade";
import User from '../User'
export default function AddAdministrators() {
    const user_id = User.get_user_id();
    const [status, setStatus] = useState(false);
    const Send = () => {
        PostService.AddToBack("http://127.0.0.1:8000/administrators", AddAdministator.values).then((data) => {
            if (data.error === undefined) {
               // User.SaveData({user_role:AddAdministator.values.user_role,id:data.id,user_id:user_id});
                User.SaveData({user_role:AddAdministator.values.user_role,user_id:user_id});
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

    const AddAdministator = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            user_id: user_id,
            user_role: 'Administrator'
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
                    <form id="add_form" onSubmit={AddAdministator.handleSubmit}>

                        <div className="form-group col-md-12">
                            <label htmlFor="user_id">user id </label>
                            <input type="text" id="user_id" onChange={AddAdministator.handleChange} name="user_id" value={user_id} className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First name </label>
                            <input type="text" id="first_name" onChange={AddAdministator.handleChange} name="first_name" className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="last_name">  Last name </label>
                            <input type="text" id="last_name" onChange={AddAdministator.handleChange} name="last_name" className="form-control" />
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button className="btn btn-success" type="submit"> Edit administrator </button>
                        </div>
                    </form>
                </div>
            </div>}
            {status && <BaseFacade ></BaseFacade>}

        </section>
    )

}