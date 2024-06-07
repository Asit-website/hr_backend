import Branch from "../models/Branch/Branch.js";
import Department from "../models/Department/Department.js";
import Designation from "../models/Designation/Designation.js";
import LeaveType from "../models/LeaveType/LeaveType.js";
import OfferLetter from "../models/OfferLetter/OfferLetter.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { removeUndefined } from "../utils/util.js";
import Document from "../models/Document/Document.js";


import User from "../models/User/User.js";
export const postLeaveType = asyncHandler(async (req, res) => {
  const { name, days } = req.body;
  const existLeave = await LeaveType.findOne({ name });
  if (existLeave) {
    return res.status(400).json({
      success: false,
      message: "Leave Name Alreday Exist",
    });
  }
  const newLeaveType = await LeaveType.create({
    name,
    days,
    ts: new Date().getTime(),
    status: "true",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, newLeaveType, " successfully posted"));
});

export const updateLeaveType = asyncHandler(async (req, res) => {
  const { status, name, days } = req.body;
  const { id } = req.params;
  let updateObj = removeUndefined({ status, name, days });
  // console.log(status, name);
  // console.log(id);

  const updateuserLeaveType = await LeaveType.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateuserLeaveType, "Updated  Successfully"));
});

export const getLeaveTypes = asyncHandler(async (req, res) => {
  const data = await LeaveType.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, data, "LeaveTypees fetched Successfully"));
});

export const deleteLeaveType = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await LeaveType.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const postBranch = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const existBranchName = await Branch.findOne({ name });
  if (existBranchName) {
    return res.status(400).json({
      success: false,
      message: "Branch Name Alreday Exist",
    });
  }
  const newBranch = await Branch.create({
    name,
    ts: new Date().getTime(),
    status: "true",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, newBranch, " successfully posted", existBranchName));
});

export const updateBranch = asyncHandler(async (req, res) => {
  const { status, name } = req.body;
  const { id } = req.params;
  let updateObj = removeUndefined({ status, name });
  // console.log(status, name);
  // console.log(id);

  const updateuserBranch = await Branch.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateuserBranch, "Updated  Successfully"));
});

export const getBranchs = asyncHandler(async (req, res) => {
  const data = await Branch.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, data, "branches fetched Successfully"));
});

export const deleteBranch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Branch.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const postDepartment = asyncHandler(async (req, res) => {
  const { name, branch } = req.body;
  const existDepartment = await Department.findOne({ name });
  if (existDepartment) {
    return res.status(400).json({
      success: false,
      message: "Department Name Alreday Exist",
    });
  }
  const newDepartment = await Department.create({
    name,
    branch,
    ts: new Date().getTime(),
    status: "true",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, newDepartment, " successfully posted"));
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const { status, name } = req.body;
  const { id } = req.params;
  let updateObj = removeUndefined({ status, name });
  const updateuserDepartment = await Department.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateuserDepartment, "Updated  Successfully"));
});

export const getDepartments = asyncHandler(async (req, res) => {
  const data = await Department.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Departments fetched Successfully"));
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await Department.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});

export const postDesignation = asyncHandler(async (req, res) => {
  const { name, department } = req.body;
  console.log(req.body);
  const existDesignation = await Designation.findOne({ name });
  if (existDesignation) {
    return res.status(400).json({
      success: false,
      message: "Designation Name Alreday Exist",
    });
  }
  const newDesignation = await Designation.create({
    name,
    department,
    ts: new Date().getTime(),
    status: "true",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, newDesignation, " successfully posted"));
});

export const updateDesignation = asyncHandler(async (req, res) => {
  const { status, name } = req.body;
  const { id } = req.params;
  let updateObj = removeUndefined({ status, name });
  const updateuserDesignation = await Designation.findByIdAndUpdate(
    id,
    {
      $set: updateObj,
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updateuserDesignation, "Updated  Successfully"));
});

export const getDesignation = asyncHandler(async (req, res) => {


  const data = await Designation.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Designationes fetched Successfully"));


});
export const getDesignations = asyncHandler(async (req, res) => {


  const { id } = req.params;

  const designations = await Designation.find({ 'department._id': id }).select('name _id');

  return res
    .status(200)
    .json(new ApiResponse(200, designations, "Designationes fetched Successfully"));


});

export const getEmployess = asyncHandler(async (req, res) => {


  const { id } = req.params;

  const users = await User.find({ 'department._id': id }).select('fullName _id');

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched Successfully"));


});

export const deleteDesignation = asyncHandler(async (req, res) => {
  console.log('yes');
  const { id } = req.params;

  const data = await Designation.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Deleted   Successfully"));
});


export const createDocSetup = asyncHandler(async(req ,res)=>{
 try{
  const {name , requiredField} = req.body;
  console.log('naesm ',name , requiredField);


  const details = await Document.create({name , requiredField:requiredField});

   console.log('details ',details);

  //  console.log({documentType:documentType});

   
   return res.status(200).json({
    status:true ,
    message:"Successfuly created"
   })
 } catch(error){
  console.log(error);
 }
})


export const updateDocSetup = asyncHandler(async (req, res) => {
  const { name, requiredField } = req.body;
  const { id } = req.params;

  try {
    const details = await Document.findByIdAndUpdate(
      id,
      { name, requiredField },
      { new: true, runValidators: true }
    );

    if (!details) {
      return res.status(404).json({
        status: false,
        message: "Document not found",
      });
    }

    console.log('details', details);

    return res.status(200).json({
      status: true,
      message: "Successfully updated",
      data: details,
    });
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});


export const deleteDocSetup = asyncHandler(async(req ,res)=>{
  try{

    const {id} = req.params;

     const details = await Document.findByIdAndDelete(id);


     return res.status(200).json({
      status:true ,
      message:"Successfuly deleted"
     })
     
  }catch(error){
    console.log(error);
    return res.status(500).json({
      status:false ,
      message:"INTERNAL Server error "
    })
  }
})


export const fetchAllDocs = asyncHandler(async(req ,res)=>{
  try{

    const allDocs = await Document.find({});

    return res.status(200).json({
      status:true ,
      message:"done " , 
      data:allDocs
    })

  } catch(error){
 console.log(error);
  }
})

export const postLetter = asyncHandler(async(req,res)=>{
  try {
     const {letterName,letterSlip} = req.body;

     if(letterSlip === null){
       res.json({
         status:200,
         msg:"letter can not be send"
       })
     }

     else if(letterSlip === letterName.length){
        res.json({
           status:200,
           msg:"letter length should not be greater than 100 words",
           return:[{
              status:false,    
              message:"The letter is not reconized"
           }]
        })
     }

     const letter = await OfferLetter.create({letterName,letterSlip});

     
     console.log(letter);

     return res.status(200).json({
      status: true,
      message: 'letter created successfully',
      data: letter,
    });
  } 

  catch (error) {
     console.log("error",error);

     return res.status(500).json({
      status: 500,
      message: "Internal server error "
    })
  }
})

export const updateOoferLetter = asyncHandler(async(req,res)=>{
   const user = await User.find({});
   console.log(user.fullName);

   const emailList = user.map(user => user.email);

   console.log(emailList);


   const offerLetter = await OfferLetter.updateOne({emailList});
   
   return(
    {
      status:true,
      message:"successfully updated the offer letter",
      data:offerLetter
    }
   )

});