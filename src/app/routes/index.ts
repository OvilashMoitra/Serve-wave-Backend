import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { BlogRouter } from '../modules/blog/blog.route';


import { BlogTagRouter } from '../modules/blogTag/blogTag.route';
import { CartRouter } from '../modules/cart/cart.route';
import { ContactRouter } from '../modules/contact/contact.route';
import { FAQRouter } from '../modules/faq/faq.route';
import { JobRouter } from '../modules/job/job.route';

import { NotificationRouter } from '../modules/notification/notification.route';
import { OrderRouter } from '../modules/order/order.route';
import { ReviewRouter } from '../modules/review/review.route';
import { RoleRouter } from '../modules/role/role.route';
import { ServiceRouter } from '../modules/service/service.route';
import { StatsRouter } from '../modules/stats/stats.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/role",
    routes: RoleRouter
  },
  {
    path: "/auth",
    routes: AuthRouter
  },
  {
    path: "/blogTag",
    routes: BlogTagRouter
  },
  {
    path: "/blog",
    routes: BlogRouter
  },
  {
    path: "/faq",
    routes: FAQRouter
  },
  {
    path: "/service",
    routes: ServiceRouter
  },
  {
    path: "/stats",
    routes: StatsRouter
  },
  {
    path: "/cart",
    routes: CartRouter
  },
  {
    path: "/job",
    routes: JobRouter
  },
  {
    path: "/orders",
    routes: OrderRouter
  },
  {
    path: "/review",
    routes: ReviewRouter
  },
  {
    path: "/user",
    routes: UserRouter
  },
  {
    path: "/notification",
    routes: NotificationRouter
  },
  {
    path: "/contact",
    routes: ContactRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
