import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post must have a title"],
  },
  body: {
    type: String,
    required: [true, "Post must have a body"],
  },
});

const Post = model("Post", postSchema);

export default Post;
