import express from "express";
const blogRouter = express.Router();
import { getAllBlogs, addBlogs,updateBlog, getById,deleteById,getByUserId } from "../controllers/blog-controller";

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlogs);
blogRouter.put('/update/:id',updateBlog);
blogRouter.get('/:id',getById);
blogRouter.delete("/delete/:id",deleteById)
blogRouter.get("/user/:id",getByUserId);

export default blogRouter;