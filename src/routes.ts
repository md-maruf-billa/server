import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import landingPageRouter from './app/modules/landingPage/landingPage.route';
import orderRouter from './app/modules/order/order.route';
import planRoute from './app/modules/plan/plan.route';
import userRoute from './app/modules/user/user.route';
import dashboardRouter from './app/modules/dashboard/dashboard.route';


const appRouter = Router();

const moduleRoutes = [
    { path: '/auth', route: authRoute },
    { path: "/user", route: userRoute },
    { path: "/landing-page", route: landingPageRouter },
    { path: "/plan", route: planRoute },
    { path: "/order", route: orderRouter },
    {path:"/dashboard",route:dashboardRouter}



];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;