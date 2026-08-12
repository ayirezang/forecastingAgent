import express from "express";
import cors from "cors";
const app = express();

import foreCastRouter from "./routes/forecastRoutes.js";

//middleware

app.use(cors());
app.use(express.json());

//routes
app.use(foreCastRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
