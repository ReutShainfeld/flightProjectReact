import { useFormik } from "formik";
import PostService from "../../Services/PostService";
import User from '../User.js'
export default function AddFlight() {
  const ID = User.get_id();
  const Send = () => {
    PostService.AddToBack(
      "http://127.0.0.1:8000/flights",
      AddCustomer.values
    ).then((data) => {
      console.log(data);
      if (data.error === undefined){
        alert("added successfully")
      }
      else{
        alert(data.error)
      }
    }, (error) => {
      alert(error)
    });
  };
  const AddCustomer = useFormik({
    initialValues: {
      airline_company_id: ID,
      origin_country_id: "",
      destination_country_id: "",
      departure_time: "",
      landing_time: "",
      remaining_tickets: "",
    },
    onSubmit: Send,
    // onSubmit: () => {
    //     console.log(AddCustomer.values);
    // }
  });

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5"></div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"></div>
          <form id="add_form" onSubmit={AddCustomer.handleSubmit}>
            <div className="form-group col-md-12">
              <label htmlFor="airline_company_id">Airline company id </label>
              <input
                type="text"
                id="airline_company_id"
                onChange={AddCustomer.handleChange}
                name="airline_company_id"
                className="form-control"
                value={ID}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="origin_country_id"> Origin country id </label>
              <input
                type="text"
                id="origin_country_id"
                onChange={AddCustomer.handleChange}
                name="origin_country_id"
                className="form-control"
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
                onChange={AddCustomer.handleChange}
                name="destination_country_id"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="departure_time"> Departure time </label>
              <input
                type="text"
                id="departure_time"
                onChange={AddCustomer.handleChange}
                name="departure_time"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="landing_time"> Landing time </label>
              <input
                type="text"
                id="landing_time"
                onChange={AddCustomer.handleChange}
                name="landing_time"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="remaining_tickets"> Remaining tickets</label>
              <input
                type="text"
                id="remaining_tickets"
                onChange={AddCustomer.handleChange}
                name="remaining_tickets"
                className="form-control"
              />
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button className="btn btn-success" type="submit">
                {" "}
                Edit flight{" "}
              </button>
              {/* {loading &&
          <span className="fa fa-circle-o-notch fa-spin" />}*/}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
