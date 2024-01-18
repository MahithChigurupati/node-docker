import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "User must have a name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

const User = model("User", userSchema);

export default User;
