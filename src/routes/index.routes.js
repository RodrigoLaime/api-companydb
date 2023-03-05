import { Router } from "express";

import { pin } from "../controllers/index.controller.js";

const router = Router();

router.get('/pin', pin);

export default router;