import { Router } from "express";
import DirectMessagesController from "../controllers/DirectMessagesController";

const directMessagesController = new DirectMessagesController();
const router = Router();

router.get('/direct-messages', (req, res) => directMessagesController.getDirectMessages(req, res));
router.get('/direct-messages/:id', (req, res) => directMessagesController.getRoomMessages(req, res));
router.post('/direct-messages', (req, res) => directMessagesController.createDirectMessage(req, res));

export default router;