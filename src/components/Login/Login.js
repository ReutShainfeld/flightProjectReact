import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import "./Login.css"
import GetService from "../../Services/GetService";
import PostService from "../../Services/PostService";
import React, { useState } from "react";
import BaseFacade from "../BaseFacade/BaseFacade";
import User from '../User'

export default function Login() {
  const [status, setStatus] = useState(false);
  //const [count, setCount] = useState(0);
  // const [id, setId] = useState(0);
  const UserRole = (user) => {
    console.log(user)
    // switch (user) {
    //   case user.is_superuser===true:
    //     return 'Administrator';
    //     break
    //   case !user.is_staff && !user.is_superuser && user.is_active:
    //     return 'Customer';
    //   case user.is_staff:
    //     return 'Airline'
    //   default:
    //     return 'Anonymous';
    // }
    if  (user.is_superuser)
       return 'Administrator';
    if (!user.is_staff && !user.is_superuser && user.is_active)
       return 'Customer';
    if  (user.is_staff)
       return 'Airline'
    else
       return 'Anonymous';

  }
  const GetId = (user)  => {
    PostService.AddToBack("http://127.0.0.1:8000/get_user_role_by_user/", user).then((data) => {
      console.log(user)
      if (data.error === undefined) {
        console.log("data",data);
        console.log(data.id);
        //setCount(data.id)
        // setId(7)
        User.SaveID({ id:data.id});
        console.log('aaaaaaa');

      } else {
        alert(data.error)
      }
    }, (error) => {
      alert(error)
    });
  };

  const Send = () => {
    PostService.AddToBack("http://127.0.0.1:8000/token/", LoginForm.values).then((data) => {
      if (data.error === undefined) {
        console.log(data);
        const result = jwt_decode(data.access);
        console.log("result", result)
        const result_data = { is_superuser: result.is_superuser, is_staff: result.is_staff, is_active: result.is_active }
        console.log("result_data", result_data)
        const user_role = UserRole(result_data);
        console.log("user_role", user_role)
        //const user = { user_role: user_role, user_id: result.user_id }
        // console.log("user", user)
        GetId(result);
        //console.log("id", count);
        //User.SaveData({ user_role: user_role, user_id: result.user_id, id: count });
        User.SaveData({ user_role: user_role, user_id: result.user_id});
        setStatus(true);
      }
      else {
        alert("aaa")
      }
      // localStorage.setItem("authTokens", JSON.stringify(data));
    }, (error) => {
      alert("username or password not valid")
    });
  };

  const LoginForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: Send,
  })
  return (
    <section className="vh-100">

      {!status && <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form className="login-form" onSubmit={LoginForm.handleSubmit}>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0"  >Login</p>
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="Username"> User Name </label>
                <input type="text" id="Username" onChange={LoginForm.handleChange} name="username" className="form-control" required />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="password"> Password</label>
                <input type="password" id="password" onChange={LoginForm.handleChange} name="password" className="form-control" required minLength={6} />
              </div>



              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="submit-btn"
                  dir="center">login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                  className="link-danger">Register</a></p>
              </div>

            </form>

          </div>
        </div>

      </div>}
      {status && <BaseFacade ></BaseFacade>}
    </section>
  )
}