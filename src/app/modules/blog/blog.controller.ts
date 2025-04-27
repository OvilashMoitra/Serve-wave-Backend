/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogInfo = req.body;
        console.log({blogInfo})
        const blog = await BlogService.createBlog(blogInfo);
        if (!blog) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating blog');
        }
        sendResponse(res, 'blog created successfully ', blog);
    } catch (error) {
        next(error);
    }

    
};


const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogId = req.params.id;
        const blogToDelete = await BlogService.deleteBlog(blogId);
        if (!blogToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting blog');
        }
        sendResponse(res, 'blog deleted successfully ', blogToDelete);
    } catch (error) {
        next(error);
    }
};
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogId = req.params.id;
        const blogInfo = req.body;
        const blogToUpdate = await BlogService.updateBlog(blogInfo, blogId);

        if (!blogToUpdate) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating blog');
        }
        sendResponse(res, 'blog updated successfully ', blogToUpdate);
    } catch (error) {
        next(error);
    }
};


export const BlogController = {
    createBlog,
    deleteBlog,
    updateBlog,
};
