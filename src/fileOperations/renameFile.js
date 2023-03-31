import fs from "fs/promises";

export const renameFile = async (oldFile, newFile, action) => {
  try {
    await fs.rename(oldFile, newFile);
    if (action === "rn") {
      console.log("Renamed!");
    } else {
      console.log("Moved!");
    }
  } catch (error) {
    console.error(error.message);
  }
};
