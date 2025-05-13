import express, {Request, Response} from 'express';
import {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from './controllers/userControllers';//import controller functions

//create an express routera
const router = express.Router();

//define routes
router.get('/', (_req:Request, res:Response) => {
    res.send('CRUD API');
});
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.delete('/users/:fname', deleteUser);
router.put('/users', updateUser);

//export router to be used in server.ts
export default router;