import express from "express";
const app = express();
import cors from "cors";
import userRouter from "./router/userRouter.js";
import hrRouter from "./router/hrRouter.js";
import activityRouter from "./router/activityRouter.js";
import leaveRouter from "./router/leaveRouter.js";
import totalLeaveRouter from "./router/totaLeaveRouter.js";
import adminRouter from "./router/adminRouter.js";
import verifyRouter from "./router/verifyRouter.js";
import projectRouter from "./router/projectRouter.js";
import holidayRouter from "./router/holidayRouter.js";
import taskRouter from "./router/taskRouter.js";
import chatRouter from "./router/chatRouter.js";
import notification from "./router/notification.js"
import clock from "./router/clockRouter.js"
import award from "./router/awardRouter.js"

// import announcementRouter from "./router/announcementRouter.js";
import attendanceRouter from "./router/attendanceRouter.js";
import authRouter from "./router/authRouter.js";
import systemRouter from "./router/systemRouter.js";
// import apprisalRouter from "./router/apprisalRouter.js"
// import indicatorRouter from "./router/indicatorRouter.js";
import { connectDb } from "./db/user_conn.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import cron from 'node-cron';

import dotenv from "dotenv";
import User from "./models/User/User.js";
import ActivityTracker from "./models/ActivityTracker/ActivityTracker.js";
dotenv.config();
const port = process.env.PORT;

//Database Connection
connectDb();

// app.use(
//   cors({
//     origin: process.env.ORIGIN_URL,
//     credentials: true,
//     methods: ["get", "post", "delete", "put"],
//   })
// );
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
  })
)



app.use("/user", userRouter);
app.use("/hr", hrRouter);
app.use("/activity", activityRouter);
app.use("/leave", leaveRouter);
app.use("/totalLeave", totalLeaveRouter);
app.use("/admin", adminRouter);
app.use("/verify", verifyRouter);
app.use("/project", projectRouter);
app.use("/holiday", holidayRouter);
app.use("/task", taskRouter);
app.use("/chat", chatRouter);
app.use("/notification", notification);
app.use("/clock", clock);
app.use("/award" ,award);

// app.use("/announcement", announcementRouter);
app.use("/attendance", attendanceRouter);
app.use("/auth", authRouter);
app.use("/system", systemRouter); 

const task = cron.schedule('55 23 * * *', async () => {
// const task = cron.schedule('* * * * *', async () => {
  // console.log('Cron job ran at 11:55 PM');
  let users = await User.find({ role: { $ne: "ADMIN" } });
  let todayDate=new Date().toLocaleDateString('en-GB');
  let todayAttendances=await ActivityTracker.find({date1: todayDate}, {'user._id': 1, _id: 0});
  // console.log(users);
  // console.log(todayAttendances);
  let arr=[];
  for(let i of todayAttendances)
  {
    if(!arr.includes(i.user._id))
    {
      arr.push(i.user._id);
    }
  }
  let absentUsers=users.filter(x=>!arr.includes(x._id));

  let arr1=[];
  let date=new Date().getTime();
  for(let i of absentUsers)
  {
    arr1.push({
      user: i, date , date1: todayDate, clockIn: 0, clockOut: 0, late: 0, overtime: 0, total: 0, message: ''
    });
  }
  await ActivityTracker.insertMany(arr1, {ordered: false});
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // India timezone
});

task.start();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Listening on ", port);
});
