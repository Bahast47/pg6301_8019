const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const orders = [
  {
    id: 1,
    travelFrom: "Oslo",
    travelTo: "London",
    departureDate: "13-Aug-2021",
    returnDate: "23-Aug-2021",
  },
  {
    id: 2,
    travelFrom: "Oslo",
    travelTo: "Hong Kong",
    departureDate: "11-Aug-2021",
    returnDate: "27-Aug-2021",
  },
];

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/orders", (req, res) => {
  console.log(orders);
  res.json(orders);
});

app.get("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = orders.find((b) => b.id === id);
  res.json(book);
});

app.put("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = orders.findIndex((b) => b.id === id);
  const { travelFrom, travelTo, departureDate, returnDate } = req.body;
  orders[bookIndex] = { travelFrom, travelTo, departureDate, returnDate, id };
  res.status(200).end();
});

app.post("/api/orders", (req, res) => {
  const { travelFrom, travelTo, departureDate, returnDate } = req.body;
  console.log(req.body);
  orders.push({
    travelFrom,
    travelTo,
    departureDate,
    returnDate,
    id: orders.length + 1,
  });
  res.status(201).end();
});

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/profile", (req, res) => {
  let username = req.cookies.username;
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});

app.post("/api/login", (req, res) => {
  const { username } = req.body;
  res.cookie("username", username);
  res.end();
});

const discoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.use(async (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (Authorization) {
    const { userinfo_endpoint } = await fetchJson(discoveryURL);
    req.userinfo = await fetchJson(userinfo_endpoint, {
      headers: {
        Authorization,
      },
    });
  }
  next();
});

app.get("/api/profile", async (req, res) => {
  if (!req.userinfo) {
    return res.send(401);
  }

  return res.json(req.userinfo);
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  next();
});

const server = app.listen(8080, () => {
  console.log(`server started on http://localhost:${server.address().port}`);
});
