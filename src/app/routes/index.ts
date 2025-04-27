import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';

import { CartRouter } from '../modules/cart/cart.route';
import { ContactRouter } from '../modules/contact/contact.route';
import { FAQRouter } from '../modules/faq/faq.route';
import { JobRouter } from '../modules/job/job.route';


import { OrderRouter } from '../modules/order/order.route';
import { ReviewRouter } from '../modules/review/review.route';
import { RoleRouter } from '../modules/role/role.route';
import { ServiceRouter } from '../modules/service/service.route';

import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [

  {
    path: "/role",
    routes: RoleRouter
  },
  {
    path: "/auth",
    routes: AuthRouter
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
    path: "/contact",
    routes: ContactRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
