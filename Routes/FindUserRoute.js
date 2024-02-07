import express from "express";
import { findUsers } from "../Controllers/FindUserController.js";

const router = express.Router();

router.get("/:username", findUsers);

export default router;
