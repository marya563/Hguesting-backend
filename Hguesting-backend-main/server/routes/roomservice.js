import express from 'express';
const router= express.Router();
import RoomService from '../models/roomservice.js';
import cors from 'cors';
import { updateRoomService, getRoomService, getRoomServiceById, addRoomService, deleteRoomService, getimage} from "../controllers/roomservice.js";
import multer3 from '../middleware/multer3.js';

router.use(cors());
router.get("/uploads/:image_name", getimage);
router.get("/getRoomService", getRoomService);
router.get("/getRoomServiceById/:id", getRoomServiceById);
router.put("/updateRoomService/:id", updateRoomService);
router.post("/addRoomService",multer3 , addRoomService);
router.delete("/deleteRoomService/:id", deleteRoomService);


export default router;