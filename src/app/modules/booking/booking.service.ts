import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const customer = await User.findById(payload.customer);

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isServiceExists = await Service.findById(payload.service);
  if (!isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, "service not found");
  }

  const isSlotExists = await Slot.findById(payload.slot);
  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, "slot not found");
  }

  const isSlotBooked = isSlotExists.isBooked === "booked";

  if (isSlotBooked) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "slot not available at this time"
    );
  }

  const result = await Booking.create(payload);

  const slotBooingUpdate = await Slot.findByIdAndUpdate(payload.slot, {
    isBooked: "booked",
  });

  if (!slotBooingUpdate) {
    throw new AppError(httpStatus.BAD_REQUEST, "slot not booked at this time");
  }

  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate("customer")
    .populate("service")
    .populate("slot");

  return result;
};

const getCustomerBookingFromDB = async (email: string) => {
  const result = await Booking.findOne({ email })
    .populate("customer")
    .populate("service")
    .populate("slot");

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getCustomerBookingFromDB,
};
