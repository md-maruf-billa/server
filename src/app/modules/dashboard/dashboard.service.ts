import { Request } from "express";
import { LandingPageModel } from "../landingPage/landingPage.schema";
import { OrderModel } from "../order/order.schema";

const get_dashboard_overview_from_db = async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new Error("User not authenticated");

    // Step 1: Get all landing pages for the user
    const landingPages = await LandingPageModel.find({ owner: user.email }).lean();
    const landingPageIds = landingPages.map(p => p._id);

    // Step 2: Categorize pages
    const activePagesCount = landingPages.filter(p => p.pageStatus === "active").length;
    const blockPagesCount = landingPages.length - activePagesCount;

    // Step 3: Prepare order queries
    const allOrdersQuery = OrderModel.find({ pageId: { $in: landingPageIds } }).sort("-createdAt").lean();
    const pendingOrdersQuery = OrderModel.find({ pageId: { $in: landingPageIds }, status: "pending" })
        .sort("-createdAt")
        .limit(10)
        .lean();
    const shippedOrdersQuery = OrderModel.find({ pageId: { $in: landingPageIds }, status: "shipped" })
        .sort("-createdAt")
        .limit(10)
        .lean();

    // Step 4: Run all 3 order queries in parallel
    const [orders, pendingOrders, shippedOrders] = await Promise.all([
        allOrdersQuery,
        pendingOrdersQuery,
        shippedOrdersQuery
    ]);

    // Step 5: Calculate total sales
    const totalSeal = orders.reduce((acc, order) => acc + Number(order.totalPrice || 0), 0);

    // Final Return
    return {
        landingPages: {
            activePages: activePagesCount,
            blockPages: blockPagesCount
        },
        orders: {
            totalOrders: orders.length,
            totalSeal,
            pendingOrder: pendingOrders,
            shippedOrder: shippedOrders
        }
    };
};


export const dashboard_services = {
    get_dashboard_overview_from_db
}