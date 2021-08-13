import React, { useState } from "react";
import { InputField } from "./InputField";

export function BookFlightPage() {
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTo, setTravelTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting", {
      travelFrom,
      travelTo,
      departureDate,
      returnDate,
    });
    await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify({ travelFrom, travelTo, departureDate, returnDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Book a flight</h1>
      <InputField
        label={"Travel from"}
        value={travelFrom}
        onChangeValue={setTravelFrom}
      />
      <InputField
        label={"Travel to"}
        value={travelTo}
        onChangeValue={setTravelTo}
      />
      <InputField
        label={"Departure date"}
        value={departureDate}
        onChangeValue={setDepartureDate}
        type="date"
      />
      <InputField
        label={"Return date"}
        value={returnDate}
        onChangeValue={setReturnDate}
        type="date"
      />
      <button>Submit</button>
    </form>
  );
}
