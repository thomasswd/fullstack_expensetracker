const mongoose = require('mongoose');

const connectDB = async() => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`Connected to database: ${conn.connection.host}`.cyan.underline.bold )
    } catch (error) {
        mongoose.connection.on('error', (err) => {
            console.error(`${err.message}`.red.bold);
        })
        process.exit(1);
    }
}

module.exports = connectDB;