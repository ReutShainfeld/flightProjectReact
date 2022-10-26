import React, { useState } from 'react'
import { useFormik } from 'formik';
import PostService from '../../Services/PostService'
import './SearchPage.css'
export default function SearchFlights() {
	const [flightsList, setFlightsList] = useState([])
	const renderFlight = (flight) => {
		return (
			<div class="column">
				<div id={flight.id} class="card" >

					<div class="card-body">
						<tr key={flight.id}>
							<h6 >departure time: {flight.departure_time}</h6>
							<h6 >origin country: {flight.origin_country_id}</h6>
							<h6 >destination country:{flight.destination_country_id}</h6>
						</tr>
					</div>
				</div>
			</div>


		)
	}

	const Send = () => {
		console.log(FlightByParameter.values)
		PostService.AddToBack(
			"http://127.0.0.1:8000/get_flights_by_parameters",
			FlightByParameter.values
		).then((data) => {
			console.log(data);
			setFlightsList(data)
		}, (error) => {
			alert(error)
		});
	};
	const FlightByParameter = useFormik({
		initialValues: {
			origin_country_id: "",
			destination_country_id: "",
			departure_time: "",
		},
		onSubmit: Send,
	});
	let flightsListToDisplay = flightsList.map(renderFlight)
	return (
		<div id="booking" class="section">
			<div class="section-center">
				<div class="container">
					<div class="row">
						<div class="booking-form">
							<form onSubmit={FlightByParameter.handleSubmit}>
								{/*<div class="form-group">
									<div class="form-checkbox">
										<label for="roundtrip">
											<input type="radio" id="roundtrip" name="flight-type" />
											<span></span>Roundtrip
										</label>
										<label for="one-way">
											<input type="radio" id="one-way" name="flight-type" />
											<span></span>One way
										</label>
										<label for="multi-city">
											<input type="radio" id="multi-city" name="flight-type" />
											<span></span>Multi-City
										</label>
	</div>
	</div>*/}
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<span class="form-label">Flying from</span>
											<input
												class="form-control"
												type="text"
												id="origin_country_id"
												onChange={FlightByParameter.handleChange}
												name="origin_country_id"
												className="form-control"
												placeholder="origin country id"
											/>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<span class="form-label">Flyning to</span>
											<input
												class="form-control"
												type="text"
												id="destination_country_id"
												onChange={FlightByParameter.handleChange}
												name="destination_country_id"
												className="form-control"
												placeholder="destination country id"
											/>
										</div>
									</div>
								</div>
								<div class="row">
									{/* <div class="col-md-3">
										<div class="form-group">
											<span class="form-label">Departing</span>
											<input
												class="form-control"
												type="datetime-local"
												id="departure_time"
												onChange={FlightByParameter.handleChange}
												name="departure_time"
												className="form-control"
											/>
										</div>
									</div> */}
									<div class="col-md-3">
										<div class="form-btn">
											<button type="submit" class="submit-btn">Show flights</button>
										</div>
									</div>
									{/*<div class="col-md-3">
										<div class="form-group">
											<span class="form-label">Returning</span>
											<input class="form-control" type="date" required />
										</div>
									</div>
									<div class="col-md-2">
										<div class="form-group">
											<span class="form-label">Adults (18+)</span>
											<select class="form-control">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-md-2">
										<div class="form-group">
											<span class="form-label">Children (0-17)</span>
											<select class="form-control">
												<option>0</option>
												<option>1</option>
												<option>2</option>
											</select>
											<span class="select-arrow"></span>
										</div>
</div>*/}
								</div>
								{/*<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<span class="form-label">Travel class</span>
											<select class="form-control">
												<option>Economy class</option>
												<option>Business class</option>
												<option>First class</option>
											</select>
											<span class="select-arrow"></span>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-btn">
											<button class="submit-btn">Show flights</button>
										</div>
									</div>
</div>*/}
							</form>
						</div>
						<div>
							{flightsListToDisplay}
						</div>
					</div>
				</div>
			</div>
		</div>
	)


}
