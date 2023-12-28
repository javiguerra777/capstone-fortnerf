import { Request, Response } from "express";
import DirectMessageModel from "../model/DirectMessage";
import DirectMessageRoomModel from "../model/DirectMessageRoom";
import { RequestWithUser } from "../modules/AuthenticatedUser.module";

export default class DirectMessagesController {
  public async getDirectMessages(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const { id } = req.user
      const messages = await DirectMessageModel.find({
        $or: [
          { sender: id },
          { recipients: { $in: [id] } }
        ]
      }).populate('sender', '-password')
      .populate({
        path: 'roomId',
        populate: {path: 'users', select: '-password'}
      })
      .sort('-createdAt');
      // Group messages by roomId
      const messagesByRoom = messages.reduce((groups, message: any) => {
        if (message.roomId) {
          const key: any = message.roomId._id;
          if (!groups[key]) {
            groups[key] = {
              roomDetails: {
                _id: message.roomId._id,
                users: message.roomId.users,
                createdAt: message.roomId.createdAt,
                updatedAt: message.roomId.updatedAt,
              },
              messages: [],
            };
          }
          groups[key].messages.push({
            _id: message._id,
            message: message.message,
            sender: message.sender,
            recipients: message.recipients,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
          });
        }
        return groups;
      }, {});
      res.send({data: messagesByRoom});
    } catch (error) {
      console.error(error);
    }
  }

  public async getRoomMessages(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const roomId = req.params.roomid;
      const userId = req.user.id;
      const roomDetails = await DirectMessageRoomModel.findById(roomId)
      .populate('users', '-password');
      const messages = await DirectMessageModel.find({ 
        roomId,
        $or: [
          { sender: userId },
          { recipients: { $in: [userId] }}
        ]
       })
      .populate('sender', '-password')
      .sort('createdAt');
      const data = {
        roomDetails,
        messages,
      }
      res.send({ data });
    } catch (error) {
      console.error(error);
    }
  }

  public async createDirectMessage(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const { message, roomId, recipients } = req.body;
      const { id } = req.user;
      if (roomId) {
        const roomExists = await DirectMessageRoomModel.findById(roomId);
        if (!roomExists) {
          res.status(400).send({ error: 'Room does not exist.' });
        }
        const newMessage = new DirectMessageModel({
          message,
          sender: id,
          recipients,
          roomId,
        });
        const newMessageData = await newMessage.save();
        const populatedMessage = await newMessageData.populate('sender', '-password');
        populatedMessage.recipients.forEach((recipient: any) => {
          req.io.to(recipient).emit('directMessage/newDirectMessage', { data: populatedMessage });
        })
        req.io.to(id).emit('directMessage/newDirectMessage', { data: populatedMessage });
        res.send({ data: populatedMessage });
      } else {
        const newRoom = new DirectMessageRoomModel({
          users: [id, ...recipients]
        });
        const newMessage = new DirectMessageModel({
          message,
          sender: id,
          recipients,
          roomId: newRoom.id,
        });
        const newRoomData = await newRoom.save();
        const newMessageData = await newMessage.save();
        const populatedRoom = await newRoomData
        .populate('users', '-password');
        const populatedMessage = await newMessageData
        .populate('sender', '-password');
        const data = {
          roomDetails: populatedRoom,
          messages: [populatedMessage],
        }
        res.send({ data });
      }
    }catch (error) {
      console.error(error);
    }
  }
  public async updateDirectMessage(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const messageId = req.params.id;
      const userId = req.user.id;
      const { message } = req.body;
      const messageExists = await DirectMessageModel.findByIdAndUpdate({
        _id: messageId,
        sender: userId,
      }, {
        message,
      }, {
        new: true,
      });
      if (!messageExists) {
        res.status(400).send({ error: 'Message does not exist.' });
      }
      messageExists.recipients.forEach((recipient: any) => {
        req.io.to(recipient).emit('directMessage/updateDirectMessage', { data: messageExists });
      });
      req.io.to(userId).emit('directMessage/updateDirectMessage', { data: messageExists });
      res.send({ data: messageExists });
    }
    catch (error) {
      console.error(error);
      res.status(400).send({ error: 'Error updating message.' });
    }
  }
  public async deleteDirectMessage(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const messageId = req.params.id;
      const userId = req.user.id;
      const messageExists = await DirectMessageModel.findOneAndDelete({
        _id: messageId,
        sender: userId,
      });
      if (!messageExists) {
        res.status(400).send({ error: 'Message does not exist.' });
      }
      messageExists.recipients.forEach((recipient: any) => {
        req.io.to(recipient).emit('directMessage/deleteDirectMessage', { data: messageExists });
      });
      req.io.to(userId).emit('directMessage/deleteDirectMessage', { data: messageExists });
      res.send({ data: messageExists });
    }
    catch (error) {
      console.error(error);
      res.status(400).send({ error: 'Error deleting message.' });
    }
  }
}