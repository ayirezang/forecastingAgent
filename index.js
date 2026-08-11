import express from "express";
import cors from "cors";
const app = express();

//middleware

app.use(cors());
app.use(express.json());

//routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
