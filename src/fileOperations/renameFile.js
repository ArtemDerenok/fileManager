import fs from "fs/promises";

export const renameFile = async (oldFile, newFile) => {
  try {
    await fs.rename(oldFile, newFile);
    console.log("Renamed!");
  } catch (error) {
    console.error(error.message);
  }
};
