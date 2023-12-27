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
      const messagesByRoom = messages.reduce((acc, message) => {
        const roomId: string | any = message.roomId.id;
        if (!acc[roomId]) {
          acc[roomId] = [];
        }
        acc[roomId].push(message);
        return acc;
      }, {});
      res.send({data: messagesByRoom});
    } catch (error) {
      console.error(error);
    }
  }

  public async getRoomMessages(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const roomId = req.params.id;
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
        console.log('existing room message');
        const newMessage = new DirectMessageModel({
          message,
          sender: id,
          recipients,
          roomId,
        });
        const newMessageData = await newMessage.save();
        const populatedMessage = await newMessageData.populate('sender', '-password');
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
}