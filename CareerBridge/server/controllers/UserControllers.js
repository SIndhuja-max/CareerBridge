const User = require('../models/UserModel')
const Application = require('../models/AppModel')
const bcrypt = require('bcrypt')
const { createToken } = require('../middlewares/auth')
const cloudinary = require('cloudinary')
const freeEmailProviders = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "protonmail.com",
    "icloud.com"
]

const trustedDomains = [
    "google.com",
    "amazon.com",
    "infosys.com",
    "microsoft.com",
    "tcs.com",
    "accenture.com",
    "wipro.com"
]

/*
REGISTER
*/

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            avatar,
            role,
            receiveNotifications
        } = req.body

        const resume = req.files?.resume
        /*
PASSWORD VALIDATION
*/

if (password.length < 8) {

    return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters"
    })

}

if (password[0] !== password[0].toUpperCase()) {

    return res.status(400).json({
        success: false,
        message: "First letter must be capital"
    })

}

if (!/[0-9]/.test(password)) {

    return res.status(400).json({
        success: false,
        message: "Password must contain at least one number"
    })

}

if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {

    return res.status(400).json({
        success: false,
        message: "Password must contain at least one special character"
    })

}

        if (!avatar) {

            return res.status(400).json({
                success: false,
                message: "Profile picture is required"
            })

        }

        /*
        UPLOAD AVATAR
        */

        const myCloud = await cloudinary.v2.uploader.upload(
            avatar,
            {
                folder: "avatar",
                crop: "scale"
            }
        )

        /*
        ROLE
        */

        const normalizedRole =
            role?.trim().toLowerCase()
            /*
RECRUITER EMAIL VALIDATION
*/

if (normalizedRole === "recruiter") {

    const emailDomain =
        email.split("@")[1]?.toLowerCase()

    if (
        freeEmailProviders.includes(emailDomain)
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Recruiters must register using company email"
        })

    }

}

        /*
        RESUME
        */

        let resumeData = undefined

        if (normalizedRole === "applicant") {

            if (!resume) {

                return res.status(400).json({
                    success: false,
                    message: "Resume is required for applicants"
                })

            }

    const myCloud2 =
    await cloudinary.v2.uploader.upload(
        resume.tempFilePath,
        {
            folder: "resume",
            resource_type: "raw",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            filename_override: resume.name
        }
    )

            resumeData = {
                public_id: myCloud2.public_id,
                url: myCloud2.secure_url
            }

        }

        /*
        HASH PASSWORD
        */

        const hashPass =
            await bcrypt.hash(password, 10)

        /*
RECRUITER TRUST LOGIC
*/

let recruiterStatus = "pending"
let isVerifiedRecruiter = false

if (normalizedRole === "recruiter") {

    const emailDomain =
        email.split("@")[1]?.toLowerCase()

    if (
        trustedDomains.includes(emailDomain)
    ) {

        recruiterStatus = "trusted"
        isVerifiedRecruiter = true

    }

}

        /*
        CREATE USER
        */

        const user = await User.create({

            name,
            email,
            password: hashPass,
role:
    normalizedRole === "recruiter"
        ? "recruiter"
        : "applicant",

recruiterStatus,
isVerifiedRecruiter,

            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },

            resume: resumeData,

            receiveNotifications

        })

        const token =
            createToken(user._id, user.email)

        res.status(201).json({

            success: true,
            message: "User Created",
            user,
            token

        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

/*
LOGIN
*/

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        const user =
            await User.findOne({ email })

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            )

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            })

        }

        const token =
            createToken(user._id, user.email)

        res.status(200).json({

            success: true,
            message: "User logged in successfully",
            token

        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

/*
CHECK LOGIN
*/

exports.isLogin = async (req, res) => {

    try {

        const user =
            await User.findById(req.user._id)

        if (user) {

            return res.status(200).json({
                success: true,
                isLogin: true
            })

        }

        return res.status(200).json({
            success: true,
            isLogin: false
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

/*
GET MY PROFILE
*/

exports.me = async (req, res) => {

    try {

        const user =
            await User.findById(req.user._id)

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

/*
CHANGE PASSWORD
*/

exports.changePassword = async (req, res) => {

    try {

        const {
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body

        const user =
            await User.findById(req.user._id)

        const isMatch =
            await bcrypt.compare(
                oldPassword,
                user.password
            )

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Old password is wrong"
            })

        }

        if (newPassword === oldPassword) {

            return res.status(400).json({
                success: false,
                message: "New password cannot be same as old password"
            })

        }

        if (newPassword !== confirmPassword) {

            return res.status(401).json({
                success: false,
                message: "New Password and Confirm Password do not match"
            })

        }

        const hashPass =
            await bcrypt.hash(newPassword, 10)

        user.password = hashPass

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

/*
UPDATE PROFILE
*/

exports.updateProfile = async (req, res) => {

    try {

        const {
            newName,
            newEmail,
            newAvatar,
            receiveNotifications
        } = req.body

        const newResume = req.files?.newResume

        const user =
            await User.findById(req.user._id)

        /*
        UPDATE BASIC DETAILS
        */

        user.name = newName
        user.email = newEmail

        if (receiveNotifications !== undefined) {

            user.receiveNotifications =
                receiveNotifications

        }

        /*
        UPDATE AVATAR
        */

        if (newAvatar) {

            if (user.avatar?.public_id) {

                await cloudinary.v2.uploader.destroy(
                    user.avatar.public_id
                )

            }

            const myCloud1 =
                await cloudinary.v2.uploader.upload(
                    newAvatar,
                    {
                        folder: "avatar",
                        resource_type: "image"
                    }
                )

            user.avatar = {
                public_id: myCloud1.public_id,
                url: myCloud1.secure_url
            }

        }

        /*
        UPDATE RESUME
        */

        if (
            user.role === "applicant"
            &&
            newResume
        ) {

            if (user.resume?.public_id) {

                await cloudinary.v2.uploader.destroy(
                    user.resume.public_id,
                    {
                        resource_type: "raw"
                    }
                )

            }

            const myCloud2 =
    await cloudinary.v2.uploader.upload(
        newResume.tempFilePath,
        {
            folder: "resume",
            resource_type: "raw",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            filename_override: newResume.name
        }
    )
            user.resume = {
                public_id: myCloud2.public_id,
                url: myCloud2.secure_url
            }

        }

        await user.save()

        res.status(200).json({

            success: true,
            message: "Profile Updated"

        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

/*
DELETE ACCOUNT
*/

exports.deleteAccount = async (req, res) => {

    try {

        const user =
            await User.findById(req.user._id)

        const isMatch =
            await bcrypt.compare(
                req.body.password,
                user.password
            )

        if (!isMatch) {

            return res.status(200).json({
                success: false,
                message: "Password does not match"
            })

        }

       if (user.role === "applicant") {

    await Application.deleteMany({
        applicant: req.user._id
    })

}

await User.findByIdAndRemove(
    req.user._id
)

        res.status(200).json({

            success: true,
            message: "Account Deleted"

        })

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}