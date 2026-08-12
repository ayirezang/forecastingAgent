import { Router } from "express";
import { getForeCast } from "../controller/foreCaster.js";
const router = Router();

router.get("/forecast/:product", getForeCast);

export default Router;
