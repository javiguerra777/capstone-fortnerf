import express from 'express';
import RoomController from '../controllers/RoomController';
import EmailController from '../controllers/EmailController';
import registrationRoutes from './registrationRoutes';

const roomController = new RoomController();
const emailContoller = new EmailController();
const router = express.Router();
// rest api functionality
router.get(
  '/',
  async (req, res) => await roomController.firstRoute(req, res),
);
router
  .route('/room/:id')
  .get(async (req, res) => await roomController.getRoom(req, res))
  .put(async (req, res) => await roomController.updateRoom(req, res));
router.get(
  '/rooms',
  async (req, res) => await roomController.getAllRooms(req, res),
);
router.post(
  '/createRoom',
  async (req, res) => await roomController.createRoom(req, res),
);
router.post(
  '/sendEmail',
  async (req, res) => await emailContoller.sendEmail(req, res),
);
router.use('/api', registrationRoutes);

export default router;
