import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstname: String,
    lastname: String,
    profilepic: String,
    about: String,
    chats: [],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
