const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

exports.createToken = (id, email) => {

    const token = jwt.sign(
        {
            id,
            email
        },
        process.env.SECRET,
        {
            expiresIn: '5d'
        }
    )

    return token

}

exports.isAuthenticated = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                isLogin: false,
                message: "Authorization header missing"
            })

        }

        const token = authHeader.split(' ')[1]

        if (!token) {

            return res.status(401).json({
                success: false,
                isLogin: false,
                message: "Token missing"
            })

        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET
        )

        const user = await User.findById(decoded.id)

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            })

        }

        req.user = user

        next()

    }

    catch (err) {

        console.log("AUTH ERROR =>", err)

        return res.status(500).json({
            success: false,
            message: err.message
        })

    }

}

exports.authorizationRoles = (...roles) => {

    return (req, res, next) => {

        if (
    req.user.role === "recruiter"
    &&
    roles.includes("admin")
) {

    return next()

}

if (!roles.includes(req.user.role)) {

    return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not allowed to access this resource`
    })

}

        next()

    }

}