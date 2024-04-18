import Lead from "../models/Lead/Lead.js"
import { uploadToCloudinary } from "../utils/cloudinary.js";


export const createLead = async (req, res) => {
    try {


        const {
            LeadOwner,
            image,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo } = req.body;



        const leadDetail = await Lead.create({
            LeadOwner: LeadOwner,
            Company: Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo,
            image
        });


        return res.status(200).json({
            status: true,
            message: "Successfuly created ",
            data: leadDetail
        })

    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error "
        })
    }
}


export const getAllLead = async ({ id, query, page, perPage, userId }) => {

    let and = [];
    if (id && id !== "" && id !== "undefined") {
        and.push({ _id: id });
    }
    if (query && query !== "" && query !== "undefined") {
        console.log(query);
        and.push({ name: { $regex: query, $options: "i" } });
    }
    if (and.length === 0) {
        and.push({});
    }

    let data;
    if (page && page !== "" && page !== "undefined") {
        data = await User.find({ $and: and }).skip((page - 1) * perPage).limit(perPage);
    }
    else {
        // data = await Lead.find({ $and: and }).populate("LeadOwner")
        data = await Lead.find({ LeadOwner: userId }).populate("LeadOwner");
    }
    return { status: true, data };

}

export const getAllLead2 = async ({ id, query, page, perPage }) => {

    let and = [];
    if (id && id !== "" && id !== "undefined") {
        and.push({ _id: id });
    }
    if (query && query !== "" && query !== "undefined") {
        console.log(query);
        and.push({ name: { $regex: query, $options: "i" } });
    }
    if (and.length === 0) {
        and.push({});
    }

    let data;
    if (page && page !== "" && page !== "undefined") {
        data = await User.find({ $and: and }).skip((page - 1) * perPage).limit(perPage);
    }
    else {
        data = await Lead.find({ $and: and }).populate("LeadOwner")
    }
    return { status: true, data };

}


export const postImage = async (req, res) => {

    const { image } = req.files;

    const details = await uploadToCloudinary(image.tempFilePath);
    console.log("detail ", details);

    return res.status(200).json({
        status: true,
        data: details?.secure_url
    })

}

export const deleteLeads = async (req, res) => {
    const { id } = req.params;

    const data = await Lead.findByIdAndDelete(id);

    return {
        data: data,
        status: true,
        message: "delete successfully"
    }
}
export const editLead = async (req, res) => {
    try {
        const {
            LeadOwner,
            image,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo
        } = req.body;

        // Ensure id is passed as a parameter
        const id = req.params.id;

        console.log("id ", id);

        // Update lead details
        const leadDetail = await Lead.findByIdAndUpdate(id, {
            LeadOwner,
            image,
            Company,
            FirstName,
            LastName,
            Title,
            Email,
            Phone,
            Fax,
            Mobile,
            Website,
            LeadSource,
            NoOfEmployee,
            Industry,
            LeadStatus,
            AnnualRevenue,
            Rating,
            EmailOptOut,
            SkypeID,
            SecondaryEmail,
            Twitter,
            Street,
            City,
            State,
            ZipCode,
            Country,
            DescriptionInfo
        }, { new: true });

        console.log("lead ", leadDetail);

        return res.status(200).json({
            status: true,
            message: "Successfully updated",
            data: leadDetail
        });
    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message // Sending specific error message to client
        });
    }
};
