const express = require('express')
const app = express()

const cors = require('cors')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const path = require('path')

dotenv.config({
    path: './config/config.env'
})

/*
BODY LIMIT
*/

app.use(express.json({
    limit: '50mb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

/*
CORS
*/

app.use(cors({
    origin: "*",
    credentials: true
}))

/*
FILE UPLOAD
IMPORTANT FIX:
Windows-compatible temp folder
*/

app.use(fileUpload({

    useTempFiles: true,

    tempFileDir: path.join(
        __dirname,
        "uploads"
    ),

    createParentPath: true

}))

/*
ROUTES
*/

const User = require('./routes/UserRoutes')
const Job = require('./routes/JobRoutes')
const Application = require('./routes/ApplicationRoutes')
const Admin = require('./routes/AdminRoutes')

const {
    errorMiddleware
} = require('./middlewares/error')

app.use("/api/v1", User)
app.use("/api/v1", Job)
app.use("/api/v1", Application)
app.use("/api/v1", Admin)

/*
TEST ROUTE
*/

app.get("/", (req, res) => {

    res.json("I am working")

})

/*
ERROR MIDDLEWARE
*/

app.use(errorMiddleware)

module.exports = app