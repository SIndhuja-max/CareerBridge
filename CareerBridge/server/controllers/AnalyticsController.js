const User = require('../models/UserModel')
const Job = require('../models/JobModel')
const Application = require('../models/AppModel')

exports.getAnalytics = async (req, res) => {

    try {

        /*
        TOTAL COUNTS
        */

        const totalUsers = await User.countDocuments()

        const totalJobs = await Job.countDocuments()

        const totalApplications = await Application.countDocuments()

        /*
        APPLICATION STATUS
        */

        const acceptedApplications =
            await Application.countDocuments({
                status: "accepted"
            })

        const pendingApplications =
            await Application.countDocuments({
                status: "pending"
            })

        const rejectedApplications =
            await Application.countDocuments({
                status: "rejected"
            })

        /*
        PERCENTAGES
        */

        const acceptedPercentage =
            totalApplications > 0
                ? Math.round(
                    (acceptedApplications / totalApplications) * 100
                )
                : 0

        const pendingPercentage =
            totalApplications > 0
                ? Math.round(
                    (pendingApplications / totalApplications) * 100
                )
                : 0

        const rejectedPercentage =
            totalApplications > 0
                ? Math.round(
                    (rejectedApplications / totalApplications) * 100
                )
                : 0

        /*
        TOP HIRING CATEGORY
        */

        const categoryAggregation =
            await Job.aggregate([
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        total: -1
                    }
                },
                {
                    $limit: 1
                }
            ])

        const topCategory =
            categoryAggregation.length > 0
                ? categoryAggregation[0]._id
                : "No Category"

        /*
        HIRING SUCCESS RATE
        */

        const hiringSuccessRate =
            totalApplications > 0
                ? Math.round(
                    (acceptedApplications / totalApplications) * 100
                )
                : 0

        /*
        WEEKLY APPLICATION ANALYTICS
        */

        const last7Days = []

        for (let i = 6; i >= 0; i--) {

            const start = new Date()

            start.setDate(start.getDate() - i)

            start.setHours(0, 0, 0, 0)

            const end = new Date(start)

            end.setHours(23, 59, 59, 999)

            const count =
                await Application.countDocuments({
                    createdAt: {
                        $gte: start,
                        $lte: end
                    }
                })

            last7Days.push({

                day: start.toLocaleDateString('en-US', {
                    weekday: 'short'
                }),

                applications: count

            })

        }

        /*
        MONTHLY JOB ANALYTICS
        */

        const monthlyJobs = []

        for (let i = 5; i >= 0; i--) {

            const start = new Date()

            start.setMonth(start.getMonth() - i)

            start.setDate(1)

            start.setHours(0, 0, 0, 0)

            const end = new Date(start)

            end.setMonth(end.getMonth() + 1)

            end.setDate(0)

            end.setHours(23, 59, 59, 999)

            const count =
                await Job.countDocuments({
                    createdAt: {
                        $gte: start,
                        $lte: end
                    }
                })

            monthlyJobs.push({

                month: start.toLocaleDateString('en-US', {
                    month: 'short'
                }),

                jobs: count

            })

        }

        /*
        WEEKLY USER GROWTH
        */

        const weeklyUsers = []

        for (let i = 6; i >= 0; i--) {

            const start = new Date()

            start.setDate(start.getDate() - i)

            start.setHours(0, 0, 0, 0)

            const end = new Date(start)

            end.setHours(23, 59, 59, 999)

            const count =
                await User.countDocuments({
                    createdAt: {
                        $gte: start,
                        $lte: end
                    }
                })

            weeklyUsers.push({

                day: start.toLocaleDateString('en-US', {
                    weekday: 'short'
                }),

                users: count

            })

        }

        /*
        RESPONSE
        */

        res.status(200).json({

            success: true,

            analytics: {

                totalUsers,
                totalJobs,
                totalApplications,

                acceptedApplications,
                pendingApplications,
                rejectedApplications,

                acceptedPercentage,
                pendingPercentage,
                rejectedPercentage,

                topCategory,

                hiringSuccessRate,

                /*
                TIME BASED ANALYTICS
                */

                last7Days,
                monthlyJobs,
                weeklyUsers

            }

        })

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        })

    }

}