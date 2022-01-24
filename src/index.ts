import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import "./controllers/rootController"
import "./controllers/loginController";

import { AppRouter } from "./AppRouter";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ["sdfsdf"] }))

app.use(AppRouter.getInstance());


app.listen(5000, () => {
  console.log("Server i running on port 5000");
})