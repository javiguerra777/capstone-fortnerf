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
      });
      res.send({data: messages});
    } catch (error) {
      console.error(error);
    }
  }

  public async getRoomMessages(req: RequestWithUser, res: Response): Promise<void> {
    try {
      res.send("getDirectMessage");
    } catch (error) {
      console.error(error);
    }
  }

  public async createDirectMessage(req: RequestWithUser, res: Response): Promise<void> {
    try {
      const { message, roomId, recipients } = req.body;
      const { id } = req.user;
      if(roomId) {
        const newMessage = new DirectMessageModel({
          message,
          sender: id,
          recipients,
          roomId,
        });
        await newMessage.save();
        res.send({data: newMessage});
      }else {
        const newRoom = new DirectMessageRoomModel({
          users: [id, ...recipients]
        });
        const newMessage = new DirectMessageModel({
          message,
          sender: id,
          recipients,
          roomId: newRoom.id,
        });
        await newRoom.save();
        await newMessage.save();
        res.send({data: newMessage});
      }
    }catch (error) {
      console.error(error);
    }
  }
}