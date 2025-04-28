/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';

const createNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationInfo = req.body;
        const notification = await NotificationService.createNotification(notificationInfo);
        if (!notification) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error creating notification');
        }
        sendResponse(res, 'Notification created successfully', notification);
    } catch (error) {
        next(error);
    }
};

const getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const notifications = await NotificationService.getAllNotifications(id);
        if (!notifications) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'No notifications found');
        }
        sendResponse(res, 'Notifications fetched successfully', notifications);
    } catch (error) {
        next(error);
    }
};

const readNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.userId;
        const notificationInfo = req.body;
        const updatedNotification = await NotificationService.readNotification(notificationInfo, notificationId);
        if (!updatedNotification) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating notification');
        }
        sendResponse(res, 'Notification updated successfully', updatedNotification);
    } catch (error) {
        next(error);
    }
};

const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.id;
        const deletedNotification = await NotificationService.deleteNotification(notificationId);
        if (!deletedNotification) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error deleting notification');
        }
        sendResponse(res, 'Notification deleted successfully', deletedNotification);
    } catch (error) {
        next(error);
    }
};

export const NotificationController = {
    getAllNotifications,
    readNotification,
    deleteNotification,
};
