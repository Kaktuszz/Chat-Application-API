import UserModel from "../Models/userModel.js";

export const findUsers = async (req, res) => {
  const { username } = req.params; // Adjusted to use req.params.username
  try {
    const users = await UserModel.find({
      username: { $regex: `.*${username}.*`, $options: "i" },
    });
    if (username != "") {
      if (users && users.length > 0) {
        // Check if users array is not empty
        const responseData = users.map((user) => {
          const { password, email, chats, ...data } = user._doc;
          return data;
        });
        res.status(200).json(responseData);
      } else {
        res.status(404).json("No such users exist");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
