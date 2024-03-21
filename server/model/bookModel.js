import mongoose from "mongoose";

const  bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    code:{
        type:Number,
        required:true,
    },
    authName:{
        type:String,
        required:true,
    },
    pubName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    link:{
        type:String,
        required:false,
    }   
})

export default mongoose.model("Book",bookSchema);