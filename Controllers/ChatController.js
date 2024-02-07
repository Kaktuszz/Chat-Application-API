import ChatModel from "../Models/chatModel.js";

export const createChat = async (req, res) => {
  const existingChat = await ChatModel.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    if (existingChat) {
      res.status(200).json(existingChat);
    } else {
      const result = await newChat.save();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChat = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
