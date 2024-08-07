import { Router } from "express";
import { postLeave, updateLeave,monthlyLeave ,  getUserLeaves,getTotalLeaveCount, getUserLeaveById, deleteLeave, deleteAllLeaves , rejectLeaveHandler ,  acceptLeaveHandler   , GetTodayLeave} from "../controller/leaveController.js";
import isAuthenticated from "../middleware/auth.js";


const router = Router();

router.post("/postLeave", isAuthenticated, async (req, res) => {
  try {
    const data = await postLeave({ ...req.body, auth: req.user });
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateLeave/:id", isAuthenticated, async (req, res) => {
  try {
    const data = await updateLeave({
      ...req.body,
      auth: req.user,
      id: req.params.id,
    });
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getUserLeaves", async (req, res) => {
  try {
    const data = await getUserLeaves({ ...req.query, auth: req.user });
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getUserLeaveById/:id", isAuthenticated, async (req, res) => {
  try {
    const data = await getUserLeaveById({
      ...req.query,
      auth: req.user,
      id: req.params.id,
    });
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getToalLeaveCount" , isAuthenticated , async(req ,res)=>{
  try {
    const data = await getTotalLeaveCount({
      ...req.query, auth: req.user
    });
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
})

router.delete("/deleteLeave/:id",isAuthenticated ,  async (req, res) => {
  try {

     console.log("id ",req.params.id);
    
    const data = await deleteLeave({auth: req.user, id: req.params.id});
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteAllLeaves", async (req, res) => {
  try {
    const data = await deleteAllLeaves();
    if (data.success) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/acceptLeave/:id" , async (req, res) => {
  try {
    const data = await acceptLeaveHandler({ ...req.body , ...req.params });
    if (data.status) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/rejectLeave/:id" , async (req, res) => {
  try {
    const data = await rejectLeaveHandler({ ...req.body  , ...req.params});
    if (data.status) {
      res.json(data);
    } else {
      res.status(400).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/monthlyLeave" , monthlyLeave);
// this is employe on leave routes 

router.get("/getTodayLeave" , GetTodayLeave);

export default router;
