import express from 'express';
import {getCourses, getCoursesByAuthor, getCourseId, postCourse} from "../controllers/CourseController.js";
import multer from 'multer';

const router = express.Router();

// var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  var upload = multer({ storage: storage });

router.get('/', getCourses);
  
router.get('/author/:author', getCoursesByAuthor);

router.get('/add', (req, res) => {
    res.render('add-course');
});

router.get('/:id', getCourseId);
  
router.post('/', upload.single('image'), postCourse);
router.use(express.static('public'));
router.use(express.static('public'));
export default router