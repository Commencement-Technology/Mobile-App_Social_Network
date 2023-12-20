const Conversations = require("../models/conversationModel");
const Messages = require("../models/messageModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const limit = this.queryString.limit * 1 || 10;
    this.query = this.query.limit(limit);
    return this;
  }
}

const messageCtrl = {
  getConversations: async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversations.find({
          recipients: req.user._id,
        }),
        req.query
      ).paginating();

      const conversations = await features.query
        .populate("recipients", "avatar fullname username")
        .sort("-updatedAt");

      return res.json({ conversations, result: conversations.length });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const { id } = req.params;

      const features = new APIfeatures(
        Messages.find({
          $or: [
            { sender: req.user._id, recipient: id },
            { sender: id, recipient: req.user._id },
          ],
        }),
        req.query
      ).paginating();

      const messages = await features.query
        .populate("sender recipient", "avatar")
        .sort("-createdAt")
        .lean();

      return res.json({ messages });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  createMessage: async (req, res) => {
    try {
      const { text, recipient, media } = req.body;

      if (!recipient || (!text.trim() && media.length === 0)) return;

      const newConversation = await Conversations.findOneAndUpdate(
        {
          $or: [
            { recipients: [req.user._id, recipient] },
            {
              recipients: [recipient, req.user._id],
            },
          ],
        },
        {
          recipients: [req.user._id, recipient],
          text,
          media,
        },
        {
          new: true,
          upsert: true,
        }
      ).populate("recipients", "avatar fullname username");

      const newMessage = new Messages({
        conversation: newConversation._id,
        sender: req.user._id,
        recipient,
        text,
        media,
      });

      await newMessage.save();

      return res.json({
        msg: "Tin nhắn đã được gửi",
        conversation: newConversation,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = messageCtrl;