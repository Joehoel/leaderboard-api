import { isEmpty } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import { Category } from "../entities/Category";

const router = Router();

const getCategories = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();

    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isEmpty(req.params.id)) throw new Error("ID must not be empty");

    const category = await Category.findOneOrFail({ id: parseInt(req.params.id) });

    return res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const newCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isEmpty(req.body.name)) throw new Error("Name must not be empty");

    const category = new Category({
      name: req.body.name,
      imageUrl: req.body.imageUrl ?? null,
    });

    await category.save();

    return res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isEmpty(req.params.id)) throw new Error("ID must not be empty");

    const category = await Category.findOneOrFail({ id: parseInt(req.params.id) });
    await Category.remove(category);

    return res.status(204).json(category);
  } catch (err) {
    next(err);
  }
};

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", newCategory);
router.delete("/:id", deleteCategory);

export default router;
