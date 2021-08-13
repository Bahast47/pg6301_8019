import React from "react";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./ErrorView";

export function OrdersPage({ orderApi }) {
  const {
    data: orders,
    error,
    loading,
    reload,
  } = useLoading(async () => await orderApi.listOrders());

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !orders) {
    return <LoadingView />;
  }

  return (
    <>
      <h1>Order list:</h1>
      {orders.map(({ id, departureDate }) => (
        <li key={id}>
          <Link to={`/orders/${id}/edit`}>{departureDate}</Link>
        </li>
      ))}
    </>
  );
}
