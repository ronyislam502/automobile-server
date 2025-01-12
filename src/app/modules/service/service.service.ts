/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utilities/sendImageToCloudinary";
import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDB = async (file: any, payload: TService) => {
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;
    const img_url = await sendImageToCloudinary(imageName, path);
    payload.image = img_url as string;
  }
  if (payload?.name === payload?.name) {
    throw new AppError(httpStatus.BAD_REQUEST, "This service already exist");
  }
  const result = await Service.create(payload);
  return result;
};

const getAllServiceFromDB = async () => {
  const result = await Service.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const updateServiceFromDB = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceFromDB,
  deleteServiceFromDB,
};
