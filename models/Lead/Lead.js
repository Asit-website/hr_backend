import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
    LeadOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    Company: String,
    FirstName: String,
    LastName: String,
    Title: String,
    Email: String,
    Phone: Number,
    Fax: String,
    Mobile:  Number,
    Website:  String,
    LeadSource:  String,
    NoOfEmployee:  String,
    Industry:  String,
    LeadStatus:  String,
    AnnualRevenue:  String,
    Rating:  String,
    EmailOptOut:  String,
    SkypeID:  String,
    SecondaryEmail:  String,
    Twitter:  String,
     Street:String ,
     City:String ,
     State:String ,
     ZipCode:String ,
     Country:String ,
     DescriptionInfo:String ,
     image:String
  });

  const Lead = mongoose.model("Lead", mySchema);

  export default Lead;