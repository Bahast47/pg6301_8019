import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "./LoadingView";
import { InputField } from "./InputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

function EditBookForm({ order }) {
  const [travelFrom, setTravelFrom] = useState(order.travelFrom);
  const [travelTo, setTravelTo] = useState(order.travelTo);
  const [departureDate, setDepartureDate] = useState(order.departureDate);
  const [returnDate, setReturnDate] = useState(order.returnDate);

  async function submit(e) {
    e.preventDefault();
    console.log("Submitting", {
      travelFrom,
      travelTo,
      departureDate,
      returnDate,
    });
    await fetch(`/api/orders/${order.id}`, {
      method: "PUT",
      body: JSON.stringify({ travelFrom, travelTo, departureDate, returnDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit your orders ({travelFrom})</h1>
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

export function EditFlightPage({ orderApi }) {
  const { id } = useParams();

  const {
    data: order,
    loading,
    error,
    reload,
  } = useLoading(async () => await orderApi.getOrder(id), [id]);

  if (error) {
    return <ErrorView error={error} reload={reload()} />;
  }

  if (loading || !order) {
    return <LoadingView />;
  }

  return <EditBookForm order={order} />;
}
