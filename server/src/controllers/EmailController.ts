import { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';

export default class EmailController {
  async sendEmail(req: Request, res: Response) {
    try {
      const msg = {
        to: 'javier.guerra1001@gmail.com',
        from: 'jaguerra@alphaworks.tech',
        subject: 'Message from Fort Nerf App',
        text: req.body.message,
        html: `<h1>Received a message from: ${req.body.name}. Email them back at: ${req.body.email}</h1><p>${req.body.message}</p>`,
      };
      sgMail.send(msg).then(
        () => {},
        (error) => {
          if (error.response) {
            console.error(error.response.body);
          }
        },
      );
      console.log('Mail sent');
      res.status(200).json('Email was successfully sent');
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}
