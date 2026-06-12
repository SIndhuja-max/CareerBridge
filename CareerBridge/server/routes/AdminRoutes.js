const { getAnalytics } = require('../controllers/AnalyticsController')

const express = require("express")

const {
    getAllJobs,
    getAllUsers,
    getAllApp,
    updateApplication,
    deleteApplication,
    updateUser,
    deleteUser,
    getApplication,
    getUser,
    getJob,
    updateJob,
    deleteJob,
    getPendingRecruiters,
approveRecruiter,
rejectRecruiter
} = require('../controllers/AdminControllers')

const {
    isAuthenticated,
    authorizationRoles
} = require('../middlewares/auth')

const {
    applicationIdValidator,
    validateHandler,
    userIdValidator,
    JobIdValidator
} = require('../middlewares/validators')

const router = express.Router()

/*
ALL JOBS
*/

router.route("/admin/allJobs")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    getAllJobs
)

/*
ALL USERS
*/

router.route("/admin/allUsers")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    getAllUsers
)

/*
PENDING RECRUITERS
*/

router.route("/admin/recruiters")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    getPendingRecruiters
)
router.route("/admin/approveRecruiter/:id")
.put(
    isAuthenticated,
    authorizationRoles("admin"),
    approveRecruiter
)

router.route("/admin/rejectRecruiter/:id")
.put(
    isAuthenticated,
    authorizationRoles("admin"),
    rejectRecruiter
)

/*
ALL APPLICATIONS
*/

router.route("/admin/allApp")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    getAllApp
)

/*
GET APPLICATION
*/

router.route("/admin/getApplication/:id")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    applicationIdValidator(),
    validateHandler,
    getApplication
)

/*
UPDATE APPLICATION
*/

router.route("/admin/updateApplication/:id")
.put(
    isAuthenticated,
    authorizationRoles("admin"),
    applicationIdValidator(),
    validateHandler,
    updateApplication
)

/*
DELETE APPLICATION
*/

router.route("/admin/deleteApplication/:id")
.delete(
    isAuthenticated,
    authorizationRoles("admin"),
    applicationIdValidator(),
    validateHandler,
    deleteApplication
)

/*
GET USER
*/

router.route("/admin/getUser/:id")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    userIdValidator(),
    validateHandler,
    getUser
)

/*
UPDATE USER
*/

router.route("/admin/updateUser/:id")
.put(
    isAuthenticated,
    authorizationRoles("admin"),
    userIdValidator(),
    validateHandler,
    updateUser
)

/*
DELETE USER
*/

router.route("/admin/deleteUser/:id")
.delete(
    isAuthenticated,
    authorizationRoles("admin"),
    userIdValidator(),
    validateHandler,
    deleteUser
)

/*
GET JOB
*/

router.route("/admin/getJob/:id")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    JobIdValidator(),
    validateHandler,
    getJob
)

/*
UPDATE JOB
*/

router.route("/admin/updateJob/:id")
.put(
    isAuthenticated,
    authorizationRoles("admin"),
    JobIdValidator(),
    validateHandler,
    updateJob
)

/*
DELETE JOB
*/

router.route("/admin/deleteJob/:id")
.delete(
    isAuthenticated,
    authorizationRoles("admin"),
    JobIdValidator(),
    validateHandler,
    deleteJob
)

/*
ANALYTICS
*/

router.route("/admin/analytics")
.get(
    isAuthenticated,
    authorizationRoles("admin"),
    getAnalytics
)

module.exports = router