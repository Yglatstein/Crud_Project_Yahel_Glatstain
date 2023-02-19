import exp from "constants";
import mongoose from "mongoose";
import UserModel from "./userModel";
import jwt from "jwt-simple";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getAllUsers(req, res){
    try{
        const usersDB = await UserModel.find()
        if (!usersDB) throw new Error("no errors found on FUNCTION getAllUsers IN FILE userCtrl")
        
        res.send({usersDB})
    }catch (error){
        res.status(500).send({error: error.message})
    }
}

export async function getUserByCookie(req, res) {
    try {
        const secret = process.env.SECRET;
        const {userID} = req.cookies
        const jwtUserId = jwt.decode(userID, secret);
        const { userId } = jwtUserId;
        const userDB = await UserModel.findOne({_id:userId})
        if (!userDB) throw new Error("No user found")
        res.send(userDB);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}


export async function postUserLogin(req, res){
    try{
        const { email, password } = req.body;

        const userDB = await UserModel.findOne({email})
        if (!userDB) throw new Error("No user found")

        const isMatch = await bcrypt.compare(password, userDB.password);
        if(!isMatch)  throw new Error("wrong password, try again!")

        const secret = process.env.SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");
        const cookie = { userId: userDB._id };
        const JWTCookie = jwt.encode(cookie, secret);
        console.log("Generated cookie " , JWTCookie)
        res.cookie("userID", JWTCookie);
        res.send({success: true, user: {userDB}})
    
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function postUserRegister(req, res){
    try{
        const { email, password , imageLink, name} = req.body;
        if (!email || !password || !imageLink || !name ) throw new Error("some parameters are missing")

        const checkUserDB = await UserModel.findOne({email})
        if(checkUserDB) throw new Error("email already in use")

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);


        const userDB = new UserModel({ email, password: hash, image: imageLink, name: name});
        await userDB.save();

        const secret = process.env.SECRET;
        if (!secret) throw new Error("secret value is missing");
        const cookie = { userId: userDB._id };
        const JWTCookie = jwt.encode(cookie, secret);
        res.cookie("userID", JWTCookie);
        res.send({success: true, user: userDB})

        console.log(req.body)
        
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

export async function getUserLogout(req, res){
    try {
        res.clearCookie("userID");
        res.send({ success: true });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
}
