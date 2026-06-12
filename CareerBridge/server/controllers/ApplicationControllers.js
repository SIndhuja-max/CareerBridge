const Job = require('../models/JobModel')
const User = require('../models/UserModel')
const Application = require('../models/AppModel')
const mongoose = require('mongoose')


/*
CREATE APPLICATION
*/

exports.createApplication = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        const user = await User.findById(req.user._id)

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        /*
        Prevent recruiter from applying
        */

        if (user.role === "admin") {
            return res.status(400).json({
                success: false,
                message: "Recruiter cannot apply for jobs"
            })
        }

        /*
        Resume validation
        */

        if (
            !user.resume ||
            !user.resume.url ||
            user.resume.url.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Please upload resume first from profile section"
            })
        }

        /*
        Prevent duplicate application
        */

        const alreadyApplied = await Application.findOne({
            job: job._id,
            applicant: user._id
        })

        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You already applied for this job"
            })
        }

        /*
        Create application
        */

        const application = await Application.create({
            job: job._id,
            applicant: user._id,
            applicantResume: {
                public_id: user.resume.public_id || "",
                url: user.resume.url
            }
        })

        /*
STORE JOB ID
NOT APPLICATION ID
*/

if (!user.appliedJobs.includes(job._id)) {
    user.appliedJobs.push(job._id)
}

await user.save()

        res.status(200).json({
            success: true,
            message: "Application created successfully",
            application
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


/*
GET SINGLE APPLICATION
*/

exports.getSingleApplication = async (req, res) => {
    try {
        const application = await Application
            .findById(req.params.id)
            .populate('job applicant')

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        res.status(200).json({
            success: true,
            application
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


/*
GET ALL APPLICATIONS OF USER
*/

exports.getUsersAllApplications = async (req, res) => {
    try {
        const allApplications = await Application
            .find({ applicant: req.user._id })
            .populate('job')
            .populate('applicant')

        res.status(200).json({
            success: true,
            allApplications
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


/*
DELETE APPLICATION
*/

exports.deleteApplication = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const applicationId = req.params.id

        const application = await Application.findById(applicationId)

        if (!application) {
            return res.status(400).json({
                success: false,
                message: "Application already deleted"
            })
        }

        const jobId = application.job

        await Application.findByIdAndRemove(applicationId)

        /*
        Remove from appliedJobs
        */

        user.appliedJobs = user.appliedJobs.filter((id) =>
            id.toString() !== jobId.toString()
        )

        await user.save()

        res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}