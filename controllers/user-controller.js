import User from '../models/User'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';

export const getAllUsers = async(req,res,next) => {
    let users;
    try {
        users = await User.find();
    } catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No users found"})
    }
    else res.status(200).json({users});
}

export const signup = async (req,res,next) =>{
    const {name,email,password} =  req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch(err){
        console.log(err);
    }
    if(existingUser)  {
        return res.status(400).json({message: "User Already Exists! Login instead"});
        
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
       await user.save();
    } catch(err){
        console.log(err);
    }
    return res.status(201).json({user})

    
}

export const login = async (req,res,next) =>{
    const {email,password} =  req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch(err){
        console.log(err);
    }
    if(!existingUser)  {
        return res.status(400).json({message: "User Not Found !! Signup first"});
        
    }

    const isPassworeCorrent = bcrypt.compareSync(password,existingUser.password);

    try {
       if(isPassworeCorrent) res.status(200).json({message: "User Logged in Successfully"})
        else return res.status(400).json({message:"Incorrect Password! Try again."})
    } catch(err){
        console.log(err);
    }

    
}