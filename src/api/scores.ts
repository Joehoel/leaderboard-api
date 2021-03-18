import { isEmpty } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import { nextTick } from "process";
import { getManager } from "typeorm";
import { Category } from "../entities/Category";
import { Leaderboard } from "../entities/Leaderboard";
import { Score } from "../entities/Score";

const router = Router();

const getScores = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const scores = await Score.find();

    return res.status(200).json(scores);
  } catch (err) {
    next(err);
  }
};

const newScore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isEmpty(req.body.category)) throw new Error("Category name must not be empty");
    if (isEmpty(req.body.leaderboard)) throw new Error("Leaderboard name must not be empty");
    if (isEmpty(req.body.score)) throw new Error("Score must not be empty");
    if (isEmpty(req.body.username)) throw new Error("Username must not be empty");

    const cg = await Category.findOneOrFail({ where: { name: req.body.category } });
    const lb = await Leaderboard.findOneOrFail({ where: { name: req.body.leaderboard, category: cg } });

    const score = new Score({
      leaderboard: lb,
      score: req.body.score,
      user: req.body.username,
    });

    await score.save();

    return res.status(200).json(score);
  } catch (err) {
    next(err);
  }
};

router.get("/", getScores);
router.post("/", newScore);

export default router;
