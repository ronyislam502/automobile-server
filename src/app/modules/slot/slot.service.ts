/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { generateSlots } from "./slot.utilities";
import { Types } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";

const createSlotIntoDB = async (payload: TSlot) => {
  const isService = await Service.findById(payload.service);

  if (!isService) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not Found");
  }

  const serviceDuration = isService.duration;

  if (!serviceDuration) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service duration not defined");
  }

  const slots = generateSlots(
    payload.startTime,
    payload.endTime,
    serviceDuration
  );

  const slotsDoc = slots.map((slot) => ({
    service: new Types.ObjectId(payload.service),
    date: payload.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    isBooked: payload.isBooked,
  }));

  const result = await Slot.create(slotsDoc);
  return result;
};

const getAllSlotsFromDB = async () => {
  const result = await Slot.find().populate("service");
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const searchField = ["name", "date", "service", "serviceId"];

  const slotQuery = new QueryBuilder(
    Slot.find({ isBooked: { $ne: "booked" } }).populate("service"),
    query
  )
    .search(searchField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await slotQuery.modelQuery;

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
  getAvailableSlotsFromDB,
};
