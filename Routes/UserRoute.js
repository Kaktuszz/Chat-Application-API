import express from "express";
import { getUser, updateUser, deleteUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get('/:id', getUser)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)

export default router;