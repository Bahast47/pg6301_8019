import * as React from "react";
import { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePageGoogle } from "./ProfilePageGoogle";
import { fetchJson } from "./http";
import { LoginPageGoogle } from "./LoginPageGoogle";
import { LoginCallbackPage } from "./LoginCallbackPage";
import { OrdersPage } from "./OrdersPage";
import { BookFlightPage } from "./BookFlightPage";
import { EditFlightPage } from "./EditFlightPage";
import { orderApi } from "./FetchingBooking";
import { LoginPage } from "./LoginPage";
import { ProfilePage } from "./ProfilePage";

export function Application() {
  const [access_token, setAccess_token] = useState();

  const googleIdentityProvider = {
    discoveryURL:
      "https://accounts.google.com/.well-known/openid-configuration",
    client_id:
      "998378037697-uuftr27t4vrska32517ketkrcfj2jmai.apps.googleusercontent.com",
  };

  async function loadProfile() {
    return fetchJson("/api/profile", {
      headers: {
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to={"/"}>Home</Link>
      </nav>
      <main>
        <Switch>
          <Route path={"/"} exact>
            <h1>Welcome to Trivago</h1>
            <ul>
              <li>
                <Link to={"/profileGoogle"}>Profile for Google</Link>
              </li>
              <li>
                <Link to={"/loginGoogle"}>Login with Google</Link>
              </li>
              <li>
                <Link to={"/profile"}>Profile</Link>
              </li>

              <li>
                <Link to="/login">Create Profile</Link>
              </li>

              <li>
                <Link to={"/orders"}>Orders</Link>
              </li>
              <li>
                <Link to={"/create"}>Book a flight</Link>
              </li>
            </ul>
          </Route>
          <Route path={"/orders"}>
            <OrdersPage orderApi={orderApi} />
          </Route>
          <Route path={"/create"}>
            <BookFlightPage />
          </Route>
          <Route path={"/orders/:id/edit"}>
            <EditFlightPage orderApi={orderApi} />
          </Route>
          <Route path={"/profileGoogle"}>
            <ProfilePageGoogle loadProfile={loadProfile} />
          </Route>
          <Route path={"/loginGoogle"} exact>
            <LoginPageGoogle identityProvider={googleIdentityProvider} />
          </Route>

          <Route path={"/profile"}>
            <ProfilePage loadProfile={loadProfile} />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path={"/login/callback"}>
            <LoginCallbackPage
              identityProvider={googleIdentityProvider}
              onAccessToken={(access_token) => setAccess_token(access_token)}
            />
          </Route>
          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
