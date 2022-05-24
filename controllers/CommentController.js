import {getUserFromToken} from "./UserFunctions.js";
import Comment from "../models/Comment.js";
import SubComment from "../models/SubComment.js";

export const getComments =  async(req, res) => {
    const search = req.query.search;
    const filters = search
      ? {body: {$regex: '.*'+search+'.*'}}
      : {rootId:null};
    Comment.find(filters).sort({postedAt: -1}).then(comments => {
      res.render("post", {comments: comments})
    });
  }
  
  export const getCommentsByRoot =  async(req, res) => {
    Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
      res.render("post-single", {comments: comments})
    });
  }
  
  export const getCommentById =  async(req, res) => {
    Comment.findById(req.params.id).then(comment => {
      Comment.find({parentId:req.params.id}).sort({postedAt: -1}).then(comments => {
      res.render("post-single", {comments: comments, parent:comment})
    });
    });
  }
  
  export const postSubComment =  async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
      res.sendStatus(401);
      return;
    }
    getUserFromToken(token)
      .then(userInfo => {
        const {title,body,parentId,rootId} = req.body;
        const comment = new Comment({
          title,
          body,
          author:userInfo.username,
          postedAt:new Date(),
          parentId,
          rootId,
        });
        comment.save().then(savedComment => {
          res.redirect("/comment/"+ parentId);
        }).catch(console.log);
      })
  }

  export const postComment =  async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
      res.sendStatus(401);
      return;
    }
    getUserFromToken(token)
      .then(userInfo => {
        const {title,body,parentId,rootId} = req.body;
        const comment = new Comment({
          title,
          body,
          author:userInfo.username,
          postedAt:new Date(),
          parentId,
          rootId,
        });
        comment.save().then(savedComment => {
          res.redirect("/comment");
        }).catch(console.log);
      })
      .catch(() => {
        res.sendStatus(401);
        res.redirect("/comment");
      });
  }
