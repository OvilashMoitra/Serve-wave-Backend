/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Notification } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';

const createNotification = async (payload: Notification) => {
    const notification = await prisma.notification.create({
        data: payload,
        include: {
            auth: true,
        },
    });

    return notification;
};

const getAllNotifications = async (id: string) => {
    const notifications = await prisma.notification.findMany({
        where: {
            userId: id
        }
    });

    return notifications;
};



const deleteNotification = async (id: string) => {
    const deletedNotification = await prisma.notification.delete({
        where: { id },
    });

    return deletedNotification;
};

const readNotification = async (payload: Partial<Notification>, userId: string) => {
    const updatedNotification = await prisma.notification.updateMany({
        where: {
            auth: {
                id: userId
            }
        },
        data: payload,

    });

    if (!updatedNotification) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Notification not found');
    }

    return updatedNotification;
};

export const NotificationService = {
    createNotification,
    getAllNotifications,
    deleteNotification,
    readNotification
};
