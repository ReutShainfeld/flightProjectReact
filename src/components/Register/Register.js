import { useFormik } from 'formik';
import PostService from "../../Services/PostService";
import { useNavigate } from "react-router-dom";
import User from '../User'

export default function Register() {
  const navigate = useNavigate();
  const Send = () => {
    console.log(RegisterForm.values);
    PostService.AddToBack("http://127.0.0.1:8000/create_new_user", RegisterForm.values).then((data) => {
      console.log(data);
      if(data.error===undefined){
      User.SaveData({user_role:RegisterForm.values.user_role,user_id:data.id})
      UserType();}
      else{
      alert(data.error)
      } }, (error) => {
        alert(error)
      });
  }
  const UserType = () => {
    switch (RegisterForm.values.user_role) {
      case 'Administrator':
        navigate('/new-administrator');
        break;
      case 'Customer':
        navigate('/new-customer');
        break;
      case 'Airline':
        navigate('/new-airline');
        break;
      default:
        navigate('/flight-app');
        break;
    }

  }
  const RegisterForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      user_role: 'Anonymous',
    },
    onSubmit: Send,
  })
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form className='login-form' onSubmit={RegisterForm.handleSubmit}>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0"  >Register</p>
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="Username"> User Name </label>
                <input type="text" id="Username" onChange={RegisterForm.handleChange} name="username" className="form-control" required />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="password"> Password</label>
                <input type="password" id="password" onChange={RegisterForm.handleChange} name="password" className="form-control" required minLength={6} />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="email"> Email </label>
                <input type="email" id="email" onChange={RegisterForm.handleChange} name="email" className="form-control" required />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="user_role">User Role</label>
                <select id='user_role' onChange={RegisterForm.handleChange} name="user_role" className="form-control" required >
                  <option>Anonymous</option>
                  <option>Administrator</option>
                  <option>Customer</option>
                  <option>Airline</option>
                </select>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="submit-btn"
                  dir="center"   > 👍register</button>

              </div>
            </form>

          </div>
        </div>
      </div>

    </section>
  )


}