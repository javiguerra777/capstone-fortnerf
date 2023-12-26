import { Router } from "express";
import RegistrationController from "../controllers/RegistrationController";

const registrationController = new RegistrationController();
const router = Router();

router.post(
  '/register',
  async (req, res) => await registrationController.register(req, res),
);
router.post(
  '/login',
  async (req, res) => await registrationController.login(req, res),
)


export default router;