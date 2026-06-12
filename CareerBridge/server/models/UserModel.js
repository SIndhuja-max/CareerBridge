const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({

    /*
    BASIC DETAILS
    */

    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter valid email address"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please enter a password"]
    },

    /*
    PROFILE IMAGE
    */

    avatar: {
        public_id: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        }
    },

    /*
    ROLE

    applicant → normal user applying for jobs
    recruiter → recruiter posting jobs
    admin → internal platform admin
    */

    role: {
        type: String,
        enum: ["applicant", "recruiter", "admin"],
        default: "applicant"
    },

    /*
    RECRUITER VERIFICATION

    trusted → instantly trusted recruiter
    pending → recruiter under partial review
    blocked → blocked recruiter
    */

    recruiterStatus: {

    type: String,

    enum: [

        "pending",
        "approved",
        "rejected",
        "trusted"

    ],

    default: "pending"

},

    /*
    VERIFIED RECRUITER
    */

    isVerifiedRecruiter: {
        type: Boolean,
        default: false
    },

    /*
    RESUME

    Only applicants should have resume.
    Recruiters/Admin should not need resume.

    So required = false
    */

    resume: {
        public_id: {
            type: String,
            required: false,
        },

        url: {
            type: String,
            required: false,
        }
    },

    /*
    EMAIL NOTIFICATION TOGGLE

    User can choose:
    receive job updates or not
    */

    receiveNotifications: {
        type: Boolean,
        default: true
    },

    /*
    SAVED JOBS
    */

    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],

    /*
    APPLIED JOBS
    */

    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ],

    /*
    CREATED DATE
    */

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User