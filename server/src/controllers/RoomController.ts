import { Request, Response } from 'express';
import Room from '../model/Room';

export default class RoomController {
  async firstRoute(req: Request, res: Response) {
    try {
      res.status(200).json('Welcome to the FortNerf Game Server');
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async getAllRooms(req: Request, res: Response) {
    try {
      const data = await Room.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async getRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await Room.findById(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async createRoom(req: Request, res: Response) {
    try {
      const data = new Room({
        name: req.body.name,
        host: req.body.username,
        maxUsers: req.body.maxPlayers,
      });
      const roomToSave = await data.save();
      res.status(200).json(roomToSave);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async updateRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await Room.updateOne(
        { _id: id },
        {
          $push: {
            score: {
              username: req.body.username,
              score: req.body.score,
            },
          },
        },
      );
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}
