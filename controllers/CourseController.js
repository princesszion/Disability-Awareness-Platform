import {getUserFromToken} from "./UserFunctions.js";
import Course from "../models/Course.js";
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export const getCourses =  async(req, res) => {
    const search = req.query.search;
    const filters = search
      ? {body: {$regex: '.*'+search+'.*'}}
      : {author:null};
    Course.find().sort({postedAt: -1}).then(courses => {
        res.render("courses", {courses: courses})
        // res.json(courses);
    });
  }
  
  export const getCoursesByAuthor =  async(req, res) => {
    Course.find({author:req.params.author}).sort({postedAt: -1}).then(courses => {
      res.render("courses", {courses: courses})
    });
  }
  
  export const getCourseId =  async(req, res) => {
    Course.findById(req.params.id).then(course => {
      res.json(course);
    });
  }
  
  export const postCourse =  async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
      console.log("No token");
      res.sendStatus(401);
      return;
    }
    getUserFromToken(token)
      .then(userInfo => {
        // const {title,body,parentId,rootId} = req.body;
        const newObj = {
            author: userInfo.id,
            title: req.body.title,
            authorName: userInfo.username,
            body: req.body.body,
            postedAt: new Date(),
            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            link: req.body.link,
        }
        const course = new Course(newObj);
        course.save().then(savedCourse => {
          // res.redirect("/courses")
          res.json(savedCourse);
        }).catch(console.log);
      })
      .catch(() => {
        console.log("Token not allowed");
        res.sendStatus(401);
      });
  }
