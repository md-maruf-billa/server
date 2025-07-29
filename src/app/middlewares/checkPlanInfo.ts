import { NextFunction, Request, Response } from 'express';
import { configs } from '../configs';
import { Account_Model } from '../modules/auth/auth.schema';
import { LandingPageModel } from '../modules/landingPage/landingPage.schema';
import { AppError } from '../utils/app_error';
import { jwtHelpers } from '../utils/JWT';



const checkPlanInfo = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req?.user?.email;
            const isUserExist = await Account_Model.findOne({ email }).lean();

            // check plan exist
            if (!isUserExist?.isPlan) {
                throw new AppError("You are not paid user !!", 404)
            }
            // decode plan token
            let verifiedPlan;
            try {
                verifiedPlan = jwtHelpers.verifyToken(
                    isUserExist.planToken!,
                    configs.jwt.plan_token as string
                );
            } catch (err) {
                throw new AppError("Your subscription expired!!", 403);
            }
            if (!verifiedPlan) {
                throw new AppError("Your subscription expired!!", 404)
            }
            // check page limit
            const isPages = await LandingPageModel.find({ owner: email }).lean();
            if (isPages?.length >= verifiedPlan?.maxPage) {
                throw new AppError("Your plan limit reached ! Please upgrade plan now!", 400)
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default checkPlanInfo;