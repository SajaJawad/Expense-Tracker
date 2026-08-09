const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log("MongoDB Connected");

    } catch (error) {
        console.error("⚠️ Error connecting to MongoDB:", error.message || error);
        console.log("⚠️ Backend running without DB connection. Update MONGO_URL in backend/.env if needed.");
    }
}

module.exports=connectDB