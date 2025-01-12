/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.const";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  profileImg?: string;
  address: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
