import Express from 'express';
import { UserController } from './user.controller';

export const UserRouter = Express.Router();




UserRouter.post('/create-user', UserController.createUser);

UserRouter.get('/', UserController.getAllUsers);

UserRouter.get('/:id', UserController.getUserById);


UserRouter.patch('/ban', UserController.banUser);
UserRouter.patch('/un-ban', UserController.unBanUser);


UserRouter.patch('/:id', UserController.updateUser);



// UserRouter.delete('/:id', UserController.deleteUser);
