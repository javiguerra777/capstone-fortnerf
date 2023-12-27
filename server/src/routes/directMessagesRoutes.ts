import { Router } from "express";
import DirectMessagesController from "../controllers/DirectMessagesController";

const directMessagesController = new DirectMessagesController();
const router = Router();

router.get('/direct-messages', (req, res) => directMessagesController.getDirectMessages(req, res));
router.get('/direct-messages/:roomid', (req, res) => directMessagesController.getRoomMessages(req, res));
router.post('/direct-messages', (req, res) => directMessagesController.createDirectMessage(req, res));
router.put('/direct-messages/message/:id', (req, res) => directMessagesController.updateDirectMessage(req, res));
router.delete('/direct-messages/message/:id', (req, res) => directMessagesController.deleteDirectMessage(req, res));

export default router;