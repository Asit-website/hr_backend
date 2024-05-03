import { Router } from "express";
import {
  ChangeCurrentAdminPassword,
  CreateNewHr,
  CreateNewUser,
  createAdmin,
  getAdminProfile,
  getAdmins,
  loginAdmin,
  updateAdmindetails,
  postIndicator,
  getIndicator,
  deleteIndicator,
  updateIndicator,
  postApprisal,
  getApprisal,
  fetchEmployee,
  deleteApprisal,
  updateApprisal,
  postAssets,
  getAssets,
  deleteAssets,
  updateAssets,
  postTracking,
  getTracking,
  deleteTracking,
  updateTracking,
  postAnnouncement,
  updateAnnouncement,
  getAnnouncement,
  deleteAnnouncement,
  fetchAllEmployee,
  postTermination,
  getTermination,
  updateTermination,
  deleteTermination,
  postWarning,
  getWarning,
  deleteWarning,
  updateWarning,
  postComplain,
  getComplain,
  deleteComplain,
  updateComplain,
  postResignation,
  getResignation,
  deleteResignation,
  updateResignation,
  postPromotion,
  getPromotion,
  deletePromotion,
  updatePromotion,
  createTrainer,
  getTrainer,
  deleteTrainer,
  updateTrainer,
  createTrainingList,
  getTrainingList,
  deleteTrainngList,
  updateTrainingList,
  createTransfer,
  getTransfer,
  updateTransfer,
  deleteTransfer,
  createHoliday,
  getHoliday,
  deleteHoliday,
  updateHoliday,
  createTrip,
  getTrip,
  deleteTrip,
  updateTrip,
  getLeads,
  createLeads,
  updateLeads,
  deleteLeads,
  updateLeadImage,
  createInvoice,
  getInvoice,
  deleteInvoice,
  updateInvoice
} from "../controller/adminController.js";
import isAuthenticated from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
const router = Router();

router.get("/getAdmins", getAdmins);
router.get("/getAdminProfile", isAuthenticated, getAdminProfile);
router.post("/loginAdmin", loginAdmin);
router.post("/changePassword", isAuthenticated, ChangeCurrentAdminPassword);

router.post("/createHr", isAuthenticated, CreateNewHr);

router.post("/createAdmin", createAdmin);

router.get("/topDash", isAuthenticated, async (req, res) => {
  try {
    const data = await topDash({ ...req.query, auth: req.user });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createUser1", isAuthenticated, CreateNewUser);

router.put("/updateAdmin", isAuthenticated, updateAdmindetails);

router.post('/postIndi',postIndicator);
router.get("/getIndicator", getIndicator);
router.delete("/deleteIndicator/:id", deleteIndicator);
router.put("/updateIndicator/:id", updateIndicator);

router.post("/fetchEmployee" , fetchEmployee);
router.get("/fetchEmployee" , fetchAllEmployee);

router.post('/postapp',postApprisal);
router.get('/getApp',getApprisal);
router.delete("/deleteApp/:id", deleteApprisal);
router.put("/updateApp/:id", updateApprisal);

router.post('/postAsset',postAssets);
router.get('/getAsset',getAssets);
router.delete("/deleteAsset/:id", deleteAssets);
router.put("/updateAsset/:id", updateAssets);

router.post('/postTrack',postTracking);
router.get('/getTrack',getTracking);
router.delete("/deleteTrack/:id", deleteTracking);
router.put("/updateTrack/:id", updateTracking);

router.post('/postAnnouncement',postAnnouncement);
router.get('/getAnnouncement', getAnnouncement);
router.delete("/deleteAnnouncement/:id",deleteAnnouncement);
router.put("/updateAnnouncement/:id", updateAnnouncement);

router.post('/postTermination',postTermination);
router.get('/getTermination', getTermination);
router.delete("/deleteTermination/:id",deleteTermination);
router.put("/updateTermination/:id", updateTermination);

router.post('/postWarning',postWarning);
router.get('/getWarning', getWarning);
router.delete("/deleteWarning/:id",deleteWarning);
router.put("/updateWarning/:id", updateWarning);

router.post('/postComplain',postComplain);
router.get('/getComplain', getComplain);
router.delete("/deleteComplain/:id",deleteComplain);
router.put("/updateComplain/:id", updateComplain);

router.post('/postResignation',postResignation);
router.get('/getResignation', getResignation);
router.delete("/deleteResignation/:id",deleteResignation);
router.put("/updateResignation/:id",updateResignation);

router.post('/postPromotion',postPromotion);
router.get('/getPromotion', getPromotion);
router.delete("/deletePromotion/:id",deletePromotion);
router.put("/updatePromotion/:id",updatePromotion);

router.post('/postTrainer',createTrainer);
router.get('/getTrainer', getTrainer);
router.delete("/deleteTrainer/:id",deleteTrainer);
router.put("/updateTrainer/:id",updateTrainer);

router.post('/postList',createTrainingList);
router.get('/getList', getTrainingList);
router.delete("/deleteList/:id",deleteTrainngList);
router.put("/updateList/:id",updateTrainingList);

router.post('/createTransfer',createTransfer);
router.get('/getTransfer', getTransfer);
router.delete("/deleteTransfer/:id",deleteTransfer);
router.put("/updateTransfer/:id",updateTransfer);

router.post('/createHoliday',createHoliday);
router.get('/getHoliday', getHoliday);
router.delete("/deleteHoliday/:id",deleteHoliday);
router.put("/updateHoliday/:id",updateHoliday);

router.post('/createTrip',createTrip);
router.get('/getTrip', getTrip);
router.delete("/deleteTrip/:id",deleteTrip);
router.put("/updateTrip/:id",updateTrip);

router.delete("/deleteLead/:id",deleteLeads);
router.put("/updateLead/",updateLeads);
router.post("/updateLead/:id",updateLeadImage);

router.post("/createInvoice", createInvoice);
router.get('/getInvoice', getInvoice);
router.delete("/deleteInvoice/:id",deleteInvoice);
router.put("/updateInvoice/:id",updateInvoice);





export default router;
