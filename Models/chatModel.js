import mongoose from "mongoose";

const ChatShema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const ChatModel = mongoose.model("Chat", ChatShema);
export default ChatModel;