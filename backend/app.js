import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';
const app = express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect("mongodb+srv://hiteshjagwani102:5RYZAy0pxqcLi9KT@cluster0.zxwdkng.mongodb.net/Blog?retryWrites=true&w=majority"
)
.then(()=>app.listen(5001))
.then(()=>console.log("Connected to database and Listening to port 5000"))
.catch((err)=>console.log(err));


