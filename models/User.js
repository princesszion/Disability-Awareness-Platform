import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {type:String,required:true},
  username: {type:String,required:true},
  password: {type:String,required:true},
  specialist: {type:Boolean,required:true,default:false}
});
const User = mongoose.model('User', schema);

export default User;