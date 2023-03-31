import fs from "fs/promises";

export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log("Deleted");
  } catch (error) {
    console.log(error.message);
  }
};
