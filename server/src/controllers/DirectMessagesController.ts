import { Request, Response } from "express";

export default class DirectMessagesController {
  public async getDirectMessages(req: Request, res: Response): Promise<void> {
    try {
      res.send("getDirectMessages");
    } catch (error) {
      console.error(error);
    }
  }

  public async getRoomMessages(req: Request, res: Response): Promise<void> {
    try {
      res.send("getDirectMessage");
    } catch (error) {
      console.error(error);
    }
  }

  public async createDirectMessage(req: Request, res: Response): Promise<void> {
    try {
      res.send("createDirectMessage");
    
    }catch (error) {
      console.error(error);
    }
  }
}