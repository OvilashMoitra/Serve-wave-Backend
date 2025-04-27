import Express from 'express';
import { BlogController } from './blog.controller';


export const BlogRouter = Express.Router();

BlogRouter.post('/create-blog', BlogController.createBlog);



BlogRouter.patch('/:id', BlogController.updateBlog);







BlogRouter.delete('/:id', BlogController.deleteBlog);


