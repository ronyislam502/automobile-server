import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "../user/user.controller";
import { AuthControllers } from "./auth.controller";
import { upload } from "../../utilities/sendMulter";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { UserValidations } from "../user/user.validation";

const router = express.Router();

router.post(
  "/signUp",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser
);

router.post(
  "/login",
  // validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
