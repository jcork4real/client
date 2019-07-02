import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialDatatable from "material-datatable";
import DetailsButton from "./DetailsButton";
import FlightDetails from "./FlightDetails";
const columns = [
  { name: "Date", field: "date" },
  { name: "Flight No.", field: "flight_number" },
  { name: "Trip Origin", field: "route_start" },
  { name: "Trip Destination", field: "route_end" },
  { name: "Duration", field: "duration" },
  { name: "Aircraft", field: "aircraft_id" },
  { name: "Pending", field: "pending" },
  { name: "Flight details", field: "button" }
];

const options = {
  filterType: "dropdown",
  responsive: "scroll"
};
const LogBook = props => {
  const handleDelete = e => {
    console.log('ahhhhhhhh')
  }
  const viewDetails = id => {
    axios
      .get(`/api/flights/${id}`)
      .then(res => {
        setSingleFlight(res.data);
        setOpen(true);
      })
      .catch(err => console.error(err));
  };
  const [flights, setFlights] = useState([]);
  const [open, setOpen] = useState(false);
  const [singleFlight, setSingleFlight] = useState({});
  useEffect(() => {
    axios
      .get("/api/flights")
      .then(res => {
        const flightsWithButton = res.data.map(item => ({
          ...item,
          aircraft_id: `${item.make} ${item.model}`,
          button: (
            <Link
              onClick={() => viewDetails(item.id)}
              to={"/dashboard/logbook"}
            >
              <DetailsButton />
            </Link>
          ),
          pending: <input type="checkbox" disabled/>
        }));
        setFlights(flightsWithButton);
      })
      .catch(err => console.error(err));
  }, []);
  console.log("FLIGHTS: ", flights);
  return (
    <React.Fragment>
      <MaterialDatatable
        title={"Flight Log Book"}
        data={flights}
        columns={columns}
        options={options}
        onRowsDelete={() => console.log('asdfasdfas')}
      />
      <FlightDetails
        open={open}
        handleClose={() => setOpen(false)}
        handleClickOpen={() => setOpen(true)}
        flight={singleFlight}
      />
    </React.Fragment>
  );
};

export default LogBook;
