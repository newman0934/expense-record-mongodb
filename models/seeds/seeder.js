const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Record = require("../record")
const User = require("../user")
const recordData = require("./record.json").results
const userData = require("./user.json")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/record", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//connect mongodb
const db = mongoose.connection;

db.on("error", () => {
    console.log("mongodb error");
});

db.once("open", () => {
    console.log("mongodb connected");

    for (let i = 0; i < userData.results.length; i++) {
        const user = User(userData.results[i])

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                user.save().then().catch(err => {
                    console.log(err)
                })
            })
        })

        for (let j = 0; j < recordData.length; j++) {
            Record.create({
                ...recordData[j],
                userId: user._id
            })

            if (j === recordData.length) return
        }
    }

    console.log("done")
});