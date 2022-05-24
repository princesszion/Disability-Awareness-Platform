import express from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import cors from 'cors';
import UserRoutes from "./routes/UserRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";
import VotingRoutes from "./routes/VotingRoutes.js";
import CourseRoutes from "./routes/CourseRoutes.js";
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert {type: "json"};

dotenv.config();

const secret = 'secret123';
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use(cors({
//   origin: 'https://em-reddit-clone-client.herokuapp.com',
//   credentials: true,
// }));

app.use(morgan('tiny'))
app.set("view engine", "ejs");

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://em-reddit-clone-client.herokuapp.com');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/vote", VotingRoutes);
app.use("/user", UserRoutes);
app.use("/courses", CourseRoutes);
app.use("/comment", CommentRoutes);

// Step 5 - set up multer for storing uploaded files
  


const password = process.env.PASSWORD;
const cluster =  process.env.CLUSTER;
const dbname = process.env.DB_NAME;
const userName = process.env.USERNAME;

mongoose.connect(`mongodb+srv://victory:rNWOHG8vxEBGAhY9@hack.txhcv.mongodb.net/hackathon_db?retryWrites=true&w=majority`, {useNewUrlParser:true,useUnifiedTopology:true,});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/campaign', (req, res) => {
  res.render('campaign');
});

app.get('/doctor', (req, res) => {
  res.render('doctors');
});
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   next();
// });
app.use(express.static('public'));
var port_number = process.env.PORT || 3000;
app.listen(port_number);
// console.log(port_number)