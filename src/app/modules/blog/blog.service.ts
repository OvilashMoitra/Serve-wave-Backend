/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Blog } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { ICreateBlog } from './blog.interface';



const createBlog = async (payload: ICreateBlog) => {

    const blogTag = payload.blogTag;

    // ! look for user
    const user = prisma.user.findUnique({
        where: {
            id: payload.addedBy
        }
    })
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const createBlogTransaction = await prisma.$transaction(async (tx) => {
        const blog = await tx.blog.create({
            data: {
                blogTitle: payload.blogTitle,
                addedBy: payload.addedBy,
                blogContent: payload.blogContent,
                blogImage: payload.blogImage
            },
            include: {
                blogAuthor: {
                    select: {
                        email: true,
                        role: true,
                        id: true
                    }
                }
            }
        },
        )
        console.log({ blogTag });

        const blogTagToBlog: {
            blogId: string;
            tagId: string;
        }[] = blogTag.map(tag => {
            return {
                "blogId": blog.id,
                "tagId": tag
            }
        }
        )


        const blogTagRefernceCreate = await tx.blogTagToBlog.createMany({
            data: blogTagToBlog
        })

        console.log({ blogTagRefernceCreate });
        await tx.websiteStats.update({
            data: {
                blogs: { increment: 1 }
            },
            where: {
                id: config.stats_id
            }
        })


        return blog;
    })
    return createBlogTransaction
};



const deleteBlog = async (payload: string) => {
    const blogDeleted = await prisma.blog.delete({
        where: {
            id: payload
        }
    })

    return blogDeleted;
};

const updateBlog = async (
    payload: Partial<Blog>,
    id: string
) => {

    const blogToUpdate = await prisma.blog.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            blogAuthor: true,
            tags: true
        }
    })

    if (!blogToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Blog found');
    }

    return blogToUpdate;
};

const getBlog = async (id: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        },
        include: {
            blogAuthor: true,
            tags: {
                include: {
                    tag: true
                }
            }
        }
    })
    return blog;
}
const getAllBlog = async (tagName: string) => {

    // const blogs = await prisma.blogTagToBlog.findMany({
    //     include: {
    //         blog: true,
    //         tag: true
    //     }
    // })
    const blogs = await prisma.blog.findMany({
        where: {
            tags: {
                some: {
                    tag: {
                        tagName: tagName,  // Filter by tagName
                    },
                },
            },
        },
        include: {
            tags: {
                include: {
                    tag: true,  // Include the related tag (BlogTag)
                },
            },
        },
    })
    // console.log({ blogs })
    return blogs;
}

export const BlogService = {
    createBlog,
    deleteBlog,
    updateBlog,
    getBlog,
    getAllBlog,
};