import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel';

export default class RegistrationController {
    async register(req: Request, res: Response) {
      try {
        const { name, email, username, profilePicture, password } = req.body;
  
        // Check if the user already exists
        let user = await UserModel.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'User already exists' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        user = new UserModel({
          name,
          email,
          username,
          profilePicture,
          password: hashedPassword,
        });
  
        await user.save();
  
        // Create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        const data = {
          token,
          username: user.username,
          name: user.name,
          id: user.id,
          email: user.email,
          profilePicture: user.profilePicture,
        }
        res.status(200).json({ message: "Successfully created user!", data });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await UserModel.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Create a token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const data = {
        token,
        username: user.username,
        name: user.name,
        id: user.id,
        email: user.email,
        profilePicture: user.profilePicture,
      };
      res.status(200).json({ message: 'Login was successful', data });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}