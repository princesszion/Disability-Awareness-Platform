import mongoose from "mongoose";

const schema = new mongoose.Schema({
  author: {type:mongoose.ObjectId,required:true},
  title: {type:String,required:true},
  authorName: {type:String,required:false},
  body: {type:String,required:true},
  postedAt: {type:Date,required:true},
  image: { data: Buffer, contentType: String,required:false},
  link: {type:String,required:true}
});
const Course = mongoose.model('Course', schema);

export default Course;