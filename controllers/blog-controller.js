import Blog from "../models/Blog";
import User from "../models/User";
import mongoose from "mongoose";

export const getAllBlogs =  async (req,res,next) => {
    let blogs;
    try{
        blogs = await Blog.find();
    }catch(err){
        console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
}

export const addBlogs =  async (req,res,next) => {
    const {title,description,image,user} = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch(err){
        console.log(err);
    }

    if(!existingUser) {
        return res.status(400).json({message:"Unable to find User by this Id"});
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();

    }catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }

    return res.status(200).json({blog});
}

export const updateBlog =  async (req,res,next) => {
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    }catch(err){
        console.log(err);
    }
    if(!blog) {
        return res.status(500).json({message: "Unable to update the blog"})
    }

    return res.status(200).json({message:"Updated Sussessfully"});
}


export const getById =  async (req,res,next) => {
    const blogId = req.params.id;
    let blog;
    
    try{
        blog = await Blog.findById(blogId)
    }catch(err){
        console.log(err);
    }
    if(!blog) {
        return res.status(404).json({message: "No Blog Found!!"})
    }

    return res.status(200).json({blog});
}


export const deleteById =  async (req,res,next) => {
    const blogId = req.params.id;
    let blog;
    
    try{
        blog = await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog) {
        return res.status(500).json({message: "Unable to delete"})
    }

    return res.status(200).json({message:"Blog deleated Successfullly"});
}

export const getByUserId =  async (req,res,next) => {
    const userId = req.params.id;
    let blogs;
    
    try{
        blogs = await User.findById(userId).populate('blog');
    }catch(err){
        console.log(err);
    }
    if(!blogs) {
        return res.status(404).json({message: "No Blogs Found!!"})
    }

    return res.status(200).json({blogs});
}