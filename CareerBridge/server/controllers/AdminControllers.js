const Job = require('../models/JobModel')
const User = require('../models/UserModel')
const Application = require('../models/AppModel')
const cloudinary = require('cloudinary')
const nodemailer = require('nodemailer')

/*
MAIL TRANSPORTER
Use your Gmail App Password here
NOT normal Gmail password
*/

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


// ========================================
// GET ALL JOBS
// ========================================

exports.getAllJobs = async (req, res) => {
    try {

        const jobs = await Job.find()

        res.status(200).json({
            success: true,
            jobs
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


// ========================================
// GET ALL USERS
// ========================================

exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find()

        res.status(200).json({
            success: true,
            users
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


// ========================================
// GET ALL APPLICATIONS
// ========================================

exports.getAllApp = async (req, res) => {
    try {

        const applications = await Application.find()
            .populate("job applicant")

        res.status(200).json({
            success: true,
            applications
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


// ========================================
// UPDATE APPLICATION STATUS + EMAIL NOTIFY
// ========================================

exports.updateApplication = async (req, res) => {

    try {

        const application =
            await Application.findById(req.params.id)
                .populate("job applicant")

        if (!application) {

            return res.status(404).json({
                success: false,
                message: "Application not found"
            })

        }

        /*
        UPDATE STATUS
        */

        application.status = req.body.status

        await application.save()

        const applicant = application.applicant
        const job = application.job

        /*
        SEND EMAIL
        */

        try {

            console.log("===================================")
            console.log("ATTEMPTING TO SEND MAIL")
            console.log("Applicant Email:", applicant?.email)
            console.log("EMAIL_USER:", process.env.EMAIL_USER)
            console.log("EMAIL_PASS EXISTS:", !!process.env.EMAIL_PASS)
            console.log("===================================")

            const info = await transporter.sendMail({

                from: process.env.EMAIL_USER,

                to: applicant.email,

                subject:
                    `Application Status Updated - ${job.title}`,

                html: `
<div style="background-color:#f4f7fb;padding:40px 20px;font-family:Arial,sans-serif;">
    
    <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:30px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:32px;">
                CareerBridge
            </h1>

            <p style="color:#e0e7ff;margin-top:10px;font-size:15px;">
                Application Status Notification
            </p>
        </div>

        <div style="padding:40px 35px;">

            <h2 style="color:#111827;margin-bottom:20px;">
                Hello ${applicant.name},
            </h2>

            <p style="font-size:16px;color:#374151;line-height:28px;">
                Your application for the role of 
                <strong>${job.title}</strong> 
                at 
                <strong>${job.companyName}</strong> 
                has been updated by the recruiter.
            </p>

            <div style="
                margin:30px 0;
                padding:25px;
                border-radius:12px;
                background:${req.body.status === "accepted"
                    ? "#ecfdf5"
                    : req.body.status === "rejected"
                    ? "#fef2f2"
                    : "#eff6ff"};
                border:1px solid ${
                    req.body.status === "accepted"
                    ? "#10b981"
                    : req.body.status === "rejected"
                    ? "#ef4444"
                    : "#3b82f6"
                };
            ">

                <p style="margin:0;font-size:15px;color:#6b7280;">
                    CURRENT APPLICATION STATUS
                </p>

                <h1 style="
                    margin-top:10px;
                    margin-bottom:0;
                    font-size:34px;
                    color:${
                        req.body.status === "accepted"
                        ? "#059669"
                        : req.body.status === "rejected"
                        ? "#dc2626"
                        : "#2563eb"
                    };
                    text-transform:uppercase;
                ">
                    ${req.body.status}
                </h1>

            </div>

            <div style="
                background:#f9fafb;
                border-radius:12px;
                padding:25px;
                margin-bottom:30px;
                border:1px solid #e5e7eb;
            ">

                <h3 style="margin-top:0;color:#111827;">
                    Job Details
                </h3>

                <p style="margin:10px 0;color:#374151;">
                    <strong>Role:</strong> ${job.title}
                </p>

                <p style="margin:10px 0;color:#374151;">
                    <strong>Company:</strong> ${job.companyName}
                </p>

                <p style="margin:10px 0;color:#374151;">
                    <strong>Location:</strong> ${job.location}
                </p>

                <p style="margin:10px 0;color:#374151;">
                    <strong>Experience:</strong> ${job.experience}
                </p>

            </div>

            <div style="text-align:center;margin:40px 0;">
                
                <a 
                    href="http://localhost:5173/applied"
                    style="
                        background:linear-gradient(135deg,#4f46e5,#7c3aed);
                        color:white;
                        padding:16px 32px;
                        text-decoration:none;
                        border-radius:10px;
                        font-size:16px;
                        font-weight:bold;
                        display:inline-block;
                    "
                >
                    View Applications
                </a>

            </div>

            <p style="font-size:15px;color:#6b7280;line-height:26px;">
                Thank you for using <strong>CareerBridge</strong>.
                We wish you success in your career journey.
            </p>

            <br/>

            <p style="color:#111827;font-size:15px;">
                Best Regards,<br/>
                <strong>CareerBridge Team</strong>
            </p>

        </div>

        <div style="
            background:#111827;
            color:#9ca3af;
            text-align:center;
            padding:20px;
            font-size:13px;
        ">
            © 2026 CareerBridge. All rights reserved.
        </div>

    </div>

</div>
`

            })

            console.log("===================================")
            console.log("MAIL SENT SUCCESSFULLY")
            console.log(info.response)
            console.log("===================================")

        }

        catch (mailErr) {

            console.log("===================================")
            console.log("MAIL ERROR")
            console.log(mailErr)
            console.log("===================================")

        }

        res.status(200).json({

            success: true,
            message: "Application Updated"

        })

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        })

    }

}


// ========================================
// DELETE APPLICATION
// ========================================

exports.deleteApplication = async (req, res) => {

    try {

        await Application.findByIdAndRemove(req.params.id)

        res.status(200).json({
            success: true,
            message: "Application Deleted"
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// GET SINGLE APPLICATION
// ========================================

exports.getApplication = async (req, res) => {

    try {

        const application = await Application.findById(req.params.id)
            .populate("job applicant")

        res.status(200).json({
            success: true,
            application
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// UPDATE USER ROLE
// ========================================

exports.updateUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        user.role = req.body.role

        await user.save()

        res.status(200).json({
            success: true,
            message: "User Updated"
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// DELETE USER
// ========================================

exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndRemove(req.params.id)

        res.status(200).json({
            success: true,
            message: "User Deleted"
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// GET USER
// ========================================

exports.getUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        res.status(200).json({
            success: true,
            user
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// UPDATE JOB
// ========================================

exports.updateJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)

        const logoToDelete_Id = job.companyLogo.public_id

        await cloudinary.v2.uploader.destroy(logoToDelete_Id)

        const logo = req.body.companyLogo

        const myCloud = await cloudinary.v2.uploader.upload(logo, {
            folder: 'logo',
            crop: "scale",
        })

        req.body.companyLogo = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }

        await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Job Updated"
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// GET SINGLE JOB
// ========================================

exports.getJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)

        res.status(200).json({
            success: true,
            job
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}


// ========================================
// DELETE JOB
// ========================================

exports.deleteJob = async (req, res) => {

    try {

        /*
        DELETE ALL APPLICATIONS
        RELATED TO THIS JOB
        */

        await Application.deleteMany({
            job: req.params.id
        })

        /*
        DELETE JOB
        */

        await Job.findByIdAndRemove(req.params.id)

        res.status(200).json({
            success: true,
            message: "Job Deleted"
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}
exports.getPendingRecruiters = async (req, res) => {

    try {

        const recruiters = await User.find({

            role: "recruiter",
            isVerifiedRecruiter: false

        })

        res.status(200).json({

            success: true,
            recruiters

        })

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        })

    }

}
exports.approveRecruiter = async (req, res) => {

    try {

        const recruiter = await User.findById(req.params.id)

        if (!recruiter) {

            return res.status(404).json({

                success: false,
                message: "Recruiter not found"

            })

        }

        recruiter.isVerifiedRecruiter = true
        recruiter.recruiterStatus = "trusted"

        await recruiter.save()

        res.status(200).json({

            success: true,
            message: "Recruiter approved successfully"

        })

    }
catch (err) {

    console.log("APPROVE RECRUITER ERROR")
    console.log(err)

    res.status(500).json({

        success: false,
        message: err.message

    })

}

}

exports.rejectRecruiter = async (req, res) => {

    try {

        const recruiter = await User.findById(req.params.id)

        if (!recruiter) {

            return res.status(404).json({

                success: false,
                message: "Recruiter not found"

            })

        }

        recruiter.recruiterStatus = "rejected"

        await recruiter.save()

        res.status(200).json({

            success: true,
            message: "Recruiter rejected"

        })

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        })

    }

}