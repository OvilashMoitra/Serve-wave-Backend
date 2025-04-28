import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Stripe from 'stripe';
import { prisma } from '../../../app';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { OrderService } from './order.service';


export const stripe = new Stripe(config.stripe_secret_key!, {
    apiVersion: '2025-03-31.basil',
});


const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderInfo = req.body;

        console.log({ orderInfo })

        const order = await OrderService.createOrder(orderInfo);

        const service = await prisma.service.findUnique({
            where: {
                id: orderInfo?.serviceId
            }
        })

        console.log({ service })
        const totalPrice = Number(service?.price) * 100
        console.log({ totalPrice })

        // stripe payment session
        // Create a Stripe checkout session with the order's total amount and other details
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Must be an array
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: service?.serviceName,
                        },
                        unit_amount: totalPrice, // In cents, $20.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/payment-successful?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DOMAIN}/payment-cancel`,
            metadata: {
                orderId: order.id, // Pass order ID or other custom data
            },
        });

        // if (!order) {
        //     throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating order');
        // }
        // console.log(session.url)
        res.send({
            success: true,
            message: 'url',
            url: session.url
        })
        // sendResponse(res, 'Order created successfully', "order");
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        const orderToDelete = await OrderService.deleteOrder(orderId);
        if (!orderToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting order');
        }
        sendResponse(res, 'Order deleted successfully', orderToDelete);
    } catch (error) {
        next(error);
    }
};

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderService.getAllOrders();
        if (!orders) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching orders');
        }
        sendResponse(res, 'Orders fetched successfully', orders);
    } catch (error) {
        next(error);
    }
};

const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const orders = await OrderService.getUserOrders(id);
        if (!orders) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching orders');
        }
        sendResponse(res, 'Orders fetched successfully', orders);
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        const orderInfoToUpdate = req.body;

        const updatedOrder = await OrderService.updateOrder(orderInfoToUpdate, orderId);

        if (!updatedOrder) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating order');
        }

        sendResponse(res, 'Order updated successfully', updatedOrder);
    } catch (error) {
        next(error);
    }
};


const varifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.query

    if (!sessionId) {
        return res.status(400).json({ success: false, message: 'No session ID provided' });
    }

    try {
        // Retrieve the session from Stripe
        const order = await OrderService.verifyPayment(sessionId)

        if (order) {
            res.status(200).json({ success: true, message: 'Successful payment' });
        }
    }
    catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Error verifying payment' });
    }
};


export const OrderController = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
    varifyPayment
};
