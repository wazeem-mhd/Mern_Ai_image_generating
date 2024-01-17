import express from "express";
import { sampleDemo, generateImage } from "../controller/DalleController.js";

const router = express.Router();

router.get("/", sampleDemo);
router.post("/", generateImage);

export default router;
