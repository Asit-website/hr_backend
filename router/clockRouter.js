import { Router } from "express";
import {createClock , getClockByUserDate , getAttendanceDetails , getAllAttendence , updateAttendance , deleteAttendence} from "../controller/clockController.js"

const router = Router();

router.post('/createClock/:userId',createClock);
router.post('/getClock/:userId',getClockByUserDate);
router.post("/attendencedetail" , getAttendanceDetails);
router.get("/allAttendence" , getAllAttendence);
router.post("/updateAttendance/:id" , updateAttendance);
router.delete("/deleteAttendence/:id" , deleteAttendence);


export default router;
