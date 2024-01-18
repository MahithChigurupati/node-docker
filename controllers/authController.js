import { hash, compare } from "bcrypt";
import User from "../models/userModel.js";

export async function signup(req, res, next) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hash(password, 12);
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    req.session.user = user;

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
    });
  }
}

export async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    // Check if username and password exist
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "No username or password",
      });
    }
    // Check if user exists && password is correct
    const user = await User.findOne({ username });

    if (!user || !(await compare(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    req.session.user = user;

    // If everything is ok, send token to client
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
}
