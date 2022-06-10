import { Router } from "express";
import controller from "../controllers/video.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.get("/videos", controller.GET);
router.get("/admin/videos", checkToken, controller.GET);

export default router;
