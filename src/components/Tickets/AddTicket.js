import { useFormik } from 'formik';
import PostService from "../../Services/PostService";
export default function AddTicket() {
  const Send = () => {
    PostService.AddToBack("http://127.0.0.1:8000/tickets", RegisterForm.values).then((data) => {
      console.log(data);
    });
  }

  const RegisterForm = useFormik({
    initialValues: {
      flight_id: '',
      customer_id: '',
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
                <p className="text-center fw-bold mx-3 mb-0"  >add ticket</p>
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="flight_id">Flight id</label>
                <input type="text" id="flight_id" onChange={RegisterForm.handleChange} name="flight_id" className="form-control" required />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="customer_id"> Customer id</label>
                <input type="customer_id" id="customer_id" onChange={RegisterForm.handleChange} name="customer_id" className="form-control" required minLength={5} />
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="submit-btn"
                  dir="center"   > add ticket</button>

              </div>
            </form>

          </div>
        </div>
      </div>

    </section>
  )


}