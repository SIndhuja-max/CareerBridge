const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

const User = require('./models/UserModel')

dotenv.config({ path: "./config/config.env" })

mongoose.connect(process.env.DB)
.then(() => {
    console.log("MongoDB Connected")
})
.catch((err) => {
    console.log(err)
})

const createAdmin = async () => {

    try {

        /*
        CHECK IF ADMIN EXISTS
        */

        const existingAdmin = await User.findOne({
            email: "admin@careerbridge.com"
        })

        if (existingAdmin) {

            console.log("Admin already exists")
            process.exit()

        }

        /*
        HASH PASSWORD
        */

        const hashedPassword =
            await bcrypt.hash("Admin@123", 10)

        /*
        CREATE ADMIN
        */

        const admin = await User.create({

            name: "Super Admin",

            email: "admin@careerbridge.com",

            password: hashedPassword,

            role: "admin",

            isVerifiedRecruiter: true,

            recruiterStatus: "trusted",

            avatar: {

                public_id: "default_admin",

                url: "https://res.cloudinary.com/demo/image/upload/sample.jpg"

            }

        })

        console.log("Admin created successfully")

        console.log(admin)

        process.exit()

    }

    catch (err) {

        console.log(err)

        process.exit()

    }

}

createAdmin()