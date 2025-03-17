import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addCredits, registerUser, sessionCheck, signin, signout } from "../controllers/user.controller.js";
import verifyJWTandPopulateUserDataInReq from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/signin").post(signin);

// protected routes:-
router.route("/signout").post(verifyJWTandPopulateUserDataInReq, signout);
router.route("/checkSession").get(verifyJWTandPopulateUserDataInReq, sessionCheck);
router.route("/checkout").post(verifyJWTandPopulateUserDataInReq, addCredits)

// export {router};
export default router;