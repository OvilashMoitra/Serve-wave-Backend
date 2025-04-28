import Express from 'express';
import { NotificationController } from './notification.controller';

export const NotificationRouter = Express.Router();



NotificationRouter.get('/:id', NotificationController.getAllNotifications);

NotificationRouter.patch('/:userId', NotificationController.readNotification);

NotificationRouter.delete('/:id', NotificationController.deleteNotification);
