import * as React from "react";
import { useLoading } from "./useLoading";

export function ProfilePageGoogle({ loadProfile }) {
  const { loading, error, data } = useLoading(async () => await loadProfile());

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>An error occurred</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <div>{data.name}</div>
      {data.picture && (
        <div>
          <img src={data.picture} />
        </div>
      )}
    </div>
  );
}
