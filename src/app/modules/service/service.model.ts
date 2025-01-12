import { model, Schema } from "mongoose";
import { ServiceModel, TService } from "./service.interface";

const ServiceSchema = new Schema<TService, ServiceModel>(
  {
    image: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ServiceSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

ServiceSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

ServiceSchema.statics.isServiceExists = async function (id: string) {
  const existingService = await Service.findOne({ id });
  return existingService;
};

export const Service = model<TService, ServiceModel>("Service", ServiceSchema);
