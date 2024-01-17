import Post from "../model/Post.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    console.log(allPosts);
    return res.status(200).json({ data: allPosts });
  } catch (error) {
    console.log("Server side error " + error);
  }
};

export const createPost = async (req, res) => {
  const { name, prompt, image } = req.body;

  try {
    const imgaeUrl = await cloudinary.uploader.upload(image);
    // console.log(imgaeUrl);

    const newPost = await Post.create({
      name: name,
      prompt: prompt,
      image: imgaeUrl.url,
    });
    res.status(201).json({
      result: newPost,
      message: "Post successfully added",
    });
  } catch (error) {
    console.log("Server side error " + error);
  }
};
