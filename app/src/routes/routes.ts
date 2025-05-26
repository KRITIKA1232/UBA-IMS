import express, { Request, Response, NextFunction } from "express";
import UserController from "../controllers/userControllers";
import InternshipController from "../controllers/internshipController";
import { userValidationRules, validateUser } from "../middlewares/userValidation";

const router = express.Router();

/**
 * Async wrapper to handle errors properly in Express
 */
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", (_req: Request, res: Response) => {
    res.send("CRUD API");
});

// ✅ Wrap all routes in `asyncHandler` so they work properly with Express
router.post("/users", userValidationRules, validateUser, asyncHandler(UserController.createUser));
router.get("/users", asyncHandler(UserController.getAllUsers));
router.get("/users/:fname", asyncHandler(UserController.getUserByFirstName));
router.put("/users", asyncHandler(UserController.updateUser));
router.delete("/users/:fname", asyncHandler(UserController.deleteUser));

// 🔹 Internship Routes
router.post("/internships", asyncHandler(InternshipController.createInternship));
router.get("/internships", asyncHandler(InternshipController.getAllInternships));
router.get("/internships/user/:userId", asyncHandler(InternshipController.getInternshipsByUser));
router.put("/internships/:id", asyncHandler(InternshipController.updateInternship));
router.delete("/internships/:id", asyncHandler(InternshipController.deleteInternship));

export default router;
