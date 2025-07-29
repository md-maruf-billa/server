import "dotenv/config";

export const configs = {
    port: process.env.PORT,
    env: "development",
    jwt: {
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN,
        access_expires: process.env.ACCESS_EXPIRES,
        refresh_expires: process.env.REFRESH_EXPIRES,
        reset_secret: process.env.RESET_SECRET,
        reset_expires: process.env.RESET_EXPIRES,
        front_end_url: process.env.FRONT_END_URL,
        verified_token: process.env.VERIFIED_TOKEN,
        plan_token: process.env.PLAN_TOKEN
    },
    db_url: process.env.DB_URL,
    email: {
        app_email: process.env.APP_USER_EMAIL,
        app_password: process.env.APP_PASSWORD
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        cloud_api_key: process.env.CLOUD_API_KEY,
        cloud_api_secret: process.env.CLOUD_API_SECRET
    },
    bkash: {
        bkashPassword: process.env.BKASH_PASSWORD,
        bkashAppKey: process.env.BKASH_APP_KEY,
        userName: process.env.BKASH_USER_NAME,
        bkashAppSecret: process.env.BKASH_APP_SECRET,
        bkashGrantURL: process.env.BKASH_GRANT_URL,
        bkashCreatePaymentURL: process.env.BKASH_CREATE_PAYMENT_URL,
        bkashExecutePaymentURL: process.env.BKASH_EXECUTE_PAYMENT_URL
    },
    frontendURL: process.env.FRONT_END_URL
}