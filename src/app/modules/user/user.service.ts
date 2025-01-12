/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from "../../utilities/sendImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (file: any, payload: TUser) => {
  if (file) {
    const imageName = `${payload?.name}`;
    const path = file?.path;
    const img_url = await sendImageToCloudinary(imageName, path);
    payload.profileImg = img_url as string;
  }
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDB,
};
