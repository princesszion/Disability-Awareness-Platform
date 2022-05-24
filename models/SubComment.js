import mongoose from "mongoose";

const schema = new mongoose.Schema({
  author: {type:String,required:true},
  title: {type:String},
  body: {type:String,required:true},
  postedAt: {type:Date,required:true},
  parentId: {type:String,required:true}
});
const SubComment = mongoose.model('SubComment', schema);

export default SubComment;