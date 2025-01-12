import express, { NextFunction, Request, Response } from "express";
import { ServiceControllers } from "./service.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";
import { upload } from "../../utilities/sendMulter";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";

const router = express.Router();

router.post(
  "/create-service",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get("/", ServiceControllers.getAllServices);

router.get("/:id", ServiceControllers.getSingleService);

router.put(
  "/:id",
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  auth(USER_ROLE.admin),
  ServiceControllers.updateService
);

router.delete("/:id", auth(USER_ROLE.admin), ServiceControllers.deleteService);

export const ServiceRoutes = router;
