import { isEmpty } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import { Category } from "../entities/Category";
import { Leaderboard } from "../entities/Leaderboard";

const router = Router();

const getLeaderboards = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const lbs = await Leaderboard.find();

    return res.status(200).json(lbs);
  } catch (err) {
    next(err);
  }
};
const newLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isEmpty(req.body.category)) throw new Error("Category name must not be empty");
    if (isEmpty(req.body.name)) throw new Error("Name must not be empty");

    const cg = await Category.findOneOrFail({ where: { name: req.body.category } });
    const lb = new Leaderboard({ name: req.body.name, category: cg });

    await lb.save();

    return res.status(200).json(lb);
  } catch (err) {
    next(err);
  }
};

router.get("/", getLeaderboards);
router.post("/", newLeaderboard);

export default router;
