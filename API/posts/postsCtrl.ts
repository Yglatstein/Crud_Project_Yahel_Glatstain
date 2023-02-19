import exp from "constants";
import mongoose from "mongoose";
import PostModel from "./postsModel";
import jwt from "jwt-simple";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getAllPosts(req, res){
    try{

        const postsDB = await PostModel.find()
        if (!postsDB) throw new Error("no errors found on FUNCTION getAllposts IN FILE userCtrl")
        
        res.send({postsDB})
    }catch (error){
        res.status(500).send({error: error.message})
    }
}

export async function deletePostByID(req, res) {
    try {
        const secret = process.env.SECRET;
        const {userID} = req.cookies
        const jwtUserId = jwt.decode(userID, secret);
        console.log("userId decoded: ", jwtUserId.userId)
        
        const postDB = await PostModel.findById(req.params.id);
        
        if (postDB.userId != jwtUserId.userId ) throw new Error("cannot delete this post");
        const postDBDel = await PostModel.findByIdAndDelete(req.params.id);
        
        res.send({success: true, postDBDel });
        } catch (error) {
        res.status(500).send({ error: error.message });
        }
  }

export async function postAddNewPost(req,res){
    try{

        console.log("here")

        const { title, text , tag} = req.body;
        if (!title || !text || !tag ) throw new Error("some parameters are missing")
    
    const secret = process.env.SECRET;
    const {userID} = req.cookies
    const jwtUserId = jwt.decode(userID, secret);
    console.log("userId decoded: ", jwtUserId.userId)

    const postDB = new PostModel({ title: title, text: text, tag: tag, userId: jwtUserId.userId});
    await postDB.save();

    res.send({success: true, user: postDB})

    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function getPostById(req, res){
    try{
        const postId = req.params.id
        const postDB = await PostModel.findOne({_id:postId})
        if (!postDB) throw new Error("No post found")
        res.send(postDB);
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function patchUpdatePost(req, res){
    try{
        console.log("here")
        let {id} = req.params
        let  {updatedTitle, updatedText, updatedTag} = req.body

        console.log("post id is: ", id)
        console.log("post values are: ", req.body )

        const postDB = await PostModel.findOneAndUpdate({_id:id} , {title: updatedTitle, text: updatedText , tag: updatedTag})
        res.send(postDB);
        

    }catch (error){
        res.status(500).send({error: error.message})
    }
}


export async function searchPost(req, res) {
    try {
        const {searchString} = req.body
        const pattern = new RegExp(searchString)
        const postsDB = await PostModel.find({'title': {$regex: pattern}})
        res.send({postsDB})
      } catch (error) {
        res.status(500).send({error: error.message})
    }
}
  