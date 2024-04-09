import express from "express";
import userRoute from "./routers/user.Routes.js";
import cookieparser from "cookie-parser";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(cookieparser());

app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("server Up!!");
});

app.use("/api/v1/users", userRoute);

app.all("*", (req, res) => {
  res.status(404).send("oops ! 404 page not found");
});

app.use(errorMiddleware);

export default app;
