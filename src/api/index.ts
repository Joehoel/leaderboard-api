import { Router } from "express";
import categories from "./categories";
import leaderboards from "./leaderboards";
import scores from "./scores";

const router = Router();

// Routes
router.use("/categories", categories);
router.use("/leaderboards", leaderboards);
router.use("/scores", scores);

export default router;
