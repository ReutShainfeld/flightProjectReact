import React, { useState } from 'react'
import { useFormik } from 'formik';
import PostService from '../../Services/PostService'
import './SearchPage.css'
export default function SearchAirline() {

	const [AirlinesList, setAirlinesList] = useState([])
	const renderAirline = (Airline) => {
		return (
			<div class="column">
				<div id={Airline.id} class="card" >
					<div class="card-body">
						<tr key={Airline.id}>
							<h6>name: {Airline.name}</h6>
							<h6>country: {Airline.country_id }</h6>
						</tr>
					</div>
				</div>
			</div>

		)
	}
	const Send = () => {
		console.log(AirlineByParameter.values)
		PostService.AddToBack(
			"http://127.0.0.1:8000/get_airline_by_parameters",
			AirlineByParameter.values
		).then((data) => {
			console.log(data);
			setAirlinesList(data);
		}, (error) => {
			alert(error)
		});
	};
	const AirlineByParameter = useFormik({
		initialValues: {
			name: '',
			country_id: '',
		},
		onSubmit: Send,
	});
	let AirlinesListToDisplay = AirlinesList.map(renderAirline)
	return (
		<div id="booking" class="section">
			<div class="section-center">
				<div class="container">
					<div class="row">
						<div class="booking-form">
							<form onSubmit={AirlineByParameter.handleSubmit}>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<span class="form-label">Name</span>
											<input class="form-control" type="text" id="name" onChange={AirlineByParameter.handleChange} name="name" className="form-control" />
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<span class="form-label"> Country id</span>
											<input class="form-control" type="text" id="country_id" onChange={AirlineByParameter.handleChange} name="country_id" className="form-control" />
										</div>
									</div>
								</div>
								<div class="row">

									<div class="col-md-3">
										<div class="form-btn">
											<button type="submit" class="submit-btn">Show airline</button>
										</div>
									</div>

								</div>
							</form>
						</div>
						<div>
							{AirlinesListToDisplay}
						</div>
					</div>
				</div>
			</div>
		</div>
	)


}
