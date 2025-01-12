import express from "express";
import { SlotControllers } from "./slot.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), SlotControllers.getAllSlots);

router.get("/availability", SlotControllers.getAvailableSlots);

router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);

export const SlotRoutes = router;
