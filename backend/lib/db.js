import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conne = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log(conne.connection.host);
        
    } catch (error) {
        console.log("Error in connecting to DB: ", error.message);
    }
}

export default connectDB