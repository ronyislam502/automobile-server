import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const sendImageToCloudinary = async (
  imageName: string,
  path: string
) => {
  cloudinary.config({
    cloud_name: "dkk9lvbtf",
    api_key: "744943593118556",
    api_secret: "z4FYfmE3cYrnMxgG3W442XXJ0cw",
  });

  console.log(imageName, path);

  // Upload an image
  const result = await cloudinary.uploader.upload(
    path,
    { public_id: imageName.trim() },
    function () {
      // delete a file asynchronously
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File is deleted.");
        }
      });
    }
  );

  return result.secure_url;
};
