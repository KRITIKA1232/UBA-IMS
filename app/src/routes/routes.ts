import express, { Request, Response } from 'express';
import UserController from '../controllers/userControllers';
import { userValidationRules, validateUser } from '../middlewares/userValidation';

// Create an Express router
const router = express.Router();

// Define routes
router.get('/', (_req: Request, res: Response) => {
    res.send('CRUD API');
});

// Updated to use UserController methods
router.post('/users', userValidationRules, validateUser, UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:fname', UserController.getUserByFirstName);
router.put('/users', UserController.updateUser);
router.delete('/users/:fname', UserController.deleteUser);

// Export router to be used in `server.ts`
export default router;
