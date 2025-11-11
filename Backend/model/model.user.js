import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullneme:{
        require:true,
        type : String,
    },
    email:{
        unique:true,
        require:true,
        type : String,
    },
    password:{
        require:true,
        type : String,
    }
})
const User = mongoose.model("user",UserSchema);
export default User;