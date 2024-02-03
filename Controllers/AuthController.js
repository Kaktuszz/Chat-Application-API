import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  if (req.body.password === "") {
    return res.status(400).json({ message: "Password required" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;

    const newUser = new UserModel(req.body);
    const { username } = req.body;

    try {
      const oldUser = await UserModel.findOne({ username });
      if (oldUser) {
        return res.status(400).json({ message: "Username is already in use" });
      } else {
        const user = await newUser.save();
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.SECRET_JWT,
          { expiresIn: "6h" }
        );
        res.status(200).json({ user, token });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (validity) {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.SECRET_JWT,
          { expiresIn: "6h" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json("Wrong Password");
      }
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
